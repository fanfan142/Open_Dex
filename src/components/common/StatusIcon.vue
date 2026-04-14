<template>
  <el-tooltip :content="tooltipText" placement="top">
    <span class="status-icon" :class="`status-icon--${status}`">
      <el-icon :size="size">
        <component :is="iconComponent" />
      </el-icon>
    </span>
  </el-tooltip>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Check, Warning, Document, QuestionFilled } from '@element-plus/icons-vue';
import type { VerificationStatus } from '@/types';
import { VERIFICATION_STATUS_LABELS } from '@/types/constants';

interface Props {
  status: VerificationStatus;
  size?: number;
}

const props = withDefaults(defineProps<Props>(), {
  size: 16
});

const iconComponent = computed(() => {
  switch (props.status) {
    case 'Verified': return Check;
    case 'Partial': return Warning;
    case 'Paper-Only': return Document;
    default: return QuestionFilled;
  }
});

const tooltipText = computed(() => {
  return VERIFICATION_STATUS_LABELS[props.status] || props.status;
});
</script>

<style lang="scss" scoped>
.status-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &--Verified {
    color: var(--el-color-success);
  }

  &--Partial {
    color: var(--el-color-warning);
  }

  &--Paper-Only {
    color: var(--el-color-info);
  }

  &--Unverified {
    color: var(--el-color-danger);
  }
}
</style>
