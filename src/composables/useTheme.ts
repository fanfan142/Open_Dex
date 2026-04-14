import { ref, computed, watch, type Ref } from 'vue';
import { usePreferredDark } from '@vueuse/core';

export interface UseThemeReturn {
  isDark: Ref<boolean>;
  toggle: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  currentTheme: Ref<'light' | 'dark' | 'system'>;
}

const STORAGE_KEY = 'dexhand-theme';

export function useTheme(): UseThemeReturn {
  const prefersDark = usePreferredDark();

  const currentTheme = ref<'light' | 'dark' | 'system'>(
    (localStorage.getItem(STORAGE_KEY) as 'light' | 'dark' | 'system') || 'system'
  );

  const isDark = computed(() => {
    if (currentTheme.value === 'system') {
      return prefersDark.value;
    }
    return currentTheme.value === 'dark';
  });

  watch(prefersDark, (newValue) => {
    if (currentTheme.value === 'system') {
      applyTheme(newValue);
    }
  });

  watch(isDark, (dark) => {
    applyTheme(dark);
  }, { immediate: true });

  function applyTheme(dark: boolean) {
    const root = document.documentElement;

    if (dark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }

  function toggle() {
    const newTheme = isDark.value ? 'light' : 'dark';
    setTheme(newTheme);
  }

  function setTheme(theme: 'light' | 'dark' | 'system') {
    currentTheme.value = theme;
    localStorage.setItem(STORAGE_KEY, theme);

    if (theme === 'system') {
      applyTheme(prefersDark.value);
    } else {
      applyTheme(theme === 'dark');
    }
  }

  return {
    isDark,
    toggle,
    setTheme,
    currentTheme
  };
}
