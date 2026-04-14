<template>
  <header class="app-header">
    <div class="app-header__container">
      <!-- Logo & Title -->
      <div class="app-header__brand">
        <router-link to="/" class="app-header__logo-link">
          <el-icon :size="32" class="logo-icon"><Guide /></el-icon>
          <span class="app-header__title">DexHand Hub</span>
        </router-link>
      </div>

      <!-- Search Bar -->
      <div class="app-header__search">
        <el-input
          v-model="searchInput"
          :placeholder="t('header.searchPlaceholder')"
          clearable
          size="large"
          @keyup.enter="handleSearch"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>

      <!-- Actions -->
      <div class="app-header__actions">
        <el-tooltip :content="t('header.toggleTheme')">
          <el-button circle @click="toggleTheme">
            <el-icon :size="18">
              <Sunny v-if="isDark" />
              <Moon v-else />
            </el-icon>
          </el-button>
        </el-tooltip>

        <el-tooltip :content="t('header.toggleLanguage')">
          <el-button circle @click="toggleLanguage">
            {{ currentLanguage === 'zh' ? 'EN' : '中' }}
          </el-button>
        </el-tooltip>

        <el-tooltip :content="t('header.github')">
          <el-button
            circle
            tag="a"
            href="https://github.com/DexterousHand/DexHand-OpenSource-Hub"
            target="_blank"
          >
            <el-icon :size="18"><Link /></el-icon>
          </el-button>
        </el-tooltip>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Search, Sunny, Moon, Link, Guide } from '@element-plus/icons-vue';
import { useTheme } from '@/composables/useTheme';
import { useLanguage } from '@/composables/useLanguage';
import { useProjectStore } from '@/store/projectStore';

const router = useRouter();
const { t } = useI18n();
const { isDark, toggle: toggleTheme } = useTheme();
const { currentLanguage, toggleLanguage } = useLanguage();
const projectStore = useProjectStore();

const searchInput = ref('');

function handleSearch() {
  projectStore.setSearchQuery(searchInput.value);
  router.push('/explorer');
}
</script>

<style lang="scss" scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: var(--bg-color);
  border-bottom: 1px solid var(--border-color);
  backdrop-filter: blur(10px);

  &__container {
    display: flex;
    align-items: center;
    gap: 24px;
    max-width: 1440px;
    margin: 0 auto;
    padding: 12px 24px;
  }

  &__brand {
    flex-shrink: 0;
  }

  &__logo-link {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    color: inherit;
  }

  .logo-icon {
    color: var(--color-primary);
  }

  &__title {
    font-size: 18px;
    font-weight: 700;
    color: var(--text-color);
  }

  &__search {
    flex: 1;
    max-width: 480px;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}

@media (max-width: 768px) {
  .app-header__title {
    display: none;
  }

  .app-header__search {
    max-width: 240px;
  }
}
</style>
