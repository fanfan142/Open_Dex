<template>
  <el-select :model-value="modelValue.key" class="sort-select" @update:model-value="handleChange">
    <el-option v-for="option in options" :key="option.key" :label="t(`sort.${option.key}`)" :value="option.key" />
  </el-select>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { SORT_OPTIONS } from '@/types/constants';
import type { SortConfig } from '@/types';

interface Props {
  modelValue: SortConfig;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [config: SortConfig];
}>();

const { t } = useI18n();

const options = SORT_OPTIONS;

function handleChange(key: string) {
  const currentOrder = props.modelValue.order;
  const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
  emit('update:modelValue', { key: key as SortConfig['key'], order: newOrder });
}
</script>

<style lang="scss" scoped>
.sort-select {
  width: 160px;
}
</style>
