import { defineConfig } from 'vite';

export default defineConfig({
  base: '/ScraleGi/projects/game_of_life/',
  build: {
    outDir: 'projects/game_of_life',
    emptyOutDir: false, // Prevents deleting other files in the repo
  },
});