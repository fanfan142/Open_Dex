<template>
  <el-tag :type="tagType" size="small" class="difficulty-badge">
    {{ label }}
  </el-tag>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Difficulty } from '@/types';
import { DIFFICULTY_LABELS } from '@/types/constants';

interface Props {
  difficulty: Difficulty;
}

const props = defineProps<Props>();

const label = computed(() => DIFFICULTY_LABELS[props.difficulty] || props.difficulty);

const colorMap: Record<Difficulty, 'success' | 'warning' | 'danger' | 'info'> = {
  'Beginner': 'success',
  'Intermediate': 'warning',
  'Advanced': 'danger',
  'Expert': 'info'
};

const tagType = computed(() => colorMap[props.difficulty] || 'info');
</script>

<style lang="scss" scoped>
.difficulty-badge {
  font-weight: 500;
}
</style>
