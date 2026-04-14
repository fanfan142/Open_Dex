import type { Database } from '@/types/schema';

const BASE_PATH = import.meta.env.BASE_URL || '/';
const DATA_PATH = 'data/projects.json';

function getCandidateUrls(): string[] {
  const normalizedBase = BASE_PATH.endsWith('/') ? BASE_PATH : `${BASE_PATH}/`;
  const baseCandidate = `${normalizedBase}${DATA_PATH}`;
  const rootCandidate = `/${DATA_PATH}`;
  const relativeCandidate = `./${DATA_PATH}`;

  return Array.from(new Set([baseCandidate, rootCandidate, relativeCandidate]));
}

/**
 * 获取所有项目数据
 */
export async function fetchProjects(): Promise<Database> {
  const errors: string[] = [];

  try {
    for (const url of getCandidateUrls()) {
      const response = await fetch(url);
      if (!response.ok) {
        errors.push(`${url} -> HTTP ${response.status}`);
        continue;
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        return data;
      }

      errors.push(`${url} -> Invalid payload shape`);
    }

    throw new Error(errors.join(' | '));
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return [];
  }
}

/**
 * 根据 ID 获取单个项目
 */
export async function fetchProjectById(id: string): Promise<Database[number] | null> {
  const projects = await fetchProjects();
  return projects.find(p => p.id === id) || null;
}

/**
 * 获取项目统计数据
 */
export async function fetchProjectStats(): Promise<{
  total: number;
  lastUpdated: string;
  version: string;
}> {
  const projects = await fetchProjects();
  return {
    total: projects.length,
    lastUpdated: new Date().toISOString(),
    version: '1.0.0'
  };
}
