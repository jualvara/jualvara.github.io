export type ProjectCategory = 'Data Science' | 'Business Intelligence' | 'Developer' | 'Odoo';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: ProjectCategory;
  imageUrl: string;
  githubUrl?: string;
  demoUrl?: string;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  icon: string; // Lucide icon name or emoji
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  description: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface ProcessStep {
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  tags: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
  icon: string; // Lucide icon name
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}