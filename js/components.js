const header = document.querySelector("#header");
const footer = document.querySelector("#footer");

async function loadComponent(element, file) {
  const response = await fetch(file);
  const html = await response.text();

  element.innerHTML = html;
}

loadComponent(header, "./components/header.html");
loadComponent(footer, "./components/footer.html");