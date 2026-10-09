
import { supabase } from "./supabase.js";

const header = document.querySelector("#header");
const footer = document.querySelector("#footer");

async function loadComponent(element, file) {
  if (!element) return;

  try {
    const response = await fetch(file);

    if (!response.ok) {
      throw new Error(`Failed to load ${file}: ${response.status}`);
    }

    const html = await response.text();
    element.innerHTML = html;

    if (element === header) {
      const currentPage = window.location.pathname.split("/").pop();
      const articlesLink = document.getElementById("index-link");

      if (articlesLink) {
        if (currentPage === "articles.html") {
          articlesLink.classList.add(
            "border-b-2",
            "border-blue-400",
            "pb-1"
          );
        } else {
          articlesLink.classList.remove(
            "border-b-2",
            "border-blue-400",
            "pb-1"
          );
        }
      }

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Error getting session:", sessionError);
      }

      const loginLink = document.getElementById("login-link");
      const registerLink = document.getElementById("register-link");
      const createLink = document.getElementById("create-link");
      const logoutButton = document.getElementById("logout-button");

      if (loginLink && registerLink && createLink && logoutButton) {
        loginLink.hidden = Boolean(session);
        registerLink.hidden = Boolean(session);
        createLink.hidden = !session;
        logoutButton.hidden = !session;

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
  } catch (error) {
    console.error("Component loading error:", error);
  }
}

loadComponent(header, "./components/header.html");
loadComponent(footer, "./components/footer.html");
