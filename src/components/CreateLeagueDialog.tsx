import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface CreateLeagueDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLeagueCreated: () => void;
}

const CreateLeagueDialog = ({ open, onOpenChange, onLeagueCreated }: CreateLeagueDialogProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No hay sesión activa");

      const code = generateCode();

      // Try using RPC function first (if it exists)
      const { data: leagueId, error: rpcError } = await supabase.rpc(
        "create_league_with_member",
        {
          _name: name,
          _code: code,
          _description: description || null,
        }
      );

      if (!rpcError && leagueId) {
        // Success using RPC function
        toast({
          title: "¡Liga creada!",
          description: `Tu código de liga es: ${code}`,
        });
        setName("");
        setDescription("");
        onLeagueCreated();
        return;
      }

      // Fallback to direct insert (will work after policy is added)
      const leagueIdFallback = uuidv4();
      const { error: leagueError } = await supabase
        .from("leagues")
        .insert({
          id: leagueIdFallback,
          name,
          description,
          code,
          owner_id: user.id,
        });

      if (leagueError) throw leagueError;

      // Add creator as member
      const { error: memberError } = await supabase
        .from("league_members")
        .insert({
          league_id: leagueIdFallback,
          user_id: user.id,
          role: "ADMIN",
        });

      if (memberError) throw memberError;

      toast({
        title: "¡Liga creada!",
        description: `Tu código de liga es: ${code}`,
      });

      setName("");
      setDescription("");
      onLeagueCreated();
    } catch (error: any) {
      console.error("Error creating league:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "No se pudo crear la liga. Asegúrate de ejecutar el SQL de configuración en Supabase.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Crear Nueva Liga</DialogTitle>
            <DialogDescription>
              Crea una liga privada para competir con tus amigos
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre de la Liga</Label>
              <Input
                id="name"
                placeholder="Liga de Amigos FC"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción (opcional)</Label>
              <Textarea
                id="description"
                placeholder="Describe tu liga..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Crear Liga
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLeagueDialog;
