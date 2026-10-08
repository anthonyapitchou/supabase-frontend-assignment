import { supabase } from "./supabase.js";

console.log("LOGIN JS LOADED");

const loginForm = document.getElementById("login-form");
const loadingElement = document.getElementById("loading");

console.log("FORM:", loginForm);

loginForm.addEventListener("submit", async (event) => {
  console.log("SUBMIT DETECTED");

  event.preventDefault();

  loadingElement.classList.remove("hidden");

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    console.log("SUPABASE RESPONSE:", data, error);

    if (error) {
      throw error;
    }

    if (data.user) {
      alert("Login successful! Welcome back.");
      loginForm.reset();
      window.location.href = "./index.html";
    }

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    alert("Error during login: " + error.message);

  } finally {
    loadingElement.classList.add("hidden");
  }
});