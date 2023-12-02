import { importTemp } from "../helper.js";

export function initTitle(post, edit) {
  const titleNode = importTemp(8);
  const headerNode = titleNode.querySelector("h1");
  headerNode.textContent = post.title;
  if (edit) {
    const buttonsNode = titleNode.querySelector(".buttons");
    buttonsNode.classList.remove("hidden");
  }
  return titleNode;
}
