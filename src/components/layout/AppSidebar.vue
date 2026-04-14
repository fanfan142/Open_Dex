<template>
  <aside class="app-sidebar">
    <div class="sidebar-header">
      <h3 class="sidebar-title">{{ t('sidebar.filterTitle') }}</h3>
      <el-button
        v-if="hasActiveFilters"
        text
        type="primary"
        size="small"
        @click="clearAllFilters"
      >
        {{ t('sidebar.clearAll') }}
      </el-button>
    </div>

    <el-scrollbar class="sidebar-scrollbar">
      <div class="sidebar-content">
        <!-- 学习范式 -->
        <FilterAccordion :title="t('filter.learningParadigm')" :count="filters.learning_paradigm.length">
          <el-checkbox-group v-model="filters.learning_paradigm">
            <el-checkbox v-for="[value, label] in LEARNING_PARADIGM_OPTIONS" :key="value" :value="value">
              {{ label }}
            </el-checkbox>
          </el-checkbox-group>
        </FilterAccordion>

        <!-- 仿真器 -->
        <FilterAccordion :title="t('filter.simulator')" :count="filters.simulators.length">
          <el-checkbox-group v-model="filters.simulators">
            <el-checkbox v-for="[value, label] in SIMULATOR_OPTIONS" :key="value" :value="value">
              {{ label }}
            </el-checkbox>
          </el-checkbox-group>
        </FilterAccordion>

        <!-- 验证状态 -->
        <FilterAccordion :title="t('filter.verificationStatus')" :count="filters.verification_status.length">
          <el-checkbox-group v-model="filters.verification_status">
            <el-checkbox v-for="[value, label] in VERIFICATION_STATUS_OPTIONS" :key="value" :value="value">
              {{ label }}
            </el-checkbox>
          </el-checkbox-group>
        </FilterAccordion>

        <!-- 难度 -->
        <FilterAccordion :title="t('filter.difficulty')" :count="filters.difficulty.length">
          <el-checkbox-group v-model="filters.difficulty">
            <el-checkbox v-for="[value, label] in DIFFICULTY_OPTIONS" :key="value" :value="value">
              {{ label }}
            </el-checkbox>
          </el-checkbox-group>
        </FilterAccordion>

        <!-- 编程语言 -->
        <FilterAccordion :title="t('filter.programmingLanguage')" :count="filters.language.length">
          <el-checkbox-group v-model="filters.language">
            <el-checkbox v-for="lang in PROGRAMMING_LANGUAGES" :key="lang" :value="lang">
              {{ lang }}
            </el-checkbox>
          </el-checkbox-group>
        </FilterAccordion>
      </div>
    </el-scrollbar>
  </aside>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import FilterAccordion from './FilterAccordion.vue';
import { useFilters } from '@/composables/useFilters';
import {
  LEARNING_PARADIGM_LABELS,
  SIMULATOR_LABELS,
  VERIFICATION_STATUS_LABELS,
  DIFFICULTY_LABELS,
  PROGRAMMING_LANGUAGES
} from '@/types/constants';

const { t } = useI18n();
const { filters, hasActiveFilters, clearAllFilters } = useFilters();

const LEARNING_PARADIGM_OPTIONS = Object.entries(LEARNING_PARADIGM_LABELS).filter(([k]) => k !== 'N/A');
const SIMULATOR_OPTIONS = Object.entries(SIMULATOR_LABELS).filter(([k]) => k !== 'N/A');
const VERIFICATION_STATUS_OPTIONS = Object.entries(VERIFICATION_STATUS_LABELS);
const DIFFICULTY_OPTIONS = Object.entries(DIFFICULTY_LABELS);
</script>

<style lang="scss" scoped>
.app-sidebar {
  width: 280px;
  height: calc(100vh - 64px);
  position: sticky;
  top: 64px;
  background-color: var(--bg-color);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
}

.sidebar-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.sidebar-scrollbar {
  flex: 1;
  height: 0;
}

.sidebar-content {
  padding: 8px 0;
}
</style>
