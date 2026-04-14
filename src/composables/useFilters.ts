import { computed, type Ref } from 'vue';
import type { FilterState } from '@/types';
import { useProjectStore } from '@/store/projectStore';

export interface UseFiltersReturn {
  filters: Ref<FilterState>;
  activeFilterCount: Ref<number>;
  hasActiveFilters: Ref<boolean>;
  toggleFilter: (key: keyof FilterState, value: string) => void;
  setFilters: (key: keyof FilterState, values: string[]) => void;
  clearFilter: (key: keyof FilterState) => void;
  clearAllFilters: () => void;
  isFilterActive: (key: keyof FilterState, value: string) => boolean;
}

export function useFilters(): UseFiltersReturn {
  const store = useProjectStore();

  const filters = computed(() => store.filters);

  const activeFilterCount = computed(() => {
    return Object.values(store.filters).reduce((sum, arr) => sum + arr.length, 0);
  });

  const hasActiveFilters = computed(() => activeFilterCount.value > 0);

  function toggleFilter(key: keyof FilterState, value: string) {
    store.toggleFilter(key, value);
  }

  function setFilters(key: keyof FilterState, values: string[]) {
    store.setFilter(key, values);
  }

  function clearFilter(key: keyof FilterState) {
    store.clearFilter(key);
  }

  function clearAllFilters() {
    store.clearAllFilters();
  }

  function isFilterActive(key: keyof FilterState, value: string): boolean {
    return store.filters[key].includes(value);
  }

  return {
    filters,
    activeFilterCount,
    hasActiveFilters,
    toggleFilter,
    setFilters,
    clearFilter,
    clearAllFilters,
    isFilterActive
  };
}
