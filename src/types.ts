export interface TechItem {
  name: string;
  category: 'frontend' | 'backend' | 'design' | 'tools';
  icon: string;
  level: number; // percentage
  color?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Freelance';
  description: string;
  achievements: string[];
  techStack: string[];
}

export interface FormationItem {
  id: string;
  title?: string;
  institution: string;
  period: string;
  description: string;
  badge?: string;
  skillsLearned: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Web Site' | 'UI Poster' | 'Mobile' | 'Library';
  description: string;
  image: string;
  techStack: string[];
  demoUrl: string;
  githubUrl?: string;
  featured: boolean;
  metrics?: string;
}

export interface AnalyticsEvent {
  id: string;
  timestamp: string;
  eventName: string;
  category: string;
  details?: Record<string, any>;
}

export type ThemeMode = 'dark' | 'light';
