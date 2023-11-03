import { importTemp } from "../helper.js";

const titleNode = document.querySelector("title");
const pageTitleLiveRegion = document.querySelector("#page-title-live-region");
const mainNode = document.querySelector("main");

const components = ["about", "home", "post", "login", "signup"];
const nodes = [];
let prevIndex;

components.forEach((_component, i) => {
  const node = importTemp(i);
  node.classList.add("hidden");
  nodes[i] = node;
  mainNode.appendChild(node);
});

function updateDOM(index) {
  if (prevIndex >= 0) nodes[prevIndex].classList.add("hidden");
  nodes[index].classList.remove("hidden");
  prevIndex = index;
  const title = `${components[index]} page - My Dev Website Vanilla`;
  titleNode.textContent = title;
  pageTitleLiveRegion.textContent = title;

  document.querySelector("main h1").focus();
}

export function showMainElement() {
  const component = window.location.hash.slice(1) || components[0];
  const index = components.indexOf(component);
  updateDOM(index);
}

window.addEventListener("hashchange", showMainElement);
