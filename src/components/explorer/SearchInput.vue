<template>
  <el-input
    :model-value="modelValue"
    :placeholder="placeholder"
    clearable
    size="large"
    class="search-input"
    @update:model-value="handleInput"
    @keyup.enter="handleSearch"
  >
    <template #prefix>
      <el-icon><Search /></el-icon>
    </template>
  </el-input>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';

interface Props {
  modelValue: string;
  placeholder?: string;
}

withDefaults(defineProps<Props>(), {
  placeholder: ''
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  search: [value: string];
}>();

function handleInput(value: string) {
  emit('update:modelValue', value);
}

function handleSearch() {
  emit('search', '');
}
</script>

<style lang="scss" scoped>
.search-input {
  width: 100%;
  max-width: 480px;
}
</style>
