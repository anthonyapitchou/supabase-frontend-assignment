import { supabase } from "./supabase.js";

const {
  data: { session },
} = await supabase.auth.getSession();

if (!session) {
  window.location.href = "./login.html";
}

const loadingElement = document.getElementById("loading");
const createForm = document.getElementById("create-form");
const messageElement = document.getElementById("error-message");

createForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = createForm.querySelector(
    'button[type="submit"]'
  );
  const formInputs = createForm.querySelectorAll(
    "input, textarea, select"
  );

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const category = document.getElementById("category").value;

  // Disable the form while submitting
  submitButton.disabled = true;
  formInputs.forEach((input) => {
    input.disabled = true;
  });

  messageElement.textContent = "";
  messageElement.classList.add("hidden");
  loadingElement.classList.remove("hidden");

  try {
    const { error } = await supabase.from("posts").insert([
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

    messageElement.textContent = "Article created successfully!";
    messageElement.classList.remove("hidden", "text-red-400");
    messageElement.classList.add("text-blue-400");

    createForm.reset();

    window.setTimeout(() => {
      window.location.href = "./index.html";
    }, 1500);
  } catch (error) {
    messageElement.textContent =
      error.message || "An error occurred while creating the article.";

    messageElement.classList.remove("hidden", "text-blue-400");
    messageElement.classList.add("text-red-400");
  } finally {
    loadingElement.classList.add("hidden");

    // Re-enable the form if the user stays on this page
    submitButton.disabled = false;
    formInputs.forEach((input) => {
      input.disabled = false;
    });
  }
});