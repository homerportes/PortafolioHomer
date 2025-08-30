import { Card } from "@/components/ui/card";
import elenaProfile from "@/assets/elena-profile.jpg";

const AboutSection = () => {
  const experiences = [
    {
      title: "Diseñadora UX/UI en InnovaTech Solutions",
      period: "2020 - Presente",
      description: "Lidero proyectos de diseño para aplicaciones web y móviles, colaborando con equipos multidisciplinarios para crear experiencias digitales excepcionales."
    },
    {
      title: "Diseñadora de Interacción en Creativa Digital",
      period: "2018 - 2020",
      description: "Desarrollé interfaces intuitivas y sistemas de diseño escalables para diversos clientes, mejorando significativamente la usabilidad de sus productos."
    },
    {
      title: "Asistente de Diseño en Estudio Visual",
      period: "2016 - 2018",
      description: "Apoyé en la creación de identidades visuales y materiales gráficos, adquiriendo experiencia fundamental en diseño y metodologías de trabajo."
    }
  ];

  const skills = [
    "Diseño de Interfaz de Usuario (UI)",
    "Diseño de Experiencia de Usuario (UX)",
    "Investigación de Usuarios",
    "Prototipado",
    "Pruebas de Usabilidad",
    "Diseño Visual",
    "Figma & Sketch",
    "Metodologías Ágiles"
  ];

  return (
    <section id="about" className="py-16 md:py-24 px-6 md:px-16 bg-card/30">
      <div className="mx-auto max-w-5xl">
        {/* Profile Section */}
        <div className="flex flex-col items-center gap-12 rounded-2xl bg-card p-8 md:p-12 shadow-lg md:flex-row mb-16 animate-fade-in">
          <div className="flex-shrink-0">
            <div 
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-40 w-40 border-4 border-border"
              style={{ backgroundImage: `url(${elenaProfile})` }}
            />
          </div>
          <div className="flex flex-col text-center md:text-left">
            <h2 className="text-4xl font-bold tracking-tight text-card-foreground">Elena Ramirez</h2>
            <p className="mt-2 text-lg text-secondary">Diseñadora UX/UI</p>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground">
              Con más de 5 años de experiencia en diseño de interfaces y experiencia de usuario, me especializo en crear soluciones digitales intuitivas y centradas en el usuario. Mi enfoque se basa en la investigación, la colaboración y la iteración continua para lograr resultados excepcionales.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          {/* Experience Section */}
          <div className="lg:col-span-2">
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h3 className="text-3xl font-bold tracking-tight text-foreground mb-8">Experiencia</h3>
              <div className="relative border-l-2 border-border pl-8 space-y-12">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[13px] top-1 h-6 w-6 rounded-full bg-primary"></div>
                    <div>
                      <h4 className="text-xl font-semibold text-card-foreground">{exp.title}</h4>
                      <p className="mt-1 text-muted-foreground">{exp.period}</p>
                      <p className="mt-3 text-muted-foreground">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Philosophy Section */}
            <div className="mt-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <h3 className="text-3xl font-bold tracking-tight text-foreground mb-6">Filosofía de Trabajo</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Creo que el diseño centrado en el usuario es la clave para crear productos digitales exitosos. Mi enfoque se basa en comprender las necesidades y los objetivos de los usuarios, y en utilizar ese conocimiento para crear soluciones que sean tanto funcionales como estéticamente agradables. Valoro la colaboración y la comunicación abierta en todas las etapas del proceso de diseño.
              </p>
            </div>
          </div>

          {/* Skills Section */}
          <div className="lg:col-span-1">
            <div className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <h3 className="text-3xl font-bold tracking-tight text-foreground mb-6">Habilidades</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="rounded-full bg-muted px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;