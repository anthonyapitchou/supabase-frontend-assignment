
import { supabase } from "./supabase.js";

const articlesContainer = document.getElementById("articles-list");
const loadingElement = document.getElementById("loading");

async function loadArticles() {
  loadingElement.style.display = "block";
  articlesContainer.innerHTML = "";

  try {
    const { data: articles, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    if (articles.length === 0) {
      articlesContainer.innerHTML = `
        <p class="text-slate-400">No articles yet.</p>
      `;
      return;
    }

    articles.forEach((article) => {
      const articleElement = document.createElement("div");

      articleElement.innerHTML = `
        <a href="articles.html?id=${article.id}"
          class="group block h-full rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-blue-500"
        >
          <div class="mb-5 flex items-center justify-between gap-3">
            <span class="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
              ${article.category || "Article"}
            </span>

            <span class="text-xs text-slate-500">Article</span>
          </div>

          <h2 class="wrap-break-word text-xl font-bold text-white">
            ${article.title}
          </h2>

          <p class="mt-3 wrap-break-word leading-7 text-slate-400">
            ${article.content}
          </p>

          <div class="mt-6 border-t border-slate-700 pt-5">
            <span class="text-sm font-semibold text-blue-400 transition group-hover:text-blue-300">
              Read article →
            </span>
          </div>
        </a>
      `;

      articlesContainer.appendChild(articleElement);
    });
  } catch (error) {
    console.error("Error fetching articles:", error);

    articlesContainer.innerHTML = `
      <p class="text-red-400">
        Unable to load articles. Please try again later.
      </p>
    `;
  } finally {
    loadingElement.style.display = "none";
  }
}

loadArticles();
