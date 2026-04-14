// 所有枚举值的显示名称映射（用于UI展示）
export const DRIVE_TYPE_LABELS: Record<string, string> = {
  'Fully-Actuated': '全驱动',
  'Under-Actuated': '欠驱动',
  'Hybrid': '混合驱动',
  'N/A': '不适用'
};

export const TRANSMISSION_LABELS: Record<string, string> = {
  'Tendon-driven': '腱绳驱动',
  'Linkage-driven': '连杆驱动',
  'Direct-drive': '直驱',
  'Hydraulic': '液压',
  'Pneumatic': '气动',
  'N/A': '不适用'
};

export const CONTROL_METHOD_LABELS: Record<string, string> = {
  'Classical': '经典控制',
  'Learning-based': '学习算法',
  'Hybrid': '混合方法'
};

export const LEARNING_PARADIGM_LABELS: Record<string, string> = {
  'Reinforcement Learning': '强化学习 (RL)',
  'Imitation Learning': '模仿学习 (IL)',
  'VLA Model': 'VLA模型',
  'World Model': '世界模型',
  'Sim-to-Real': 'Sim-to-Real',
  'N/A': '不适用'
};

export const TASK_TYPE_LABELS: Record<string, string> = {
  'Dexterous Manipulation': '灵巧操作',
  'Object Grasping': '物体抓取',
  'Gesture Recognition': '手势识别',
  'Teleoperation': '遥操作',
  'General Interaction': '泛化交互'
};

export const SIMULATOR_LABELS: Record<string, string> = {
  'MuJoCo': 'MuJoCo',
  'Isaac Sim': 'Isaac Sim',
  'PyBullet': 'PyBullet',
  'Gazebo': 'Gazebo',
  'Unity': 'Unity',
  'NVIDIA Omniverse': 'NVIDIA Omniverse',
  'N/A': '不适用'
};

export const DIFFICULTY_LABELS: Record<string, string> = {
  'Beginner': '初学者',
  'Intermediate': '中级',
  'Advanced': '高级',
  'Expert': '专家'
};

export const DIFFICULTY_COLORS: Record<string, string> = {
  'Beginner': 'success',
  'Intermediate': 'warning',
  'Advanced': 'danger',
  'Expert': 'info'
};

export const VERIFICATION_STATUS_LABELS: Record<string, string> = {
  'Verified': '已验证',
  'Partial': '部分复现',
  'Paper-Only': '仅论文',
  'Unverified': '未验证'
};

export const VERIFICATION_STATUS_COLORS: Record<string, string> = {
  'Verified': 'success',
  'Partial': 'warning',
  'Paper-Only': 'info',
  'Unverified': 'danger'
};

// 语言选项
export const PROGRAMMING_LANGUAGES = [
  'Python', 'C++', 'C', 'Rust', 'JavaScript', 'TypeScript',
  'Julia', 'MATLAB', 'Go', 'Java', 'Other'
] as const;

// 所有过滤器维度的配置
export const FILTER_DIMENSIONS = [
  {
    key: 'learning_paradigm',
    label: '学习范式',
    options: Object.entries(LEARNING_PARADIGM_LABELS).filter(([k]) => k !== 'N/A')
  },
  {
    key: 'simulators',
    label: '仿真器',
    options: Object.entries(SIMULATOR_LABELS).filter(([k]) => k !== 'N/A')
  },
  {
    key: 'verification_status',
    label: '验证状态',
    options: Object.entries(VERIFICATION_STATUS_LABELS)
  },
  {
    key: 'difficulty',
    label: '难度',
    options: Object.entries(DIFFICULTY_LABELS)
  },
  {
    key: 'language',
    label: '编程语言',
    options: PROGRAMMING_LANGUAGES.map(lang => [lang, lang])
  },
  {
    key: 'drive_type',
    label: '驱动方式',
    options: Object.entries(DRIVE_TYPE_LABELS).filter(([k]) => k !== 'N/A')
  },
  {
    key: 'transmission',
    label: '传动方式',
    options: Object.entries(TRANSMISSION_LABELS).filter(([k]) => k !== 'N/A')
  }
] as const;

// 排序选项
export const SORT_OPTIONS = [
  { key: 'stars', label: 'Stars (GitHub)' },
  { key: 'last_updated', label: '最后更新时间' },
  { key: 'name', label: '项目名称' },
  { key: 'difficulty', label: '难度等级' }
] as const;

// Fuse.js 搜索配置
export const FUSE_OPTIONS = {
  keys: [
    { name: 'name', weight: 0.5 },
    { name: 'description', weight: 0.3 },
    { name: 'tech_stack', weight: 0.1 },
    { name: 'tags', weight: 0.1 }
  ],
  threshold: 0.3,
  useExtendedSearch: true,
  ignoreLocation: true,
  includeScore: true,
  minMatchCharLength: 2
} as const;
