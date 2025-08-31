import React from 'react';
import { Card } from '@/components/ui/card';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Badge } from '../ui/badge';

const AboutSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: educationRef, isVisible: educationVisible } = useScrollAnimation();
  const { ref: coursesRef, isVisible: coursesVisible } = useScrollAnimation();
  const education = [
    {
      title: "Tecnólogo en Desarrollo de Software",
      institution: "Instituto Tecnológico de las Américas",
      period: "2024 - Actualidad",
      description:
        "Formación integral en desarrollo de software con enfoque en tecnologías modernas y metodologías ágiles de desarrollo.",
      highlights: [
        "Desarrollo Full Stack",
        "Metodologías Ágiles",
        "Bases de Datos",
      ],
    },
    {
      title: "Técnico en Programación de Páginas Web",
      institution: "INFOTEP-Centenaria",
      period: "2025",
      description:
        "Especialización en desarrollo web frontend y backend, con énfasis en tecnologías web modernas y diseño responsivo.",
      highlights: [
        "Desarrollo Web",
        "Diseño Responsivo",
        "Tecnologías Frontend",
      ],
    },
  ];

  const courses = [
    {
      title: "C# Avanzado",
      institution: "ITLA",
      description: "Programación avanzada en C# con patrones de diseño y mejores prácticas."
    },
    {
      title: "JavaScript",
      institution: "ITLA", 
      description: "Desarrollo con JavaScript moderno, ES6+ y programación asíncrona."
    },
    {
      title: "ASP.NET Core y APIs REST",
      institution: "Udemy",
      description: "Desarrollo de APIs REST con ASP.NET Core y arquitectura de microservicios."
    },
    {
      title: "Introducción a la Ciberseguridad",
      institution: "ITLA",
      description: "Fundamentos de seguridad informática y protección de sistemas."
    },
  ];


  return (
    <section
      id="about"
      className="py-20 md:py-32 px-6 md:px-16 relative"
    >

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            headerVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white stagger-1">
            Sobre Mí
          </h2>
          <div className="w-24 h-1 bg-purple-800 mx-auto my-6 stagger-2"></div>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto stagger-3">
            Desarrollador apasionado por crear soluciones tecnológicas innovadoras
            y experiencias digitales excepcionales.
          </p>
        </div>

        {/* Main Grid - Education and Courses Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education Section */}
          <div
            ref={educationRef}
            className={`transition-all duration-1000 ${
              educationVisible ? 'animate-fade-in-left opacity-100' : 'opacity-0 -translate-x-8'
            }`}
          >
            <h3 className="text-3xl font-bold tracking-tight text-foreground mb-8 flex items-center">
              <svg
                className="w-8 h-8 text-primary mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                />
              </svg>
              Educación
            </h3>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <Card
                  key={index}
                  className="group relative p-6 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 border-2 border-slate-700/30 shadow-2xl hover:shadow-purple-800/20 transition-all duration-500 hover:scale-[1.02] hover:border-purple-800/50 overflow-hidden animate-fade-in-left hover:-translate-y-1"
                  style={{ animationDelay: `${(index + 4) * 0.2}s` }}
                >
                  {/* Gradient overlay effect */}
                  <div className="absolute inset-0 bg-purple-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Animated border glow */}
                  <div className="absolute inset-0 rounded-lg bg-purple-800/20 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
                  
                  <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <div className="w-3 h-3 bg-purple-800 rounded-full mr-3 animate-pulse"></div>
                          <h4 className="text-lg font-bold text-white group-hover:text-purple-300 transition-all duration-300">
                            {edu.title}
                          </h4>
                        </div>
                        <p className="text-base font-semibold text-purple-300 group-hover:text-purple-200 transition-colors duration-300 ml-6">
                          {edu.institution}
                        </p>
                      </div>
                      <div className="mt-2 sm:mt-0">
                        <Badge 
                          variant="secondary" 
                          className="bg-purple-800/20 text-purple-200 border border-purple-800/30 px-3 py-1 text-xs font-medium hover:bg-purple-800/30 transition-all duration-300"
                        >
                          {edu.period}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4 leading-relaxed text-sm ml-6 group-hover:text-gray-200 transition-colors duration-300">
                      {edu.description}
                    </p>

                    <div className="flex flex-wrap gap-2 ml-6">
                      {edu.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-purple-800/10 text-purple-200 rounded-full border border-purple-800/20 text-xs font-medium hover:bg-purple-800/20 hover:border-purple-800/40 hover:scale-105 transition-all duration-300 cursor-default"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Courses Section */}
          <div
            ref={coursesRef}
            className={`transition-all duration-1000 ${
              coursesVisible ? 'animate-fade-in-right opacity-100' : 'opacity-0 translate-x-8'
            }`}
          >
            <h3 className="text-3xl font-bold tracking-tight text-foreground mb-8 flex items-center">
              <svg
                className="w-8 h-8 text-primary mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Cursos y Certificaciones
            </h3>

            <div className="space-y-4">
              {courses.map((course, index) => (
                <Card
                  key={index}
                  className="group relative p-5 bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-slate-900/90 border-2 border-slate-700/30 shadow-xl hover:shadow-purple-800/20 transition-all duration-500 hover:scale-[1.02] hover:border-purple-800/50 overflow-hidden animate-fade-in-right hover:-translate-y-1"
                  style={{ animationDelay: `${(index + 6) * 0.15}s` }}
                >
                  {/* Gradient overlay effect */}
                  <div className="absolute inset-0 bg-purple-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Animated border glow */}
                  <div className="absolute inset-0 rounded-lg bg-purple-800/15 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-purple-800 rounded-full mt-2 flex-shrink-0 animate-pulse group-hover:animate-none group-hover:scale-125 transition-all duration-300"></div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-white group-hover:text-purple-300 transition-all duration-300 mb-2">
                          {course.title}
                        </h4>
                        <div className="inline-block mb-3">
                          <span className="px-3 py-1 bg-purple-800/20 text-purple-200 border border-purple-800/30 rounded-full text-xs font-medium hover:bg-purple-800/30 transition-all duration-300">
                            {course.institution}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                          {course.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
