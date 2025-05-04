import { defineConfig } from 'vite';

export default defineConfig({
    base: "./my-portfolio/",
    build: {
        outDir: 'dist',
        emptyOutDir: true
    }
});
  