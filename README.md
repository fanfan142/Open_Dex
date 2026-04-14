# DexHand-OpenSource-Hub

灵巧手开源资料导航项目 - 面向全球机器人研究者的公共平台

## 技术栈

- Vue 3 + Composition API
- TypeScript
- Vite
- Element Plus
- Pinia
- Fuse.js
- Zod
- vue-i18n

## 功能特性

- 多维分类检索（结构/算法/仿真/数据集/硬件/元数据）
- Fuse.js 全文搜索 + 多维度交叉筛选
- 虚拟滚动支持大数据量
- GitHub Actions PR 数据校验
- 中英文国际化
- 亮暗主题切换

## 开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 类型检查
npm run type-check

# 构建
npm run build

# 数据校验
npm run validate-data
```

## 项目结构

```
src/
├── assets/          # 静态资源
├── components/      # Vue 组件
│   ├── common/      # 通用组件
│   ├── layout/      # 布局组件
│   └── explorer/    # 探索页组件
├── composables/     # 组合式函数
├── i18n/           # 国际化
├── router/         # 路由
├── store/          # Pinia 状态
├── types/          # 类型定义
├── utils/          # 工具函数
└── views/          # 页面视图
```

## 许可证

MIT
