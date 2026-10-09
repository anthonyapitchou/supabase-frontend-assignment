
import { supabase } from "./supabase.js";

const loadingElement = document.getElementById("loading");
const articleContent = document.getElementById("article-content");
const errorMessage = document.getElementById("error-message");

async function loadArticle() {
  try {
    const articleId = new URLSearchParams(
      window.location.search
    ).get("id");

    if (!articleId) {
      throw new Error("No article was selected.");
    }

    const { data: article, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", articleId)
      .single();

    if (error) throw error;

    if (!article) {
      throw new Error("Article not found.");
    }

    document.getElementById("article-category").textContent =
      article.category || "Article";

    document.getElementById("article-title").textContent =
      article.title || "";

    document.getElementById("article-body").textContent =
      article.content || "";

    document.getElementById("article-date").textContent =
      article.created_at
        ? new Date(article.created_at).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : "";

    document.title = `${article.title} | Community Articles`;

    articleContent.classList.remove("hidden");
  } catch (error) {
    console.error("Error loading article:", error);

    errorMessage.textContent =
      error.message || "Unable to load this article.";

    errorMessage.classList.remove("hidden");
  } finally {
    loadingElement.classList.add("hidden");
  }
}

loadArticle();

