import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Github, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { useTranslation } from "react-i18next";
import Home from "@/assets/Home.jpg";
import PeliculaFoto from "@/assets/PeliculaFotoFrontend.png";
import WebApi from "@/assets/descarga.jpg";
import DeliciasRd from "@/assets/DeliciasRd.png";

const ProjectsSection = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "fullstack" | "frontend" | "backend">("all");
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: projectsRef, isVisible: projectsVisible } = useScrollAnimation();

  const allProjects = [
    {
      id: 1,
      title: t("projects.project1.title"),
      description: t("projects.project1.description"),
      detailedDescription: t("projects.project1.detailedDescription"),
      image: Home,
      tags: ["Asp.Net Core", "React", "SQL Server", "Tailwind"],
      githubUrl: "https://github.com/homerportes/RealStateRD",
      category: "fullstack" as const,
    },
    {
      id: 5,
      title: t("projects.project5.title"),
      description: t("projects.project5.description"),
      detailedDescription: t("projects.project5.detailedDescription"),
      image: DeliciasRd,
      tags: ["React", "Tailwind CSS"],
      githubUrl: "https://github.com/homerportes/RestauranteRD",
      liveUrl: "https://drrestaurant.netlify.app/",
      category: "frontend" as const,
    },
    {
      id: 3,
      title: t("projects.project3.title"),
      description: t("projects.project3.description"),
      detailedDescription: t("projects.project3.detailedDescription"),
      image: WebApi,
      tags: ["Asp.Net Core", "SignalR", "JWT", "Rx.net"],
      githubUrl: "https://github.com/homerportes/WebApiTask",
      category: "backend" as const,
    },
    {
      id: 2,
      title: t("projects.project2.title"),
      description: t("projects.project2.description"),
      detailedDescription: t("projects.project2.detailedDescription"),
      image: PeliculaFoto,
      tags: ["Asp.Net Core", "Html", "CSS", "JavaScript"],
      githubUrl: "https://github.com/homerportes/ApiPelicula",
      category: "fullstack" as const,
    },
  ];

  const projects = filter === "all" 
    ? allProjects 
    : allProjects.filter(project => project.category === filter);

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

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <button
              onClick={() => {
                setFilter("all");
                setCurrentIndex(0);
              }}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                filter === "all"
                  ? "bg-purple-700 text-white shadow-lg scale-105"
                  : "bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              {t("projects.filterAll")}
            </button>
            <button
              onClick={() => {
                setFilter("fullstack");
                setCurrentIndex(0);
              }}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                filter === "fullstack"
                  ? "bg-purple-700 text-white shadow-lg scale-105"
                  : "bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              {t("projects.filterFullStack")}
            </button>
            <button
              onClick={() => {
                setFilter("frontend");
                setCurrentIndex(0);
              }}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                filter === "frontend"
                  ? "bg-purple-700 text-white shadow-lg scale-105"
                  : "bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              {t("projects.filterFrontend")}
            </button>
            <button
              onClick={() => {
                setFilter("backend");
                setCurrentIndex(0);
              }}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                filter === "backend"
                  ? "bg-purple-700 text-white shadow-lg scale-105"
                  : "bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              {t("projects.filterBackend")}
            </button>
          </div>
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
              className="group relative overflow-hidden rounded-2xl bg-slate-800/80 border border-slate-700/40 transition-all duration-500 hover:border-purple-800/50 hover:shadow-2xl hover:bg-slate-800/90 animate-fade-in-up hover:scale-105 hover:-translate-y-2 flex flex-col"
              style={{
                animationDelay: `${projectsVisible ? index * 0.15 : 0}s`,
              }}
            >
              {/* Gradient overlay for better visual appeal */}
              <div className="absolute inset-0 bg-purple-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Image container with overlay */}
              <div className="relative overflow-hidden h-64">
                <div
                  className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-110"
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

              <div className="relative p-6 flex flex-col h-full">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Enhanced tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1.5 bg-purple-800/20 text-purple-200 text-xs font-medium rounded-full border border-purple-800/30 hover:bg-purple-800/30 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Spacer to push button to bottom */}
                <div className="flex-1"></div>

                {/* See More Button */}
                <Button
                  onClick={() => setSelectedProject(project.id)}
                  className="w-full bg-purple-800 hover:bg-purple-700 text-white transition-all duration-300 transform hover:scale-105 mt-4"
                >
                  {t("projects.seeMore")}
                </Button>

                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-purple-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </Card>
          ))}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <Dialog
            open={selectedProject !== null}
            onOpenChange={(open) => !open && setSelectedProject(null)}
          >
            <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto bg-slate-900 border-purple-800 shadow-2xl">
              {/* Decorative top bar */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-purple-700 rounded-t-lg"></div>
              
              <DialogHeader className="space-y-4 pt-2">
                <DialogTitle className="text-3xl font-extrabold text-purple-400 leading-tight">
                  {projects.find((p) => p.id === selectedProject)?.title}
                </DialogTitle>
                
                {/* Tags below title */}
                <div className="flex flex-wrap gap-2">
                  {projects
                    .find((p) => p.id === selectedProject)
                    ?.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        className="px-4 py-1.5 bg-purple-900 text-purple-200 border border-purple-700 font-medium text-sm hover:bg-purple-800 transition-all duration-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                </div>
              </DialogHeader>

              {/* Detailed Description with nice formatting */}
              <div className="my-6 space-y-4">
                <DialogDescription className="text-gray-300 text-base leading-relaxed whitespace-pre-line">
                  {projects.find((p) => p.id === selectedProject)?.detailedDescription}
                </DialogDescription>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-purple-800 my-6"></div>

              {/* Action Buttons with enhanced styling */}
              <div className="flex flex-col sm:flex-row gap-4 pb-2">
                {projects.find((p) => p.id === selectedProject)?.githubUrl && (
                  <Button
                    asChild
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 py-6"
                  >
                    <a
                      href={projects.find((p) => p.id === selectedProject)?.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <Github className="w-5 h-5 mr-2" />
                      <span className="font-semibold">{t("projects.viewGithub")}</span>
                    </a>
                  </Button>
                )}
                {projects.find((p) => p.id === selectedProject)?.liveUrl && (
                  <Button
                    asChild
                    className="flex-1 bg-purple-700 hover:bg-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 py-6"
                  >
                    <a
                      href={projects.find((p) => p.id === selectedProject)?.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      <span className="font-semibold">{t("projects.visitWebsite")}</span>
                    </a>
                  </Button>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
