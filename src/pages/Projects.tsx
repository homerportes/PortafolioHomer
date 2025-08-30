import { Card } from "@/components/ui/card";
import wellnessApp from "@/assets/project-wellness-app.jpg";
import techWebsite from "@/assets/project-tech-website.jpg";
import analyticsDashboard from "@/assets/project-analytics-dashboard.jpg";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Aplicación móvil para el bienestar",
      description: "Una aplicación integral de bienestar que incluye seguimiento de hábitos, meditación guiada y análisis de salud mental. Diseñé una experiencia de usuario fluida que motiva a los usuarios a mantener un estilo de vida saludable.",
      image: wellnessApp,
      tags: ["UI/UX Design", "Mobile App", "Health & Wellness"],
    },
    {
      id: 2,
      title: "Sitio web para una startup tecnológica",
      description: "Sitio web corporativo moderno para una startup de tecnología financiera. El diseño enfatiza la confianza y la innovación, con una arquitectura de información clara que guía a los usuarios hacia la conversión.",
      image: techWebsite,
      tags: ["Web Design", "Corporate", "Fintech"],
    },
    {
      id: 3,
      title: "Panel de control para análisis de datos",
      description: "Dashboard complejo para visualización de datos empresariales. Diseñé una interfaz intuitiva que permite a los usuarios analizar grandes cantidades de información de manera eficiente y tomar decisiones informadas.",
      image: analyticsDashboard,
      tags: ["Dashboard", "Data Visualization", "Enterprise"],
    },
    {
      id: 4,
      title: "E-commerce de productos sostenibles",
      description: "Plataforma de comercio electrónico especializada en productos ecológicos. El diseño refleja los valores de sostenibilidad de la marca mientras optimiza la experiencia de compra online.",
      image: wellnessApp, // Reusing image for demo
      tags: ["E-commerce", "Sustainable", "Branding"],
    },
    {
      id: 5,
      title: "App educativa para niños",
      description: "Aplicación educativa interactiva que hace el aprendizaje divertido para niños de 6-12 años. Diseñé personajes atractivos y mecánicas de juego que refuerzan el aprendizaje a través del juego.",
      image: techWebsite, // Reusing image for demo
      tags: ["Education", "Kids", "Gamification"],
    },
    {
      id: 6,
      title: "Sistema de gestión hospitalaria",
      description: "Interfaz compleja para la gestión de pacientes y recursos hospitalarios. Prioricé la usabilidad y la accesibilidad para permitir a los profesionales médicos trabajar de manera más eficiente.",
      image: analyticsDashboard, // Reusing image for demo
      tags: ["Healthcare", "Enterprise", "Accessibility"],
    },
  ];

  return (
    <main className="flex-1 px-6 md:px-40 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tighter text-foreground">
            Proyectos Destacados
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            Una selección de mi trabajo más impactante e innovador, mostrando mis habilidades y experiencia en diseño y desarrollo.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <Card 
              key={project.id}
              className="group flex cursor-pointer flex-col gap-4 overflow-hidden rounded-2xl bg-card shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-glow border-border animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div 
                className="w-full bg-center bg-no-repeat aspect-video bg-cover"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-card-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Projects;