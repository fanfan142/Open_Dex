<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-info">
        <p class="footer-copyright">
          © {{ currentYear }} DexHand-OpenSource-Hub. {{ t('footer.allRightsReserved') }}
        </p>
        <p class="footer-description">
          {{ t('footer.description') }}
        </p>
      </div>
      <div class="footer-links">
        <el-link href="https://github.com/DexterousHand" target="_blank">
          GitHub
        </el-link>
        <el-divider direction="vertical" />
        <el-link href="/data/projects.json" target="_blank">
          {{ t('footer.dataSource') }}
        </el-link>
        <el-divider direction="vertical" />
        <el-link href="https://github.com/DexterousHand/DexHand-OpenSource-Hub/issues" target="_blank">
          {{ t('footer.reportIssue') }}
        </el-link>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const currentYear = computed(() => new Date().getFullYear());
</script>

<style lang="scss" scoped>
.app-footer {
  background-color: var(--bg-color-secondary);
  border-top: 1px solid var(--border-color);
  padding: 24px 0;
  margin-top: auto;
}

.footer-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.footer-info {
  text-align: center;
}

.footer-copyright {
  margin: 0 0 8px;
  font-size: 14px;
  color: var(--text-color-secondary);
}

.footer-description {
  margin: 0;
  font-size: 13px;
  color: var(--text-color-placeholder);
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
