
import { supabase } from "./supabase.js";

const articlesContainer = document.getElementById("articles-list");
const loadingElement = document.getElementById("loading");

async function loadArticles() {
  if (!articlesContainer || !loadingElement) return;

  try {
    loadingElement.classList.remove("hidden");
    articlesContainer.replaceChildren();

    const { data: articles, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    if (!articles || articles.length === 0) {
      articlesContainer.textContent = "No articles yet.";
      return;
    }

    for (const article of articles) {
      const card = document.createElement("a");

      card.href = `./article.html?id=${encodeURIComponent(article.id)}`;
      card.className =
        "block rounded-2xl border border-slate-700 bg-slate-800 p-6 hover:border-blue-500";

      const category = document.createElement("p");
      category.className = "mb-3 text-sm text-blue-400";
      category.textContent = article.category || "Article";

      const title = document.createElement("h2");
      title.className = "text-xl font-bold text-white";
      title.textContent = article.title;

      const excerpt = document.createElement("p");
      excerpt.className = "mt-3 leading-7 text-slate-400";
      excerpt.textContent =
        (article.content || "").slice(0, 160) + 
        ((article.content || "").length > 160 ? "..." : "");

      const link = document.createElement("p");
      link.className = "mt-5 font-semibold text-blue-400";
      link.textContent = "Read article →";

      card.append(category, title, excerpt, link);
      articlesContainer.appendChild(card);
    }
  } catch (error) {
    console.error("Unable to load articles:", error);
    articlesContainer.textContent =
      "Unable to load articles. Please try again later.";
  } finally {
    loadingElement.classList.add("hidden");
  }
}

loadArticles();

