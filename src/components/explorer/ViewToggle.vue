<template>
  <el-button-group class="view-toggle">
    <el-tooltip :content="t('viewToggle.table')">
      <el-button :type="modelValue === 'table' ? 'primary' : 'default'" @click="handleToggle('table')">
        <el-icon><Grid /></el-icon>
      </el-button>
    </el-tooltip>
    <el-tooltip :content="t('viewToggle.card')">
      <el-button :type="modelValue === 'card' ? 'primary' : 'default'" @click="handleToggle('card')">
        <el-icon><Menu /></el-icon>
      </el-button>
    </el-tooltip>
  </el-button-group>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Grid, Menu } from '@element-plus/icons-vue';
import type { ViewMode } from '@/types';

interface Props {
  modelValue: ViewMode;
}

defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [mode: ViewMode];
}>();

const { t } = useI18n();

function handleToggle(mode: ViewMode) {
  emit('update:modelValue', mode);
}
</script>

<style lang="scss" scoped>
.view-toggle {
  :deep(.el-icon) {
    font-size: 16px;
  }
}
</style>
