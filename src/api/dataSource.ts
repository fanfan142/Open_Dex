import type { Database } from '@/types/schema';

const BASE_PATH = import.meta.env.BASE_URL || '/';

/**
 * 获取所有项目数据
 */
export async function fetchProjects(): Promise<Database> {
  try {
    const response = await fetch(`${BASE_PATH}data/projects.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
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
