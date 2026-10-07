import { supabase } from "./supabase.js";

const {
  data: { session },
} = await supabase.auth.getSession();

if (!session) {
  window.location.href = "./login.html";
}

// Create article
const createForm = document.getElementById("create-form");

console.log("CREATE FORM:", createForm);

createForm.addEventListener("submit", async (event) => {
  console.log("SUBMIT DETECTED");

  event.preventDefault();

  try {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const category = document.getElementById("category").value;


    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          title,
          content,
          category,
          user_id: session.user.id,
        },
      ]);

    if (error) {
      throw error;
    }

    console.log("Article created:", data);
    window.location.href = "./index.html";

  } catch (error) {
    const errorMessage =
      error.message || "An error occurred while creating the article.";

    console.error("Error creating article:", errorMessage);

    document.getElementById("error-message").textContent = errorMessage;
  }
});