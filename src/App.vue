<template>
  <el-config-provider :locale="locale === 'zh' ? zhCn : enUS">
    <div id="app-container" :class="{ 'dark-mode': isDark }">
      <AppHeader />
      <main class="main-content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
      <AppFooter />
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useTheme } from '@/composables/useTheme';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import enUS from 'element-plus/es/locale/lang/en';

const { locale } = useI18n();
const { isDark } = useTheme();
</script>

<style lang="scss">
#app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}

.main-content {
  flex: 1;
  padding: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
