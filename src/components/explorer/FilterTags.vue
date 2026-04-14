<template>
  <div v-if="activeFilters.length > 0" class="filter-tags">
    <span class="filter-tags__label">{{ t('filterTags.activeFilters') }}:</span>
    <div class="filter-tags__list">
      <el-tag
        v-for="filter in activeFilters"
        :key="`${filter.key}-${filter.value}`"
        closable
        @close="handleRemove(filter)"
      >
        {{ getFilterLabel(filter.key, filter.value) }}
      </el-tag>
      <el-button text type="primary" size="small" @click="handleClearAll">
        {{ t('filterTags.clearAll') }}
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useProjectStore } from '@/store/projectStore';
import {
  LEARNING_PARADIGM_LABELS,
  SIMULATOR_LABELS,
  VERIFICATION_STATUS_LABELS,
  DIFFICULTY_LABELS,
  DRIVE_TYPE_LABELS,
  TRANSMISSION_LABELS
} from '@/types/constants';

const store = useProjectStore();
const { t } = useI18n();

const activeFilters = computed(() => store.activeFilters);

function getFilterLabel(key: string, value: string): string {
  const labelMaps: Record<string, Record<string, string>> = {
    learning_paradigm: LEARNING_PARADIGM_LABELS,
    simulators: SIMULATOR_LABELS,
    verification_status: VERIFICATION_STATUS_LABELS,
    difficulty: DIFFICULTY_LABELS,
    drive_type: DRIVE_TYPE_LABELS,
    transmission: TRANSMISSION_LABELS
  };

  return labelMaps[key]?.[value] || value;
}

function handleRemove(filter: { key: string; value: string }) {
  store.toggleFilter(filter.key as any, filter.value);
}

function handleClearAll() {
  store.clearAllFilters();
}
</script>

<style lang="scss" scoped>
.filter-tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px 24px;
  background-color: var(--bg-color-secondary);
  border-bottom: 1px solid var(--border-color);

  &__label {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-color-secondary);
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
  }

  :deep(.el-tag) {
    margin: 0;
  }
}
</style>
