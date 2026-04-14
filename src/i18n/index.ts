import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import zh from './locales/zh.json';

const i18n = createI18n({
  legacy: false,
  locale: import.meta.env.VITE_DEFAULT_LOCALE || 'zh',
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE || 'en',
  messages: {
    en,
    zh
  },
  missingWarn: false,
  fallbackWarn: false
});

export default i18n;
