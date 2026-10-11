import { supabase } from "./supabase.js";

const registerForm = document.getElementById("register-form");
const registerMessage = document.getElementById("register-message");
const loadingElement = document.getElementById("loading");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = registerForm.querySelector(
    'button[type="submit"]'
  );
  const formInputs = registerForm.querySelectorAll("input");

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Disable the form while submitting
  submitButton.disabled = true;
  formInputs.forEach((input) => {
    input.disabled = true;
  });

  registerMessage.textContent = "";
  registerMessage.classList.add("hidden");
  loadingElement.classList.remove("hidden");

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    registerMessage.textContent =
      "Registration successful! Please check your email to confirm your account.";
    registerMessage.classList.remove("hidden");

    registerForm.reset();
  } catch (error) {
    registerMessage.textContent =
      "Error during registration: " + error.message;
    registerMessage.classList.remove("hidden");
  } finally {
    // Hide loading indicator
    loadingElement.classList.add("hidden");

    // Re-enable the form
    submitButton.disabled = false;
    formInputs.forEach((input) => {
      input.disabled = false;
    });
  }
});