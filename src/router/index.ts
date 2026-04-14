import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/explorer',
    name: 'explorer',
    component: () => import('@/views/ExplorerView.vue'),
    meta: {
      title: '探索'
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

router.beforeEach((to, _from, next) => {
  const title = to.meta.title as string;
  if (title) {
    document.title = `${title} - DexHand Hub`;
  }
  next();
});

export default router;
