import { z } from 'zod';

// ========== 枚举定义 ==========

// 驱动方式
export const DriveTypeEnum = z.enum([
  'Fully-Actuated',
  'Under-Actuated',
  'Hybrid',
  'N/A'
]);
export type DriveType = z.infer<typeof DriveTypeEnum>;

// 传动方式
export const TransmissionEnum = z.enum([
  'Tendon-driven',
  'Linkage-driven',
  'Direct-drive',
  'Hydraulic',
  'Pneumatic',
  'N/A'
]);
export type Transmission = z.infer<typeof TransmissionEnum>;

// 控制方法
export const ControlMethodEnum = z.enum([
  'Classical',
  'Learning-based',
  'Hybrid'
]);
export type ControlMethod = z.infer<typeof ControlMethodEnum>;

// 学习范式
export const LearningParadigmEnum = z.enum([
  'Reinforcement Learning',
  'Imitation Learning',
  'VLA Model',
  'World Model',
  'Sim-to-Real',
  'N/A'
]);
export type LearningParadigm = z.infer<typeof LearningParadigmEnum>;

// 任务类型
export const TaskTypeEnum = z.enum([
  'Dexterous Manipulation',
  'Object Grasping',
  'Gesture Recognition',
  'Teleoperation',
  'General Interaction'
]);
export type TaskType = z.infer<typeof TaskTypeEnum>;

// 物理仿真器
export const SimulatorEnum = z.enum([
  'MuJoCo',
  'Isaac Sim',
  'PyBullet',
  'Gazebo',
  'Unity',
  'NVIDIA Omniverse',
  'N/A'
]);
export type Simulator = z.infer<typeof SimulatorEnum>;

// 强化学习框架
export const RLFrameworkEnum = z.enum([
  'RLlib',
  'Stable-Baselines3',
  'TD3',
  'SAC',
  'PPO',
  'Custom',
  'N/A'
]);
export type RLFramework = z.infer<typeof RLFrameworkEnum>;

// 商业产品
export const CommercialHardwareEnum = z.enum([
  'Shadow Hand',
  'Allegro Hand',
  'LEAP Hand',
  'SVSH',
  'DLR Hand',
  'Boston Dynamics Hand',
  'N/A'
]);
export type CommercialHardware = z.infer<typeof CommercialHardwareEnum>;

// 开源硬件
export const OpenSourceHardwareEnum = z.enum([
  'OpenHand',
  'Dexterous-Hand',
  'Custom Allegro',
  'N/A'
]);
export type OpenSourceHardware = z.infer<typeof OpenSourceHardwareEnum>;

// 数据集
export const DatasetEnum = z.enum([
  'DexGraspNet',
  'Dex-VLA',
  'RH20T',
  'GR-1',
  'HOI-4D',
  'Human-hand Prior',
  'Multi-modal (Vision-Tactile)',
  'N/A'
]);
export type Dataset = z.infer<typeof DatasetEnum>;

// 应用场景
export const ApplicationEnum = z.enum([
  'Teleoperation',
  'Surgical Robot',
  'Service Robot',
  'Industrial Assembly',
  'Research',
  'N/A'
]);
export type Application = z.infer<typeof ApplicationEnum>;

// 复现难度
export const DifficultyEnum = z.enum([
  'Beginner',
  'Intermediate',
  'Advanced',
  'Expert'
]);
export type Difficulty = z.infer<typeof DifficultyEnum>;

// 验证状态
export const VerificationStatusEnum = z.enum([
  'Verified',
  'Partial',
  'Paper-Only',
  'Unverified'
]);
export type VerificationStatus = z.infer<typeof VerificationStatusEnum>;

// ========== 结构维度 Schema ==========

export const StructureSchema = z.object({
  drive_type: z.array(DriveTypeEnum).optional(),
  transmission: z.array(TransmissionEnum).optional()
});
export type Structure = z.infer<typeof StructureSchema>;

// ========== 算法维度 Schema ==========

export const AlgorithmSchema = z.object({
  control_method: z.array(ControlMethodEnum).optional(),
  learning_paradigm: z.array(LearningParadigmEnum).optional(),
  task_type: z.array(TaskTypeEnum).optional()
});
export type Algorithm = z.infer<typeof AlgorithmSchema>;

// ========== 仿真维度 Schema ==========

export const SimulationSchema = z.object({
  simulators: z.array(SimulatorEnum).optional(),
  rl_frameworks: z.array(RLFrameworkEnum).optional()
});
export type Simulation = z.infer<typeof SimulationSchema>;

// ========== 分类 Schema ==========

export const CategorySchema = z.object({
  structure: StructureSchema.optional(),
  algorithm: AlgorithmSchema.optional(),
  simulation: SimulationSchema.optional(),
  dataset: z.array(DatasetEnum).optional(),
  hardware: z.array(z.string()).optional()
});
export type Category = z.infer<typeof CategorySchema>;

// ========== 项目 Schema ==========

export const ProjectSchema = z.object({
  id: z.string().uuid({
    message: '项目ID必须是合法的UUID格式'
  }).describe('项目的唯一全局标识符'),

  name: z.string().min(2, {
    message: '项目名称不能少于2个字符'
  }).max(100, {
    message: '项目名称不能超过100个字符'
  }).describe('项目名称'),

  repo_url: z.string().url({
    message: '必须是合法的URL格式'
  }).describe('GitHub仓库地址'),

  description: z.string().max(800, {
    message: '项目描述不能超过800个字符'
  }).describe('简短描述'),

  category: CategorySchema.optional().describe('技术分类'),

  tech_stack: z.array(z.string()).min(1, {
    message: '至少需要指定一个技术栈'
  }).describe('技术栈列表'),

  language: z.string().describe('主要编程语言'),

  stars: z.number().int().nonnegative().default(0).describe('GitHub Stars数'),

  last_updated: z.string().datetime({
    message: '必须为ISO 8601格式的时间字符串'
  }).describe('最后更新时间'),

  paper_url: z.string().url().optional().nullable().describe('相关论文链接'),

  difficulty: DifficultyEnum.describe('复现难度等级'),

  verification_status: VerificationStatusEnum.describe('验证状态'),

  tags: z.array(z.string()).describe('标签列表'),

  license: z.string().optional().describe('开源许可证'),

  homepage: z.string().url().optional().nullable().describe('项目主页')
});

// ========== 数据库 Schema（数组） ==========

export const DatabaseSchema = z.array(ProjectSchema);

// ========== 类型导出 ==========

export type ProjectMetadata = z.infer<typeof ProjectSchema>;
export type Database = z.infer<typeof DatabaseSchema>;

// ========== 默认值工具函数 ==========

export const getDefaultProject = (): Partial<ProjectMetadata> => ({
  stars: 0,
  tags: [],
  tech_stack: [],
  verification_status: 'Unverified'
});
