import { ref, computed, type Ref } from 'vue';

export interface UsePaginationOptions {
  page?: number;
  pageSize?: number;
  total?: number;
}

export interface UsePaginationReturn {
  currentPage: Ref<number>;
  pageSize: Ref<number>;
  total: Ref<number>;
  totalPages: Ref<number>;
  startIndex: Ref<number>;
  endIndex: Ref<number>;
  hasNextPage: Ref<boolean>;
  hasPrevPage: Ref<boolean>;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  reset: () => void;
}

export function usePagination(options: UsePaginationOptions = {}): UsePaginationReturn {
  const currentPage = ref(options.page || 1);
  const pageSize = ref(options.pageSize || 50);
  const total = ref(options.total || 0);

  const totalPages = computed(() => {
    if (total.value === 0) return 0;
    return Math.ceil(total.value / pageSize.value);
  });

  const startIndex = computed(() => {
    if (total.value === 0) return 0;
    return (currentPage.value - 1) * pageSize.value + 1;
  });

  const endIndex = computed(() => {
    return Math.min(currentPage.value * pageSize.value, total.value);
  });

  const hasNextPage = computed(() => {
    return currentPage.value < totalPages.value;
  });

  const hasPrevPage = computed(() => {
    return currentPage.value > 1;
  });

  function setPage(page: number) {
    if (page < 1) page = 1;
    if (page > totalPages.value) page = totalPages.value;
    currentPage.value = page;
  }

  function setPageSize(size: number) {
    if (size < 1) size = 1;
    pageSize.value = size;
    currentPage.value = 1;
  }

  function nextPage() {
    if (hasNextPage.value) {
      currentPage.value++;
    }
  }

  function prevPage() {
    if (hasPrevPage.value) {
      currentPage.value--;
    }
  }

  function reset() {
    currentPage.value = 1;
  }

  return {
    currentPage,
    pageSize,
    total,
    totalPages,
    startIndex,
    endIndex,
    hasNextPage,
    hasPrevPage,
    setPage,
    setPageSize,
    nextPage,
    prevPage,
    reset
  };
}
