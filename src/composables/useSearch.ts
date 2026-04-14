import { ref, watch, unref, type Ref } from 'vue';
import Fuse from 'fuse.js';
import type { ProjectMetadata, Database } from '@/types';

export interface UseSearchReturn {
  fuseSearch: (query: string) => ProjectMetadata[];
  fuseEngine: Ref<Fuse<ProjectMetadata> | null>;
  updateIndex: (data: Database) => void;
  isIndexReady: Ref<boolean>;
}

export function useSearch(
  dataRef: Ref<Database>
): UseSearchReturn {
  const fuseEngine = ref<Fuse<ProjectMetadata> | null>(null) as Ref<Fuse<ProjectMetadata> | null>;
  const isIndexReady = ref(false);

  const fuseConfig = {
    keys: [
      { name: 'name', weight: 0.5 },
      { name: 'description', weight: 0.3 },
      { name: 'tech_stack', weight: 0.1 },
      { name: 'tags', weight: 0.1 }
    ],
    threshold: 0.3,
    useExtendedSearch: true,
    ignoreLocation: true,
    includeScore: true,
    minMatchCharLength: 2
  };

  function updateIndex(data: Database) {
    if (!data || data.length === 0) {
      fuseEngine.value = null;
      isIndexReady.value = false;
      return;
    }

    fuseEngine.value = new Fuse(data, fuseConfig);
    isIndexReady.value = true;
  }

  function fuseSearch(query: string): ProjectMetadata[] {
    const engine = unref(fuseEngine);
    const data = unref(dataRef);

    if (!query.trim()) {
      return data;
    }

    if (!engine) {
      console.warn('Fuse index not initialized');
      return data;
    }

    const results = engine.search(query);
    return results.map(result => result.item);
  }

  watch(
    dataRef,
    (newData) => {
      updateIndex(newData);
    },
    { immediate: true, deep: true }
  );

  return {
    fuseSearch,
    fuseEngine,
    updateIndex,
    isIndexReady
  };
}
