export type StackGroup = {
  label: string;
  items: string[];
};

export type Project = {
  id: string;
  slug: string;
  name: string;
  kicker: string;
  descriptor: string;
  status: 'completed' | 'in-development';
  priority: number;
  stack: StackGroup[];
  capabilities: string[];
  architecture: string[];
  repositoryUrls: {
    label: string;
    url: string;
  }[];
  featured: boolean;
};
