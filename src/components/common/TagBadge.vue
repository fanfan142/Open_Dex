<template>
  <span class="tag-badge" :class="[`tag-badge--${type}`, { 'tag-badge--small': small }]">
    <slot>{{ text }}</slot>
  </span>
</template>

<script setup lang="ts">
interface Props {
  text?: string;
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  small?: boolean;
}

withDefaults(defineProps<Props>(), {
  text: '',
  type: 'default',
  small: false
});
</script>

<style lang="scss" scoped>
.tag-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  transition: all 0.2s ease;

  &--default {
    background-color: var(--tag-bg-default);
    color: var(--tag-text-default);
  }

  &--primary {
    background-color: var(--tag-bg-primary);
    color: var(--tag-text-primary);
  }

  &--success {
    background-color: var(--tag-bg-success);
    color: var(--tag-text-success);
  }

  &--warning {
    background-color: var(--tag-bg-warning);
    color: var(--tag-text-warning);
  }

  &--danger {
    background-color: var(--tag-bg-danger);
    color: var(--tag-text-danger);
  }

  &--info {
    background-color: var(--tag-bg-info);
    color: var(--tag-text-info);
  }

  &--small {
    padding: 2px 6px;
    font-size: 11px;
  }
}
</style>
