export type EducationEntry = {
  id: string;
  institution: string;
  institutionFull?: string;
  program?: string;
  period?: string;
  status: 'completed' | 'upcoming';
};
