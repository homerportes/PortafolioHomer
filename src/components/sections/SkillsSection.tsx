import React from "react";
import { Card } from "@/components/ui/card";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { useTranslation } from "react-i18next";
import { Server, Code, Wrench } from "lucide-react";
import CsharpOriginal from "devicons-react/icons/CsharpOriginal";
import DotnetcoreOriginal from "devicons-react/icons/DotnetcoreOriginal";
import MysqlOriginal from "devicons-react/icons/MysqlOriginal";
import MicrosoftsqlserverPlain from "devicons-react/icons/MicrosoftsqlserverPlain";
import Html5Original from "devicons-react/icons/Html5Original";
import Css3Original from "devicons-react/icons/Css3Original";
import JavascriptOriginal from "devicons-react/icons/JavascriptOriginal";
import ReactOriginal from "devicons-react/icons/ReactOriginal";
import TailwindcssOriginal from "devicons-react/icons/TailwindcssOriginal";
import GitOriginal from "devicons-react/icons/GitOriginal";
import GithubOriginal from "devicons-react/icons/GithubOriginal";
import LinuxOriginal from "devicons-react/icons/LinuxOriginal";

const SkillsSection = () => {
  const { t } = useTranslation();
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation();
  const skillCategories = [
    {
      title: t("skills.backend.title"),
      description: t("skills.backend.description"),
      icon: <Server className="h-7 w-7" />,
      skills: [
        { name: "C#", icon: <CsharpOriginal size="60" /> },
        { name: "ASP.NET Core", icon: <DotnetcoreOriginal size="60" /> },
        { name: "SQL Server", icon: <MicrosoftsqlserverPlain size="60" /> },
        { name: "MySQL", icon: <MysqlOriginal size="60" /> },
      ],
      color: "from-purple-800 to-purple-900",
    },
    {
      title: t("skills.frontend.title"),
      description: t("skills.frontend.description"),
      icon: <Code className="h-7 w-7" />,
      skills: [
        { name: "HTML", icon: <Html5Original size="60" /> },
        { name: "CSS", icon: <Css3Original size="60" /> },
        { name: "JavaScript", icon: <JavascriptOriginal size="60" /> },
        { name: "React", icon: <ReactOriginal size="60" /> },
        { name: "Tailwind", icon: <TailwindcssOriginal size="60" /> },
      ],
      color: "from-green-500 to-green-700",
    },
    {
      title: t("skills.tools.title"),
      description: t("skills.tools.description"),
      icon: <Wrench className="h-7 w-7" />,
      skills: [
        { name: "Git", icon: <GitOriginal size="60" /> },
        { name: "GitHub", icon: <GithubOriginal size="60" /> },
        { name: "Linux", icon: <LinuxOriginal size="60" /> },
        {
          name: "Postman",
          icon: (
            <div className="w-15 h-15 bg-orange-500 rounded flex items-center justify-center text-white text-lg font-bold">
              P
            </div>
          ),
        },
      ],
      color: "from-purple-800 to-purple-900",
    },
  ];

  return (
    <section
      id="skills"
      className="py-16 md:py-24 px-4 sm:px-10 md:px-20 lg:px-40 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-1000 ${
            headerVisible
              ? "animate-fade-in-up opacity-100"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white animate-slide-in-down stagger-1">
            {t("skills.title")}
          </h2>
          <div className="w-24 h-1 bg-purple-800 mx-auto my-6 animate-scale-in stagger-2"></div>
          <p className="mt-4 text-lg text-gray-300 animate-fade-in-up stagger-3">
            {t("skills.description")}
          </p>
        </div>

        {/* Skills Grid */}
        <div
          ref={skillsRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${
            skillsVisible ? "opacity-100" : "opacity-0 translate-y-8"
          }`}
        >
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className="flex flex-col gap-6 rounded-2xl border border-slate-700/40 bg-slate-800/80 p-6 transition-all duration-500 hover:border-purple-800/50 hover:shadow-2xl hover:bg-slate-800/90 animate-scale-in hover:scale-105 hover:-translate-y-2"
              style={{ animationDelay: `${skillsVisible ? index * 0.2 : 0}s` }}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`bg-gradient-to-br ${category.color} p-3 rounded-full text-white`}
                >
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold leading-tight text-white">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-300 mt-1">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-600/40 transition-all duration-300 group/skill animate-fade-in hover:scale-110 hover:-translate-y-1"
                    style={{
                      animationDelay: `${(skillIndex + index * 4) * 0.05}s`,
                    }}
                  >
                    <div className="text-white group-hover/skill:scale-125 group-hover/skill:rotate-12 transition-all duration-300 animate-float">
                      {skill.icon}
                    </div>
                    <span className="text-xs font-medium text-gray-300 text-center group-hover/skill:text-white transition-colors duration-300">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Section */}
        <div
          className="mt-16 text-center animate-fade-in"
          style={{ animationDelay: "0.8s" }}
        >
          <Card className="bg-purple-800/10 border-purple-800/20 p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              {t("skills.learning.title")}
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              {t("skills.learning.description")}
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
