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
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface JoinLeagueDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLeagueJoined: () => void;
}

const JoinLeagueDialog = ({ open, onOpenChange, onLeagueJoined }: JoinLeagueDialogProps) => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No hay sesión activa");

      // Find league by code
      const { data: league, error: leagueError } = await supabase
        .from("leagues")
        .select("id")
        .eq("code", code.toUpperCase())
        .maybeSingle();

      if (leagueError) throw leagueError;
      if (!league) throw new Error("Código de liga inválido");

      // Check if already a member
      const { data: existing } = await supabase
        .from("league_members")
        .select("id")
        .eq("league_id", league.id)
        .eq("user_id", user.id)
        .maybeSingle();

      if (existing) {
        throw new Error("Ya eres miembro de esta liga");
      }

      // Add as member
      const { error: memberError } = await supabase
        .from("league_members")
        .insert({
          league_id: league.id,
          user_id: user.id,
          role: "MEMBER",
        });

      if (memberError) throw memberError;

      toast({
        title: "¡Te uniste a la liga!",
        description: "Ahora puedes hacer tus pronósticos",
      });

      setCode("");
      onLeagueJoined();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
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
            <DialogTitle>Unirse a una Liga</DialogTitle>
            <DialogDescription>
              Ingresa el código de invitación de la liga
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="code">Código de Liga</Label>
              <Input
                id="code"
                placeholder="ABC123"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                required
                maxLength={6}
                className="uppercase font-mono text-lg tracking-wider text-center"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Unirse
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JoinLeagueDialog;
