<template>
  <div class="explorer-view">
    <!-- Top Bar -->
    <div class="explorer-topbar">
      <div class="topbar-left">
        <SearchInput v-model="searchQuery" :placeholder="t('explorer.searchPlaceholder')" @search="handleSearch" />
      </div>
      <div class="topbar-right">
        <SortSelect v-model="sortConfig" />
        <ViewToggle v-model="viewMode" />
      </div>
    </div>

    <!-- Filter Tags -->
    <FilterTags />

    <!-- Main Content -->
    <div class="explorer-content">
      <!-- Sidebar -->
      <AppSidebar />

      <!-- Results -->
      <main class="explorer-main">
        <!-- Results Header -->
        <div class="results-header">
          <span class="results-count">{{ t('explorer.resultsCount', { count: processedProjects.length }) }}</span>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="loading-state">
          <el-skeleton :rows="10" animated />
        </div>

        <!-- Error State -->
        <el-result v-else-if="error" icon="error" :title="t('explorer.loadError')" :sub-title="error.message">
          <template #extra>
            <el-button type="primary" @click="loadProjects">{{ t('explorer.retry') }}</el-button>
          </template>
        </el-result>

        <!-- Empty State -->
        <EmptyState
          v-else-if="processedProjects.length === 0 && !hasActiveFilters"
          type="folder"
          :description="t('explorer.empty')"
        >
          <template #action>
            <el-button type="primary" @click="goToHome">{{ t('explorer.goHome') }}</el-button>
          </template>
        </EmptyState>

        <!-- No Results -->
        <EmptyState
          v-else-if="processedProjects.length === 0 && hasActiveFilters"
          type="search"
          :description="t('explorer.noResults')"
        >
          <template #action>
            <el-button @click="clearAllFilters">{{ t('explorer.clearFilters') }}</el-button>
          </template>
        </EmptyState>

        <!-- Table View -->
        <ProjectTable v-else-if="viewMode === 'table'" :projects="paginatedProjects" :loading="isLoading" @sort="handleSort" />

        <!-- Card View -->
        <ProjectCardGrid v-else :projects="paginatedProjects" @card-click="handleCardClick" />

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="pagination-wrapper">
          <el-pagination
            v-model:current-page="currentPage"
            :page-size="pageSize"
            :total="processedProjects.length"
            layout="prev, pager, next, jumper"
            background
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import AppSidebar from '@/components/layout/AppSidebar.vue';
import SearchInput from '@/components/explorer/SearchInput.vue';
import FilterTags from '@/components/explorer/FilterTags.vue';
import SortSelect from '@/components/explorer/SortSelect.vue';
import ViewToggle from '@/components/explorer/ViewToggle.vue';
import ProjectTable from '@/components/explorer/ProjectTable.vue';
import ProjectCardGrid from '@/components/explorer/ProjectCardGrid.vue';
import EmptyState from '@/components/common/EmptyState.vue';
import { useProjectStore } from '@/store/projectStore';
import type { SortConfig, ProjectMetadata } from '@/types';

const router = useRouter();
const { t } = useI18n();
const store = useProjectStore();

// State
const searchQuery = computed({
  get: () => store.searchQuery,
  set: (value) => store.setSearchQuery(value)
});

const sortConfig = computed({
  get: () => store.sortConfig,
  set: (value) => store.setSort(value)
});

const viewMode = computed({
  get: () => store.viewMode,
  set: (value) => store.setViewMode(value)
});

const isLoading = computed(() => store.isLoading);
const error = computed(() => store.error);
const hasActiveFilters = computed(() => store.hasActiveFilters);
const processedProjects = computed(() => store.processedProjects);
const paginatedProjects = computed(() => store.paginatedProjects);
const totalPages = computed(() => store.totalPages);

const currentPage = computed({
  get: () => store.currentPage,
  set: (value) => store.setPage(value)
});

const pageSize = computed(() => store.pageSize);

// Actions
function loadProjects() {
  store.loadProjects();
}

function handleSearch() {
  // Search is handled via v-model
}

function handleSort(config: SortConfig) {
  store.setSort(config);
}

function handleCardClick(project: ProjectMetadata) {
  window.open(project.repo_url, '_blank', 'noopener');
}

function clearAllFilters() {
  store.clearAllFilters();
}

function goToHome() {
  router.push('/');
}

onMounted(() => {
  if (store.rawProjects.length === 0) {
    loadProjects();
  }
});
</script>

<style lang="scss" scoped>
.explorer-view {
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
}

.explorer-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background-color: var(--bg-color);
  border-bottom: 1px solid var(--border-color);
  gap: 24px;
  flex-wrap: wrap;
}

.topbar-left {
  flex: 1;
  min-width: 280px;
  max-width: 480px;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.explorer-content {
  display: flex;
  flex: 1;
}

.explorer-main {
  flex: 1;
  min-width: 0;
  padding: 24px;
  background-color: var(--bg-color-secondary);
}

.results-header {
  margin-bottom: 16px;
}

.results-count {
  font-size: 14px;
  color: var(--text-color-secondary);
}

.loading-state {
  padding: 24px;
  background: var(--bg-color);
  border-radius: 8px;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

@media (max-width: 1024px) {
  .explorer-content {
    flex-direction: column;
  }

  .app-sidebar {
    width: 100%;
    height: auto;
    position: relative;
    top: 0;
    border-right: none;
    border-bottom: 1px solid var(--border-color);
  }
}
</style>
