import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroBackground from "@/assets/hero-background.jpg";
import wellnessApp from "@/assets/project-wellness-app.jpg";
import techWebsite from "@/assets/project-tech-website.jpg";
import analyticsDashboard from "@/assets/project-analytics-dashboard.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  const projects = [
    {
      id: 1,
      title: "Aplicación móvil para el bienestar",
      description: "Diseño de interfaz de usuario para una aplicación de bienestar integral.",
      image: wellnessApp,
    },
    {
      id: 2,
      title: "Sitio web para una startup tecnológica",
      description: "Diseño web moderno y responsivo para una empresa de tecnología.",
      image: techWebsite,
    },
    {
      id: 3,
      title: "Panel de control para análisis de datos",
      description: "Diseño de interfaz para un panel de control de análisis de datos.",
      image: analyticsDashboard,
    },
  ];

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[480px] flex items-end text-foreground">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center p-6 md:p-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tighter mb-4">
            Hola, soy Elena Ramirez
          </h1>
          <p className="text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-8 text-white/90">
            Diseñadora de productos con más de 5 años de experiencia en la creación de experiencias de
            usuario intuitivas y atractivas. Apasionada por resolver problemas complejos a través del
            diseño centrado en el usuario.
          </p>
          <Link to="/projects">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-base font-bold px-8 py-6 h-auto transition-transform hover:scale-105">
              Ver Portafolio
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-center mb-12 animate-fade-in">
            Proyectos Destacados
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={project.id} 
                className="bg-card rounded-2xl overflow-hidden group transform hover:-translate-y-2 transition-all duration-300 hover:shadow-primary animate-fade-in border-border"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div 
                  className="w-full aspect-video bg-cover bg-center"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-card-foreground">
                    {project.title}
                  </h3>
                  <p className="text-secondary text-sm">
                    {project.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/projects">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Ver todos los proyectos
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;