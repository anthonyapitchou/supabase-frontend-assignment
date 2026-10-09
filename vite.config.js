
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: "/supabase-frontend-assignment/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve(currentDir, "index.html"),
        articles: resolve(currentDir, "articles.html"),
        article: resolve(currentDir, "article.html"),
        login: resolve(currentDir, "login.html"),
        register: resolve(currentDir, "register.html"),
        createPost: resolve(currentDir, "create-post.html"),
      },
    },
  },
});
