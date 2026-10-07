import { supabase } from "./supabase.js";

// Fetch and display articles
const { data: posts, error } = await supabase
  .from("posts")
  .select("*");

if (error) {
  console.error("Error fetching articles:", error);
} else {
  const articlesContainer = document.getElementById("articles");

  posts.forEach((article) => {
    const articleElement = document.createElement("div");

    articleElement.classList.add("article");

    articleElement.innerHTML = `
      <h2>${article.title}</h2>
      <p>${article.content}</p>
    `;

    articlesContainer.appendChild(articleElement);
  });
}