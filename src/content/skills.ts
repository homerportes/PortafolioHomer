import type { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'backend',
    label: 'Backend',
    index: 'i',
    skills: ['C#', 'ASP.NET Core 9', 'WebAPI', 'Entity Framework Core', 'Python', 'FastAPI', 'Java', 'SQL Server', 'MySQL'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    index: 'ii',
    skills: ['React', 'TypeScript', 'JavaScript ES6+', 'HTML5', 'CSS3', 'Razor Views', 'Bootstrap 5'],
  },
  {
    id: 'architecture',
    label: 'Architecture',
    index: 'iii',
    skills: ['Onion Architecture', 'Clean Architecture', 'CQRS', 'MediatR', 'Repository Pattern', 'SOLID'],
  },
  {
    id: 'industrial',
    label: 'Industrial / Automation',
    index: 'iv',
    skills: ['Ignition', 'SCADA', 'Python automation', 'Industrial data', 'FastAPI microservices', 'AI integrations for industrial systems'],
  },
  {
    id: 'tools',
    label: 'Tools / Cloud',
    index: 'v',
    skills: ['Azure Functions', 'Git', 'GitHub', 'Postman', 'Swagger', 'SCRUM'],
  },
  {
    id: 'learning',
    label: 'Currently learning',
    index: 'vi',
    skills: ['Artificial Intelligence', 'Data Science'],
    learning: true,
  },
];
