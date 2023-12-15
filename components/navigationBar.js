import { importTemp } from "../helper.js";
import { setPostId } from "../index.js";
import { removeErrors } from "./signup.js";

const titleNode = document.querySelector("title");
const pageTitleLiveRegion = document.querySelector("#page-title-live-region");
const mainNode = document.querySelector("main");

const components = ["about", "home", "post", "login", "signup", "newpost"];
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
  const component = window.location.hash.slice(1) || components[1];
  const componentStrPieces = component.split("/");
  const index = components.indexOf(componentStrPieces[0]);
  // If it is post
  if (index === 2) setPostId(componentStrPieces[1]);
  // If it is signup
  if (index === 4) removeErrors();
  updateDOM(index);
}

export function updateSignupLinkText(loginData) {
  let textContent = "Signup";
  if (loginData.success) textContent = "User";
  const signupNode = document.querySelector("nav a[href='#signup']");
  signupNode.textContent = textContent;
}

window.addEventListener("hashchange", showMainElement);
