import { computed, watch, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

export interface UseLanguageReturn {
  locale: Ref<string>;
  currentLanguage: Ref<'zh' | 'en'>;
  setLocale: (locale: string) => void;
  toggleLanguage: () => void;
}

const STORAGE_KEY = 'dexhand-locale';

export function useLanguage(): UseLanguageReturn {
  const { locale } = useI18n();

  const currentLanguage = computed(() => {
    return locale.value.startsWith('zh') ? 'zh' : 'en';
  });

  const savedLocale = localStorage.getItem(STORAGE_KEY);
  if (savedLocale && (savedLocale === 'zh' || savedLocale === 'en')) {
    locale.value = savedLocale;
  }

  function setLocale(newLocale: string) {
    if (newLocale !== 'zh' && newLocale !== 'en') {
      newLocale = 'en';
    }

    locale.value = newLocale;
    localStorage.setItem(STORAGE_KEY, newLocale);
    document.documentElement.lang = newLocale;
  }

  function toggleLanguage() {
    const newLocale = locale.value === 'zh' ? 'en' : 'zh';
    setLocale(newLocale);
  }

  watch(locale, (newLocale) => {
    localStorage.setItem(STORAGE_KEY, newLocale);
    document.documentElement.lang = newLocale;
  });

  return {
    locale,
    currentLanguage,
    setLocale,
    toggleLanguage
  };
}
