import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Github, ExternalLink } from "lucide-react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { useTranslation } from "react-i18next";
import wellnessApp from "@/assets/Home.jpg";
import Home from "@/assets/Home.jpg";
import PeliculaFoto from "@/assets/PeliculaFotoFrontend.png";
import WebApi from "@/assets/descarga.jpg";

const ProjectsSection = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: projectsRef, isVisible: projectsVisible } = useScrollAnimation();

  const projects = [
    {
      id: 1,
      title: t("projects.project1.title"),
      description: t("projects.project1.description"),
      image: Home,
      tags: ["Asp.Net Core", "React", "SQL Server", "Tailwind"],
      githubUrl: "https://github.com/homerportes/RealStateRD",
    },
    {
      id: 2,
      title: t("projects.project2.title"),
      description: t("projects.project2.description"),
      image: PeliculaFoto,
      tags: ["Asp.Net Core", "Html", "CSS", "JavaScript"],
      githubUrl: "https://github.com/homerportes/ApiPelicula",
    },
    {
      id: 3,
      title: t("projects.project3.title"),
      description: t("projects.project3.description"),
      image: WebApi,
      tags: ["Asp.Net Core", "SignalR", "JWT", "Rx.net"],
      githubUrl: "https://github.com/homerportes/WebApiTask",
    },
    {
      id: 4,
      title: t("projects.project4.title"),
      description: t("projects.project4.description"),
      image: wellnessApp,
      tags: ["Html", "CSS", "JavaScript"],
      liveUrl: "https://analytics-dashboard.netlify.app",
    },
  ];

  const nextProjects = () => {
    setCurrentIndex((prev) => (prev + 3 >= projects.length ? 0 : prev + 3));
  };

  const prevProjects = () => {
    setCurrentIndex((prev) =>
      prev - 3 < 0 ? Math.max(0, projects.length - 3) : prev - 3
    );
  };
  const currentProjects = projects.slice(currentIndex, currentIndex + 3);

  return (
    <section
      id="projects"
      className="py-16 md:py-24 px-6 md:px-10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-1000 ${
            headerVisible
              ? "animate-fade-in-up opacity-100"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white stagger-1">
            {t("projects.title")}
          </h2>
          <div className="w-24 h-1 bg-purple-800 mx-auto my-6 stagger-2"></div>
          <p className="mt-4 text-lg text-gray-300 stagger-3">
            {t("projects.description")}
          </p>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-4 mb-8 animate-fade-in stagger-4">
          <button
            onClick={prevProjects}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 hover:scale-110 hover:rotate-12 transform"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <div className="flex gap-2">
            {Array.from({ length: Math.ceil(projects.length / 3) }).map(
              (_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-500 transform hover:scale-125 ${
                    Math.floor(currentIndex / 3) === index
                      ? "bg-purple-800 w-6 animate-pulse"
                      : "bg-white/30 w-2"
                  }`}
                />
              )
            )}
          </div>

          <button
            onClick={nextProjects}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 hover:scale-110 hover:-rotate-12 transform"
            disabled={currentIndex + 3 >= projects.length}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Projects Grid */}
        <div
          ref={projectsRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${
            projectsVisible ? "opacity-100" : "opacity-0 translate-y-8"
          }`}
        >
          {currentProjects.map((project, index) => (
            <Card
              key={project.id}
              className="group relative overflow-hidden rounded-2xl bg-slate-800/80 border border-slate-700/40 transition-all duration-500 hover:border-purple-800/50 hover:shadow-2xl hover:bg-slate-800/90 animate-fade-in-up hover:scale-105 hover:-translate-y-2"
              style={{
                animationDelay: `${projectsVisible ? index * 0.15 : 0}s`,
              }}
            >
              {/* Gradient overlay for better visual appeal */}
              <div className="absolute inset-0 bg-purple-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Image container with overlay */}
              <div className="relative overflow-hidden">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                {/* Dark overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Project Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {/* GitHub Link */}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-5 h-5 text-white" />
                  </a>

                  {/* Live Demo Link (solo si existe liveUrl) */}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-purple-800/50 rounded-full flex items-center justify-center hover:bg-purple-800/70 transition-colors duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-5 h-5 text-white" />
                    </a>
                  )}
                </div>
              </div>

              <div className="relative p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Enhanced tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1.5 bg-purple-800/20 text-purple-200 text-xs font-medium rounded-full border border-purple-800/30 hover:bg-purple-800/30 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-purple-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
