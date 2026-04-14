import type { Database } from '@/types/schema';

/**
 * 从静态 JSON 文件获取项目数据
 */
export async function fetchProjects(): Promise<Database> {
  try {
    const response = await fetch('/data/projects.json');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Database = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    throw error;
  }
}

/**
 * 根据 ID 获取单个项目
 */
export async function fetchProjectById(id: string): Promise<Database[number] | null> {
  try {
    const projects = await fetchProjects();
    return projects.find(p => p.id === id) || null;
  } catch (error) {
    console.error(`Failed to fetch project ${id}:`, error);
    return null;
  }
}

/**
 * 获取项目统计数据
 */
export async function fetchProjectStats(): Promise<{
  total: number;
  lastUpdated: string;
  version: string;
}> {
  try {
    const response = await fetch('/data/stats.json');
    if (!response.ok) {
      return {
        total: 0,
        lastUpdated: new Date().toISOString(),
        version: '1.0.0'
      };
    }
    return await response.json();
  } catch {
    return {
      total: 0,
      lastUpdated: new Date().toISOString(),
      version: '1.0.0'
    };
  }
}
