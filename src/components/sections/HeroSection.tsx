import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.jpg";

const HeroSection = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-end text-foreground">
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
        <Button 
          onClick={scrollToProjects}
          className="bg-primary hover:bg-primary/90 text-primary-foreground text-base font-bold px-8 py-6 h-auto transition-transform hover:scale-105"
        >
          Ver Portafolio
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;