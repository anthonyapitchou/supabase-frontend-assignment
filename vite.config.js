
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/supabase-frontend-assignment/",
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
        articles: resolve(__dirname, "articles.html"),
        login: resolve(__dirname, "login.html"),
        register: resolve(__dirname, "register.html"),
        createPost: resolve(__dirname, "create-post.html"),
      },
    },
  },
});
