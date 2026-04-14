<template>
  <div class="project-card-grid">
    <el-empty v-if="projects.length === 0" :description="t('grid.empty')" />
    <template v-else>
      <div v-for="project in projects" :key="project.id" class="grid-item">
        <ProjectCard :project="project" @click="handleCardClick" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import ProjectCard from './ProjectCard.vue';
import type { ProjectMetadata } from '@/types';

interface Props {
  projects: ProjectMetadata[];
}

defineProps<Props>();

const emit = defineEmits<{
  'card-click': [project: ProjectMetadata];
}>();

const { t } = useI18n();

function handleCardClick(project: ProjectMetadata) {
  emit('card-click', project);
}
</script>

<style lang="scss" scoped>
.project-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 24px;
  padding: 24px;
}

.grid-item {
  min-width: 0;
}

@media (max-width: 768px) {
  .project-card-grid {
    grid-template-columns: 1fr;
    padding: 16px;
    gap: 16px;
  }
}
</style>
