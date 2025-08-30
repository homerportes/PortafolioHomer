import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { id: "home", label: "Inicio" },
    { id: "projects", label: "Portafolio" },
    { id: "about", label: "Acerca de" },
    { id: "skills", label: "Habilidades" },
    { id: "contact", label: "Contacto" },
  ];

  // Scroll spy functionality
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial active section

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const isActive = (sectionId: string) => activeSection === sectionId;

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 bg-background/80 backdrop-blur-sm border-b border-white/10">
      <button 
        onClick={() => scrollToSection('home')}
        className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
      >
        <svg 
          className="size-6 text-primary" 
          fill="none" 
          viewBox="0 0 48 48" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_6_319)">
            <path 
              d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" 
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_6_319">
              <rect fill="white" height="48" width="48" />
            </clipPath>
          </defs>
        </svg>
        <h2 className="text-xl font-bold tracking-tighter">Elena Ramirez</h2>
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`text-sm font-medium transition-colors ${
              isActive(item.id)
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            {item.label}
          </button>
        ))}
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
          Descargar CV
        </Button>
      </nav>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-foreground"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-white/10 md:hidden">
          <nav className="flex flex-col p-6 gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors text-left ${
                  isActive(item.id)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold mt-2">
              Descargar CV
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;