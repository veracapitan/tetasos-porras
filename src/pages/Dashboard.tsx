import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trophy, Plus, Users, Calendar, LogOut } from "lucide-react";
import CreateLeagueDialog from "@/components/CreateLeagueDialog";
import JoinLeagueDialog from "@/components/JoinLeagueDialog";

interface League {
  id: string;
  name: string;
  code: string;
  description: string | null;
  created_at: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
    loadLeagues();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    } else {
      setUser(session.user);
    }
  };

  const loadLeagues = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("league_members")
        .select(`
          league_id,
          leagues (
            id,
            name,
            code,
            description,
            created_at
          )
        `)
        .eq("user_id", user.id)
        .order("joined_at", { ascending: false });

      if (error) throw error;

      const leaguesData = data?.map((item: any) => item.leagues).filter(Boolean) || [];
      setLeagues(leaguesData);
    } catch (error: any) {
      console.error("Error loading leagues:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "No se pudieron cargar las ligas",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleLeagueCreated = () => {
    setShowCreateDialog(false);
    loadLeagues();
  };

  const handleLeagueJoined = () => {
    setShowJoinDialog(false);
    loadLeagues();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
              <Trophy className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Porras FC
            </h1>
          </div>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Salir
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Hola, {user?.user_metadata?.display_name || "Amigo"}!
          </h2>
          <p className="text-muted-foreground">
            Administra tus ligas y haz tus pronósticos
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="shadow-soft hover:shadow-glow transition-shadow cursor-pointer border-2 border-dashed border-primary/30" onClick={() => setShowCreateDialog(true)}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" />
                Crear Liga
              </CardTitle>
              <CardDescription>
                Crea una nueva liga e invita a tus amigos
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-soft hover:shadow-glow transition-shadow cursor-pointer border-2 border-dashed border-accent/30" onClick={() => setShowJoinDialog(true)}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-accent" />
                Unirse a Liga
              </CardTitle>
              <CardDescription>
                Únete a una liga existente con un código
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-primary" />
            Mis Ligas
          </h3>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : leagues.length === 0 ? (
            <Card className="shadow-soft">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="w-16 h-16 text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-muted-foreground mb-2">
                  No tienes ligas aún
                </p>
                <p className="text-sm text-muted-foreground mb-6 text-center">
                  Crea una nueva liga o únete a una existente para comenzar
                </p>
                <div className="flex gap-3">
                  <Button onClick={() => setShowCreateDialog(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Crear Liga
                  </Button>
                  <Button variant="outline" onClick={() => setShowJoinDialog(true)}>
                    <Users className="w-4 h-4 mr-2" />
                    Unirse
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {leagues.map((league) => (
                <Card
                  key={league.id}
                  className="shadow-soft hover:shadow-glow transition-all cursor-pointer hover:scale-[1.02]"
                  onClick={() => navigate(`/leagues/${league.id}`)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="truncate">{league.name}</span>
                      <Trophy className="w-5 h-5 text-primary flex-shrink-0" />
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {league.description || "Sin descripción"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Código:</span>
                      <code className="px-2 py-1 bg-secondary rounded font-mono">
                        {league.code}
                      </code>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <CreateLeagueDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onLeagueCreated={handleLeagueCreated}
      />

      <JoinLeagueDialog
        open={showJoinDialog}
        onOpenChange={setShowJoinDialog}
        onLeagueJoined={handleLeagueJoined}
      />
    </div>
  );
};

export default Dashboard;
