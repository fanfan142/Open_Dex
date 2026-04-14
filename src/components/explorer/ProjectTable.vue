<template>
  <div class="project-table" v-loading="loading">
    <div v-bind="containerProps" class="table-container">
      <div v-bind="wrapperProps">
        <el-table :data="visibleList" style="width: 100%" row-key="id" @sort-change="handleSortChange">
          <!-- 项目名称 -->
          <el-table-column prop="name" :label="t('table.name')" min-width="200" sortable="custom">
            <template #default="{ row }">
              <div class="project-name-cell">
                <a :href="row.repo_url" target="_blank" rel="noopener noreferrer" class="project-link">
                  {{ row.name }}
                </a>
                <el-icon class="external-icon" :size="12"><Link /></el-icon>
              </div>
            </template>
          </el-table-column>

          <!-- 项目描述 -->
          <el-table-column prop="description" :label="t('table.description')" min-width="300" show-overflow-tooltip />

          <!-- 技术栈 -->
          <el-table-column :label="t('table.techStack')" width="200">
            <template #default="{ row }">
              <div class="tech-stack-cell">
                <TagBadge v-for="tech in row.tech_stack.slice(0, 3)" :key="tech" :text="tech" type="primary" small />
                <el-tag v-if="row.tech_stack.length > 3" size="small">+{{ row.tech_stack.length - 3 }}</el-tag>
              </div>
            </template>
          </el-table-column>

          <!-- 学习范式 -->
          <el-table-column :label="t('table.learningParadigm')" width="180">
            <template #default="{ row }">
              <div class="tags-cell">
                <TagBadge
                  v-for="lp in row.category?.algorithm?.learning_paradigm?.slice(0, 2)"
                  :key="lp"
                  :text="lp"
                  small
                />
              </div>
            </template>
          </el-table-column>

          <!-- Stars -->
          <el-table-column prop="stars" :label="t('table.stars')" width="120" sortable="custom" align="center">
            <template #default="{ row }">
              <span class="stars-cell">
                <el-icon><Star /></el-icon>
                {{ formatNumber(row.stars) }}
              </span>
            </template>
          </el-table-column>

          <!-- 难度 -->
          <el-table-column :label="t('table.difficulty')" width="100" align="center">
            <template #default="{ row }">
              <DifficultyBadge :difficulty="row.difficulty" />
            </template>
          </el-table-column>

          <!-- 验证状态 -->
          <el-table-column :label="t('table.status')" width="100" align="center">
            <template #default="{ row }">
              <StatusIcon :status="row.verification_status" />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useVirtualList } from '@vueuse/core';
import { Link, Star } from '@element-plus/icons-vue';
import TagBadge from '@/components/common/TagBadge.vue';
import DifficultyBadge from '@/components/common/DifficultyBadge.vue';
import StatusIcon from '@/components/common/StatusIcon.vue';
import type { ProjectMetadata, SortConfig } from '@/types';
import { formatNumber } from '@/utils/formatters';

interface Props {
  projects: ProjectMetadata[];
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
});

const emit = defineEmits<{
  sort: [config: SortConfig];
}>();

const { t } = useI18n();

const { list, containerProps, wrapperProps } = useVirtualList(computed(() => props.projects), {
  itemHeight: 60,
  overscan: 10
});

const visibleList = computed(() => list.value.map(item => item.data));

function handleSortChange(sortData: { prop: string; order: 'ascending' | 'descending' | null }) {
  if (!sortData.prop || !sortData.order) {
    emit('sort', { key: 'stars', order: 'desc' });
    return;
  }

  const keyMap: Record<string, keyof ProjectMetadata> = {
    name: 'name',
    stars: 'stars',
    last_updated: 'last_updated'
  };

  emit('sort', {
    key: keyMap[sortData.prop] || 'stars',
    order: sortData.order === 'ascending' ? 'asc' : 'desc'
  });
}
</script>

<style lang="scss" scoped>
.project-table {
  height: 100%;
}

.table-container {
  height: 70vh;
  overflow-y: auto;
}

.project-name-cell {
  display: flex;
  align-items: center;
  gap: 6px;
}

.project-link {
  color: var(--el-color-primary);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
}

.external-icon {
  color: var(--el-text-color-placeholder);
  flex-shrink: 0;
}

.tech-stack-cell,
.tags-cell {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.stars-cell {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--el-text-color-secondary);
}
</style>
