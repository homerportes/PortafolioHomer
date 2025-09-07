import { Button } from "@/components/ui/button";
import { Download, Linkedin, Github } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import pfp from "@/assets/fotodeperfil.png";

const HeroSection = () => {
  const { t } = useTranslation();
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; speed: number }>
  >([]);

  useEffect(() => {
    // Generar partículas flotantes
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 2 + 0.5,
    }));
    setParticles(newParticles);

    // Animar partículas
    const animateParticles = () => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          y: particle.y > 100 ? -5 : particle.y + particle.speed * 0.1,
        }))
      );
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);
  const downloadCV = () => {
    // Crear un enlace temporal para descargar el CV
    const link = document.createElement("a");
    link.href = "/CvHomerPortes.pdf"; // Archivo en la carpeta public
    link.download = "/CvHomerPortes.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openLinkedIn = () => {
    window.open("https://linkedin.com/in/homerportes", "_blank");
  };

  const openGitHub = () => {
    window.open("https://github.com/homerportes", "_blank");
  };

  return (
    <section
      id="home"
      className="relative h-screen min-h-[600px] flex items-center justify-center text-foreground overflow-hidden"
    >
      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white/10 animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.id * 0.1}s`,
            animationDuration: `${2 + particle.speed}s`,
          }}
        />
      ))}

      {/* Geometric Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-purple-800/30 rotate-45 animate-spin-slow" />
      <div className="absolute bottom-20 right-10 w-24 h-24 border border-purple-800/30 rotate-12 animate-bounce-slow" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-800/20 rounded-full animate-pulse" />
      <div
        className="absolute bottom-1/3 right-1/4 w-20 h-20 border-2 border-purple-800/30 rounded-full animate-ping"
        style={{ animationDuration: "3s" }}
      />

      {/* Content Container */}
      <div className="relative z-20 max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 p-6 md:p-12 animate-fade-in">
        {/* Profile Photo */}
        <div className="flex-shrink-0 relative group animate-fade-in-left">
          <div className="absolute -inset-4 bg-purple-800 rounded-full opacity-30 group-hover:opacity-50 transition duration-300 animate-pulse-glow"></div>
          <div className="relative animate-float">
            <img
              src={pfp}
              alt="Homer Portes"
              className="w-64 h-64 lg:w-80 lg:h-80 rounded-full object-cover border-4 border-white/20 shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                const fallback = target.nextElementSibling as HTMLElement;
                target.style.display = "none";
                fallback.style.display = "flex";
              }}
            />
            <div className="hidden w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-purple-800 items-center justify-center border-4 border-white/20 shadow-2xl animate-float">
              <span className="text-6xl lg:text-8xl font-bold text-white">
                HP
              </span>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center lg:text-left flex-1 animate-fade-in-right">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tighter mb-4 text-white drop-shadow-2xl animate-slide-in-down">
            <span className="inline-block animate-fade-in stagger-1">
              Homer
            </span>{" "}
            <span className="inline-block animate-fade-in stagger-2">
              Portes
            </span>
            <br />
            <span className="text-purple-300 inline-block animate-fade-in stagger-3">
              {t("hero.subtitle")}
            </span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl max-w-3xl mx-auto lg:mx-0 mb-8 text-gray-200 drop-shadow-lg animate-fade-in-up stagger-4">
            {t("hero.description")}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center animate-scale-in stagger-5">
            <Button
              onClick={downloadCV}
              className="bg-purple-800 hover:bg-purple-700 text-white text-base font-bold px-6 py-3 h-auto transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border border-white/20 flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              {t("hero.downloadCV")}
            </Button>

            <div className="flex gap-3">
              <Button
                onClick={openLinkedIn}
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-purple-800 hover:border-purple-800 transition-all duration-300 hover:scale-105 shadow-lg p-3"
              >
                <Linkedin className="w-5 h-5" />
              </Button>

              <Button
                onClick={openGitHub}
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-purple-800 hover:border-purple-800 transition-all duration-300 hover:scale-105 shadow-lg p-3"
              >
                <Github className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
