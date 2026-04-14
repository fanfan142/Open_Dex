<template>
  <el-collapse class="filter-accordion" :model-value="['active']">
    <el-collapse-item name="active">
      <template #title>
        <div class="accordion-header">
          <span class="accordion-title">{{ title }}</span>
          <el-badge v-if="count > 0" :value="count" :max="99" class="accordion-badge" />
        </div>
      </template>
      <div class="accordion-content">
        <slot />
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  count?: number;
}

withDefaults(defineProps<Props>(), {
  count: 0
});
</script>

<style lang="scss">
.filter-accordion {
  border: none;

  .el-collapse-item__header {
    padding: 12px 16px;
    background-color: transparent;
    border-bottom: none;
    height: auto;
    line-height: 1.5;
  }

  .el-collapse-item__wrap {
    border-bottom: none;
    background-color: transparent;
  }

  .el-collapse-item__content {
    padding: 0 16px 12px;
  }
}

.accordion-header {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.accordion-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
}

.accordion-badge {
  margin-left: auto;
}

.accordion-content {
  .el-checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .el-checkbox {
    margin-right: 0;
  }
}
</style>
