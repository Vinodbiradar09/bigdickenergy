export interface Project {
  id: string;
  name: string;
  desc?: string | null;
  cause: string;
  age?: string | null;
  eulogy?: string | null;
  commit?: string | null;
  github?: string | null;
  url?: string | null;
  felt: number;
  createdAt: string;
}
