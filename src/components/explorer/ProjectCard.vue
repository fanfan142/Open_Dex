<template>
  <el-card class="project-card" shadow="hover" @click="handleClick">
    <template #header>
      <div class="card-header">
        <div class="card-title">
          <a :href="project.repo_url" target="_blank" rel="noopener noreferrer" class="card-link" @click.stop>
            {{ project.name }}
          </a>
          <el-icon class="external-icon" :size="14"><Link /></el-icon>
        </div>
        <DifficultyBadge :difficulty="project.difficulty" />
      </div>
    </template>

    <div class="card-body">
      <p class="card-description">{{ project.description }}</p>

      <div class="card-tags">
        <TagBadge v-for="tech in project.tech_stack.slice(0, 4)" :key="tech" :text="tech" type="primary" small />
      </div>

      <div v-if="project.category?.algorithm?.learning_paradigm?.length" class="card-meta">
        <span class="meta-label">{{ t('card.learningParadigm') }}:</span>
        <div class="meta-tags">
          <TagBadge v-for="lp in project.category.algorithm.learning_paradigm" :key="lp" :text="lp" small />
        </div>
      </div>
    </div>

    <template #footer>
      <div class="card-footer">
        <div class="card-stats">
          <span class="stat-item">
            <el-icon><Star /></el-icon>
            {{ formatNumber(project.stars) }}
          </span>
          <span class="stat-item">
            <el-icon><Timer /></el-icon>
            {{ formatDate(project.last_updated) }}
          </span>
        </div>
        <div class="card-actions">
          <StatusIcon :status="project.verification_status" />
        </div>
      </div>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Link, Star, Timer } from '@element-plus/icons-vue';
import TagBadge from '@/components/common/TagBadge.vue';
import DifficultyBadge from '@/components/common/DifficultyBadge.vue';
import StatusIcon from '@/components/common/StatusIcon.vue';
import type { ProjectMetadata } from '@/types';
import { formatNumber, formatDate } from '@/utils/formatters';

interface Props {
  project: ProjectMetadata;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  click: [project: ProjectMetadata];
}>();

const { t } = useI18n();

function handleClick() {
  emit('click', props.project);
}
</script>

<style lang="scss" scoped>
.project-card {
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.card-link {
  color: var(--el-color-primary);
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    text-decoration: underline;
  }
}

.external-icon {
  flex-shrink: 0;
  color: var(--el-text-color-placeholder);
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-description {
  margin: 0;
  font-size: 14px;
  color: var(--text-color-secondary);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.card-meta {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.meta-label {
  font-size: 12px;
  color: var(--el-text-color-placeholder);
  flex-shrink: 0;
  width: 80px;
}

.meta-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-stats {
  display: flex;
  gap: 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: var(--el-text-color-secondary);
}

.card-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
