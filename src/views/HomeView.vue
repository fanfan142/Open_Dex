<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-container">
        <h1 class="hero-title">{{ t('home.title') }}</h1>
        <p class="hero-subtitle">{{ t('home.subtitle') }}</p>
        <div class="hero-actions">
          <el-button type="primary" size="large" @click="goToExplorer">{{ t('home.explore') }}</el-button>
          <el-button size="large" @click="goToContribute">{{ t('home.contribute') }}</el-button>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <el-row :gutter="24">
        <el-col :span="6">
          <div class="stat-card">
            <div class="stat-value">{{ stats.total }}</div>
            <div class="stat-label">{{ t('home.stats.totalProjects') }}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="stat-card">
            <div class="stat-value">{{ stats.verified }}</div>
            <div class="stat-label">{{ t('home.stats.verified') }}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="stat-card">
            <div class="stat-value">{{ stats.partial }}</div>
            <div class="stat-label">{{ t('home.stats.partial') }}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="stat-card">
            <div class="stat-value">{{ Object.keys(stats.bySimulator).length }}</div>
            <div class="stat-label">{{ t('home.stats.simulators') }}</div>
          </div>
        </el-col>
      </el-row>
    </section>

    <!-- Categories Section -->
    <section class="categories-section">
      <h2 class="section-title">{{ t('home.categories.title') }}</h2>
      <el-row :gutter="16">
        <el-col :span="8">
          <div class="category-card" @click="filterByParadigm('Reinforcement Learning')">
            <el-icon :size="32"><Monitor /></el-icon>
            <h3>{{ t('home.categories.reinforcement') }}</h3>
            <p>{{ t('home.categories.reinforcementDesc') }}</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="category-card" @click="filterByParadigm('VLA Model')">
            <el-icon :size="32"><Cpu /></el-icon>
            <h3>{{ t('home.categories.vla') }}</h3>
            <p>{{ t('home.categories.vlaDesc') }}</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="category-card" @click="filterByParadigm('Sim-to-Real')">
            <el-icon :size="32"><Connection /></el-icon>
            <h3>{{ t('home.categories.sim2real') }}</h3>
            <p>{{ t('home.categories.sim2realDesc') }}</p>
          </div>
        </el-col>
      </el-row>
    </section>

    <!-- Popular Projects Section -->
    <section class="popular-section">
      <h2 class="section-title">{{ t('home.popular.title') }}</h2>
      <div class="popular-grid">
        <ProjectCard v-for="project in popularProjects" :key="project.id" :project="project" @click="handleProjectClick" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { Monitor, Cpu, Connection } from '@element-plus/icons-vue';
import ProjectCard from '@/components/explorer/ProjectCard.vue';
import { useProjectStore } from '@/store/projectStore';
import type { ProjectMetadata } from '@/types';

const router = useRouter();
const { t } = useI18n();
const store = useProjectStore();

const stats = computed(() => store.stats);

const popularProjects = computed(() => {
  return [...store.rawProjects].sort((a, b) => b.stars - a.stars).slice(0, 6);
});

onMounted(() => {
  if (store.rawProjects.length === 0) {
    store.loadProjects();
  }
});

function goToExplorer() {
  router.push('/explorer');
}

function goToContribute() {
  window.open('https://github.com/DexterousHand/DexHand-OpenSource-Hub/blob/main/CONTRIBUTING.md', '_blank');
}

function filterByParadigm(paradigm: string) {
  store.setFilter('learning_paradigm', [paradigm]);
  router.push('/explorer');
}

function handleProjectClick(project: ProjectMetadata) {
  window.open(project.repo_url, '_blank', 'noopener');
}
</script>

<style lang="scss" scoped>
.home-view {
  min-height: 100vh;
}

.hero-section {
  background: linear-gradient(135deg, var(--el-color-primary-light-9), var(--bg-color));
  padding: 80px 24px;
  text-align: center;
}

.hero-container {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  margin: 0 0 24px;
  background: linear-gradient(135deg, var(--el-color-primary), var(--el-color-primary-light-3));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 20px;
  color: var(--text-color-secondary);
  margin: 0 0 32px;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.stats-section {
  max-width: 1200px;
  margin: -40px auto 0;
  padding: 0 24px;
  position: relative;
  z-index: 10;
}

.stat-card {
  background: var(--bg-color);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-value {
  font-size: 36px;
  font-weight: 700;
  color: var(--el-color-primary);
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: var(--text-color-secondary);
}

.categories-section,
.popular-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 64px 24px;
}

.section-title {
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 32px;
  text-align: center;
}

.category-card {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  h3 {
    margin: 16px 0 8px;
    font-size: 18px;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: var(--text-color-secondary);
  }

  .el-icon {
    color: var(--el-color-primary);
  }
}

.popular-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 24px;
}
</style>
