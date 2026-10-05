console.log("REGISTER JS LOADED");

import { supabase } from "./supabase.js";

const registerForm = document.getElementById("register-form");

console.log("FORM:", registerForm);

registerForm.addEventListener("submit", async (event) => {
  console.log("SUBMIT DETECTED");

  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
  const { data, error } = await supabase.auth.signUp({
  email: email,
  password: password,
});

const user = data.user;

    console.log("SUPABASE RESPONSE:", user, error);

    if (error) {
      throw error;
    }

    if (user) {
      alert(
        "Registration successful! Please check your email to confirm your account."
      );

      registerForm.reset();
    }
  } catch (error) {
    console.error("REGISTRATION ERROR:", error);
    alert("Error during registration: " + error.message);
  }
});