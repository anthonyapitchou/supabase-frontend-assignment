import { supabase } from "./supabase.js";

// Fetch and display articles
const { data: posts, error } = await supabase
  .from("posts")
  .select("*");

if (error) {
  console.error("Error fetching articles:", error);
} else {
  const articlesContainer = document.getElementById("articles-list");

  posts.forEach((article) => {
    const articleElement = document.createElement("div");

    articleElement.classList.add("article");

    articleElement.innerHTML = `
      <article class="group rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-blue-500">

        <div class="mb-5 flex items-center justify-between">
          <span class="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
            ${article.category || "Article"}
          </span>

          <span class="text-xs text-slate-500">
            Article
          </span>
        </div>

        <h2 class="text-xl font-bold text-white">
          ${article.title}
        </h2>

        <p class="mt-3 leading-7 text-slate-400">
          ${article.content}
        </p>

        <div class="mt-6 border-t border-slate-700 pt-5">
          <span class="text-sm font-semibold text-blue-400 transition group-hover:text-blue-300">
            Read article →
          </span>
        </div>

      </article>
    `;

    articlesContainer.appendChild(articleElement);
  });
}


// Loading states
const loadingElement = document.getElementById("loading");

loadingElement.style.display = "block";

supabase.from("posts").select("*").then(({ data, error }) => {

  if (error) {

    console.error("Error fetching articles:", error);

  } else {

    const articlesContainer = document.getElementById("articles-list");

    articlesContainer.innerHTML = "";

    if (data.length === 0) {

      articlesContainer.innerHTML = `
        <p class="text-slate-400">
          No articles yet.
        </p>
      `;

    } else {

      data.forEach((article) => {

        const articleElement = document.createElement("div");

        articleElement.classList.add("article");

        articleElement.innerHTML = `
          <article class="group rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-blue-500">

            <div class="mb-5 flex items-center justify-between">

              <span class="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                ${article.category || "Article"}
              </span>

              <span class="text-xs text-slate-500">
                Article
              </span>

            </div>

            <h2 class="text-xl font-bold text-white">
              ${article.title}
            </h2>

            <p class="mt-3 leading-7 text-slate-400">
              ${article.content}
            </p>

            <div class="mt-6 border-t border-slate-700 pt-5">

              <span class="text-sm font-semibold text-blue-400 transition group-hover:text-blue-300">
                Read article →
              </span>

            </div>

          </article>
        `;

        articlesContainer.appendChild(articleElement);
      });
    }
  }

  loadingElement.style.display = "none";
});