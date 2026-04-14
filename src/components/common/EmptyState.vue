<template>
  <div class="empty-state">
    <el-empty :image-size="imageSize" :description="description">
      <template #image>
        <div class="empty-state__icon">
          <el-icon :size="imageSize / 2">
            <component :is="iconComponent" />
          </el-icon>
        </div>
      </template>
      <template #default>
        <slot name="action" />
      </template>
    </el-empty>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Search, Folder, Document, Warning } from '@element-plus/icons-vue';

interface Props {
  type?: 'search' | 'folder' | 'document' | 'warning';
  description?: string;
  imageSize?: number;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'search',
  description: '暂无数据',
  imageSize: 120
});

const iconComponent = computed(() => {
  const iconMap = {
    search: Search,
    folder: Folder,
    document: Document,
    warning: Warning
  };
  return iconMap[props.type] || Search;
});
</script>

<style lang="scss" scoped>
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 120px;
    background-color: var(--el-fill-color-light);
    border-radius: 50%;
    color: var(--el-text-color-secondary);
  }
}
</style>
