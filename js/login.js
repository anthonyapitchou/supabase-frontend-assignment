import { supabase } from "./supabase.js";

console.log("LOGIN JS LOADED");

const loginForm = document.getElementById("login-form");

console.log("FORM:", loginForm);

loginForm.addEventListener("submit", async (event) => {
  console.log("SUBMIT DETECTED");

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {   
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        }); 

        const user = data.user;

        console.log("SUPABASE RESPONSE:", user, error);
        if (error) {
            throw error;
        }

        if (user) {
            alert("Login successful! Welcome back.");
                 loginForm.reset();
              window.location.href = "./index.html";
       
        }

    } catch (error) {
        console.error("LOGIN ERROR:", error);
        alert("Error during login: " + error.message);
    }

});