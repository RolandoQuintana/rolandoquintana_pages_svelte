import type { PageLoad } from './$types';

interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  body: string;
}

export const load: PageLoad = async ({ fetch }): Promise<{ projects: Project[] }> => {
  const response = await fetch('/api/projects');
  const projects: Project[] = await response.json();
  return {
    projects
  };
};