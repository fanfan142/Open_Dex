import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import type {
  ProjectMetadata,
  Database,
  FilterState,
  SortConfig,
  ViewMode,
  ProjectStats
} from '@/types';
import { useSearch } from '@/composables/useSearch';
import { fetchProjects } from '@/api/dataSource';

export const useProjectStore = defineStore('project', () => {
  // ========== 核心数据源 ==========
  const rawProjects = ref<Database>([]);
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  // ========== 筛选状态 ==========
  const filters = ref<FilterState>({
    learning_paradigm: [],
    simulators: [],
    verification_status: [],
    hardware: [],
    difficulty: [],
    language: [],
    drive_type: [],
    transmission: []
  });

  // ========== 搜索与视图状态 ==========
  const searchQuery = ref('');
  const sortConfig = ref<SortConfig>({ key: 'stars', order: 'desc' });
  const viewMode = ref<ViewMode>('table');
  const currentPage = ref(1);
  const pageSize = ref(50);

  // ========== Fuse.js 搜索集成 ==========
  const { fuseSearch, updateIndex } = useSearch(rawProjects);

  // 监听数据变化时更新 Fuse 索引
  watch(rawProjects, (newData) => {
    updateIndex(newData);
  }, { deep: true });

  // ========== 计算属性 ==========

  /**
   * 核心计算引擎：管道式过滤
   */
  const processedProjects = computed(() => {
    let result = rawProjects.value;

    // 管道A：执行全文检索
    if (searchQuery.value.trim()) {
      result = fuseSearch(searchQuery.value);
    }

    // 管道B：多维度过滤
    result = result.filter(project => {
      // 学习范式过滤（OR关系）
      if (filters.value.learning_paradigm.length > 0) {
        const projectParadigms = project.category?.algorithm?.learning_paradigm || [];
        const hasMatch = filters.value.learning_paradigm.some(p =>
          projectParadigms.includes(p as any)
        );
        if (!hasMatch) return false;
      }

      // 仿真器过滤（OR关系）
      if (filters.value.simulators.length > 0) {
        const projectSims = project.category?.simulation?.simulators || [];
        const hasMatch = filters.value.simulators.some(s =>
          projectSims.includes(s as any)
        );
        if (!hasMatch) return false;
      }

      // 验证状态过滤
      if (filters.value.verification_status.length > 0) {
        if (!filters.value.verification_status.includes(project.verification_status)) {
          return false;
        }
      }

      // 难度过滤
      if (filters.value.difficulty.length > 0) {
        if (!filters.value.difficulty.includes(project.difficulty)) {
          return false;
        }
      }

      // 编程语言过滤
      if (filters.value.language.length > 0) {
        if (!filters.value.language.includes(project.language)) {
          return false;
        }
      }

      // 驱动方式过滤
      if (filters.value.drive_type.length > 0) {
        const projectDrives = project.category?.structure?.drive_type || [];
        const hasMatch = filters.value.drive_type.some(d =>
          projectDrives.includes(d as any)
        );
        if (!hasMatch) return false;
      }

      // 传动方式过滤
      if (filters.value.transmission.length > 0) {
        const projectTrans = project.category?.structure?.transmission || [];
        const hasMatch = filters.value.transmission.some(t =>
          projectTrans.includes(t as any)
        );
        if (!hasMatch) return false;
      }

      return true;
    });

    // 管道C：排序
    result = [...result].sort((a, b) => {
      const { key, order } = sortConfig.value;

      if (key === 'relevance') {
        return 0;
      }

      let valA = a[key as keyof ProjectMetadata];
      let valB = b[key as keyof ProjectMetadata];

      // 处理时间格式
      if (key === 'last_updated') {
        valA = new Date(valA as string).getTime();
        valB = new Date(valB as string).getTime();
      }

      // 处理数值
      if (typeof valA === 'number' && typeof valB === 'number') {
        return order === 'asc' ? valA - valB : valB - valA;
      }

      // 处理字符串
      if (typeof valA === 'string' && typeof valB === 'string') {
        return order === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      return 0;
    });

    return result;
  });

  /**
   * 分页后的项目列表
   */
  const paginatedProjects = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return processedProjects.value.slice(start, end);
  });

  /**
   * 总页数
   */
  const totalPages = computed(() => {
    return Math.ceil(processedProjects.value.length / pageSize.value);
  });

  /**
   * 项目统计数据
   */
  const stats = computed<ProjectStats>(() => {
    const projects = rawProjects.value;

    const byLanguage: Record<string, number> = {};
    const byDifficulty: Record<string, number> = {};
    const bySimulator: Record<string, number> = {};
    const byLearningParadigm: Record<string, number> = {};

    let verified = 0, partial = 0, paperOnly = 0, unverified = 0;

    projects.forEach(p => {
      byLanguage[p.language] = (byLanguage[p.language] || 0) + 1;
      byDifficulty[p.difficulty] = (byDifficulty[p.difficulty] || 0) + 1;

      switch (p.verification_status) {
        case 'Verified': verified++; break;
        case 'Partial': partial++; break;
        case 'Paper-Only': paperOnly++; break;
        case 'Unverified': unverified++; break;
      }

      p.category?.simulation?.simulators?.forEach(sim => {
        bySimulator[sim] = (bySimulator[sim] || 0) + 1;
      });

      p.category?.algorithm?.learning_paradigm?.forEach(lp => {
        byLearningParadigm[lp] = (byLearningParadigm[lp] || 0) + 1;
      });
    });

    return {
      total: projects.length,
      verified,
      partial,
      paperOnly,
      unverified,
      byLanguage,
      byDifficulty,
      bySimulator,
      byLearningParadigm
    };
  });

  /**
   * 活跃过滤器列表
   */
  const activeFilters = computed(() => {
    const active: Array<{ key: string; value: string }> = [];

    Object.entries(filters.value).forEach(([key, values]) => {
      values.forEach(value => {
        active.push({ key, value });
      });
    });

    return active;
  });

  /**
   * 是否存在活跃过滤器
   */
  const hasActiveFilters = computed(() => {
    return Object.values(filters.value).some(arr => arr.length > 0);
  });

  // ========== Actions ==========

  async function loadProjects() {
    if (isLoading.value) return;

    isLoading.value = true;
    error.value = null;

    try {
      rawProjects.value = await fetchProjects();
    } catch (e) {
      error.value = e instanceof Error ? e : new Error('Failed to load projects');
    } finally {
      isLoading.value = false;
    }
  }

  function setFilter(key: keyof FilterState, values: string[]) {
    filters.value = { ...filters.value, [key]: values };
    currentPage.value = 1;
  }

  function toggleFilter(key: keyof FilterState, value: string) {
    const current = filters.value[key];
    const index = current.indexOf(value);

    if (index === -1) {
      current.push(value);
    } else {
      current.splice(index, 1);
    }

    filters.value = { ...filters.value };
    currentPage.value = 1;
  }

  function clearFilter(key: keyof FilterState) {
    filters.value = { ...filters.value, [key]: [] };
    currentPage.value = 1;
  }

  function clearAllFilters() {
    filters.value = {
      learning_paradigm: [],
      simulators: [],
      verification_status: [],
      hardware: [],
      difficulty: [],
      language: [],
      drive_type: [],
      transmission: []
    };
    currentPage.value = 1;
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query;
    currentPage.value = 1;
  }

  function setSort(config: SortConfig) {
    sortConfig.value = config;
  }

  function setViewMode(mode: ViewMode) {
    viewMode.value = mode;
  }

  function setPage(page: number) {
    currentPage.value = page;
  }

  function setPageSize(size: number) {
    pageSize.value = size;
    currentPage.value = 1;
  }

  return {
    // State
    rawProjects,
    isLoading,
    error,
    filters,
    searchQuery,
    sortConfig,
    viewMode,
    currentPage,
    pageSize,

    // Computed
    processedProjects,
    paginatedProjects,
    totalPages,
    stats,
    activeFilters,
    hasActiveFilters,

    // Actions
    loadProjects,
    setFilter,
    toggleFilter,
    clearFilter,
    clearAllFilters,
    setSearchQuery,
    setSort,
    setViewMode,
    setPage,
    setPageSize
  };
});
