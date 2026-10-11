import { supabase } from "./supabase.js";

const loginForm = document.getElementById("login-form");
const loadingElement = document.getElementById("loading");
const loginMessage = document.getElementById("login-message");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = loginForm.querySelector(
    'button[type="submit"]'
  );
  const formInputs = loginForm.querySelectorAll("input");

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Disable the form while submitting
  submitButton.disabled = true;
  formInputs.forEach((input) => {
    input.disabled = true;
  });

  loginMessage.textContent = "";
  loginMessage.classList.add("hidden");
  loadingElement.classList.remove("hidden");

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    if (data.user) {
      loginMessage.textContent = "Login successful! Welcome back.";
      loginMessage.classList.remove("hidden");

      loginForm.reset();
      window.location.href = "./index.html";
    }
  } catch (error) {
    loginMessage.textContent = "Error during login: " + error.message;
    loginMessage.classList.remove("hidden");
  } finally {
    loadingElement.classList.add("hidden");

    // Re-enable the form if the user stays on this page
    submitButton.disabled = false;
    formInputs.forEach((input) => {
      input.disabled = false;
    });
  }
});