import { supabase } from "./supabase.js";

const header = document.querySelector("#header");
const footer = document.querySelector("#footer");

async function loadComponent(element, file) {
  const response = await fetch(file);
  const html = await response.text();

  element.innerHTML = html;

  

if (element === header) {
  const currentPage = window.location.pathname.split("/").pop();
  const articlesLink = document.getElementById("index-link");

  if (currentPage === "articles.html") {
    articlesLink.classList.add("border-b-2", "border-blue-400", "pb-1");
  } else {
    articlesLink.classList.remove("border-b-2", "border-blue-400", "pb-1");
  }
}


  if (element === header) {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const loginLink = document.getElementById("login-link");
    const registerLink = document.getElementById("register-link");
    const createLink = document.getElementById("create-link");
    const logoutButton = document.getElementById("logout-button");

    if (session) {
      loginLink.hidden = true;
      registerLink.hidden = true;
      createLink.hidden = false;
      logoutButton.hidden = false;
    } else {
      loginLink.hidden = false;
      registerLink.hidden = false;
      createLink.hidden = true;
      logoutButton.hidden = true;
    }

    logoutButton.addEventListener("click", async () => {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Error during logout:", error);
      } else {
        window.location.href = "./login.html";
      }
    });
  }
}

loadComponent(header, "./components/header.html");
loadComponent(footer, "./components/footer.html");