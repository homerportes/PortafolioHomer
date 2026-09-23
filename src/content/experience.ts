import type { ExperienceRole } from '@/types';

export const experience: ExperienceRole[] = [
  {
    id: 'intelca-junior',
    title: 'Junior Software Developer',
    company: 'Intelca SRL',
    location: 'Santo Domingo, Dominican Republic',
    period: 'Oct 2025–Jun 2026',
    current: false,
    areas: ['Automation', 'Data', 'SCADA'],
    work: [
      'Developed Python scripts for automation and real-time data validation in SCADA environments.',
      'Designed and optimized complex MySQL queries for operational reports and critical dashboards.',
    ],
  },
  {
    id: 'intelca-semisenior',
    title: 'Semi-Senior Software Developer',
    company: 'Intelca SRL',
    location: 'Santo Domingo, Dominican Republic',
    period: 'Jun 2026–Present',
    current: true,
    areas: ['Industrial software', 'Backend', 'AI', 'Data', 'Technical leadership'],
    work: [
      'Integrated Ignition SCADA with Python/FastAPI microservices and AI.',
      'Built AI-assisted industrial analyses, AI insights and operational recommendations from validated industrial data.',
      'Developed Python/FastAPI microservices for AI chat and automated industrial reporting.',
      'Created and assigned technical tasks to junior developers, working with Kanban and SCRUM.',
    ],
  },
];
