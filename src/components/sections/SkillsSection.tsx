import { Card } from "@/components/ui/card";
import { Code2, Database, Wrench, Palette, Users, Zap } from "lucide-react";

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Diseño UX/UI",
      description: "Creación de experiencias centradas en el usuario",
      icon: <Palette className="h-7 w-7" />,
      skills: ["User Research", "Wireframing", "Prototyping", "Usability Testing"],
      color: "from-primary to-primary-glow"
    },
    {
      title: "Herramientas de Diseño",
      description: "Dominio de software especializado",
      icon: <Wrench className="h-7 w-7" />,
      skills: ["Figma", "Sketch", "Adobe Creative Suite", "InVision"],
      color: "from-secondary to-accent"
    },
    {
      title: "Frontend",
      description: "Implementación de diseños en código",
      icon: <Code2 className="h-7 w-7" />,
      skills: ["HTML/CSS", "JavaScript", "React", "Tailwind CSS"],
      color: "from-accent to-primary"
    },
    {
      title: "Metodologías",
      description: "Procesos y frameworks de trabajo",
      icon: <Zap className="h-7 w-7" />,
      skills: ["Design Thinking", "Agile/Scrum", "Lean UX", "Design Systems"],
      color: "from-primary-glow to-secondary"
    },
    {
      title: "Colaboración",
      description: "Trabajo en equipo y comunicación",
      icon: <Users className="h-7 w-7" />,
      skills: ["Stakeholder Management", "Cross-team Collaboration", "Workshops", "Presentations"],
      color: "from-secondary to-primary"
    },
    {
      title: "Análisis",
      description: "Medición y optimización de resultados",
      icon: <Database className="h-7 w-7" />,
      skills: ["Google Analytics", "A/B Testing", "Heatmaps", "User Journey Mapping"],
      color: "from-accent to-primary-glow"
    }
  ];

  return (
    <section 
      id="skills" 
      className="py-16 md:py-24 px-4 sm:px-10 md:px-20 lg:px-40"
      style={{
        background: "radial-gradient(circle at top, hsl(var(--card)), hsl(var(--background)))"
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Mis Habilidades
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Un vistazo a las tecnologías y metodologías que domino.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <Card 
              key={index}
              className="flex flex-col gap-6 rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary hover:shadow-glow animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4">
                <div className={`bg-gradient-to-br ${category.color} p-3 rounded-full text-white`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold leading-tight text-card-foreground">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {category.description}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex}
                    className="flex items-center gap-2 text-sm"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary/60" />
                    <span className="text-muted-foreground font-medium">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Section */}
        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 p-8">
            <h3 className="text-2xl font-bold text-card-foreground mb-4">
              Siempre Aprendiendo
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              El diseño y la tecnología evolucionan constantemente. Me mantengo actualizada con las últimas tendencias, herramientas y mejores prácticas para ofrecer siempre soluciones innovadoras y efectivas.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;