import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import App from './App.vue';
import router from './router';
import i18n from './i18n';

// 全局样式
import './assets/styles/main.scss';

const app = createApp(App);

// 注册所有 Element Plus 图标为全局组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 安装插件
app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(ElementPlus, {
  size: 'default',
  zIndex: 3000
});

// 挂载应用
app.mount('#app');
