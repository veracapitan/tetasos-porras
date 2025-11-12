import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Users, TrendingUp, Shield, Zap, Target } from "lucide-react";
import heroImage from "@/assets/hero-football.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.3)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />
        
        <div className="container mx-auto px-4 py-32 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary mb-6 shadow-glow">
              <Trophy className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Porras FC
            </h1>
            <p className="text-xl md:text-2xl text-foreground mb-4">
              Compite con tus amigos prediciendo resultados de fútbol
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Crea ligas privadas, haz pronósticos de partidos y sube en el ranking.
              ¿Quién será el campeón de predicciones?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/auth")}
                className="text-lg shadow-glow"
              >
                Comenzar Gratis
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/auth")}
                className="text-lg border-2"
              >
                <Users className="w-5 h-5 mr-2" />
                Unirse a una Liga
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">¿Cómo funciona?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tres pasos simples para empezar a competir con tus amigos
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="shadow-soft hover:shadow-glow transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>1. Crea o Únete a una Liga</CardTitle>
              <CardDescription>
                Crea tu propia liga privada o únete a una existente usando un código de invitación
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-soft hover:shadow-glow transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>2. Haz tus Pronósticos</CardTitle>
              <CardDescription>
                Predice los resultados de cada partido antes de que comience el encuentro
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-soft hover:shadow-glow transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>3. Gana Puntos y Compite</CardTitle>
              <CardDescription>
                Acumula puntos por cada acierto y sube en el ranking de tu liga
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-r from-primary/5 via-secondary/10 to-accent/5 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">¿Por qué Porras FC?</h2>
            <p className="text-xl text-muted-foreground">
              La mejor manera de disfrutar el fútbol con amigos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-soft">
              <CardHeader>
                <Shield className="w-8 h-8 text-primary mb-3" />
                <CardTitle>Ligas Privadas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Crea ligas privadas solo para tu grupo de amigos con códigos únicos de invitación
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <Zap className="w-8 h-8 text-accent mb-3" />
                <CardTitle>Puntuación Personalizable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Configura las reglas de puntuación según las preferencias de tu liga
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <TrendingUp className="w-8 h-8 text-primary mb-3" />
                <CardTitle>Rankings en Tiempo Real</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Visualiza rankings por jornada, mes y temporada completa
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <Users className="w-8 h-8 text-accent mb-3" />
                <CardTitle>Múltiples Ligas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Participa en varias ligas simultáneamente con diferentes grupos
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <Trophy className="w-8 h-8 text-primary mb-3" />
                <CardTitle>Sistema de Logros</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Desbloquea insignias y logros por rachas de aciertos
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <Target className="w-8 h-8 text-accent mb-3" />
                <CardTitle>Fácil de Usar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Interfaz intuitiva y rápida para hacer pronósticos en segundos
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="shadow-glow bg-gradient-to-br from-card via-primary/5 to-accent/5 border-2 border-primary/20">
          <CardContent className="p-12 text-center">
            <Trophy className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">
              ¿Listo para demostrar que eres el mejor?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Únete a miles de aficionados que ya disfrutan de una forma más emocionante de seguir el fútbol
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/auth")}
                className="text-lg shadow-glow"
              >
                Crear Mi Primera Liga
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/auth")}
                className="text-lg border-2"
              >
                Comenzar Ahora
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <Trophy className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Porras FC
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Porras FC. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
