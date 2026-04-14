import type {
  ProjectMetadata,
  Database,
  Structure,
  Algorithm,
  Simulation,
  Category,
  DriveType,
  Transmission,
  ControlMethod,
  LearningParadigm,
  TaskType,
  Simulator,
  RLFramework,
  CommercialHardware,
  OpenSourceHardware,
  Dataset,
  Application,
  Difficulty,
  VerificationStatus
} from './schema';

// 重新导出所有类型
export type {
  ProjectMetadata,
  Database,
  Structure,
  Algorithm,
  Simulation,
  Category,
  DriveType,
  Transmission,
  ControlMethod,
  LearningParadigm,
  TaskType,
  Simulator,
  RLFramework,
  CommercialHardware,
  OpenSourceHardware,
  Dataset,
  Application,
  Difficulty,
  VerificationStatus
};

// 过滤器状态类型
export interface FilterState {
  learning_paradigm: string[];
  simulators: string[];
  verification_status: string[];
  hardware: string[];
  difficulty: string[];
  language: string[];
  drive_type: string[];
  transmission: string[];
}

// 排序配置类型
export interface SortConfig {
  key: keyof ProjectMetadata | 'relevance';
  order: 'asc' | 'desc';
}

// 视图模式类型
export type ViewMode = 'table' | 'card';

// 搜索结果类型
export interface SearchResult {
  item: ProjectMetadata;
  score?: number;
  matches?: Array<{
    indices: Array<[number, number]>;
    key?: string;
    value?: string;
  }>;
}

// 统计数据类型
export interface ProjectStats {
  total: number;
  verified: number;
  partial: number;
  paperOnly: number;
  unverified: number;
  byLanguage: Record<string, number>;
  byDifficulty: Record<string, number>;
  bySimulator: Record<string, number>;
  byLearningParadigm: Record<string, number>;
}
