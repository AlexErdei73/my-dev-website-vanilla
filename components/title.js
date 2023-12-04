import { importTemp } from "../helper.js";
import { initEditTitle } from "./editTitle.js";
import { insertBlock } from "./post.js";

export function initTitle(post, edit) {
  const titleNode = importTemp(8);
  const headerNode = titleNode.querySelector("h1");
  headerNode.textContent = post.title;
  if (edit) {
    const buttonsNode = titleNode.querySelector(".buttons");
    const editButton = buttonsNode.querySelector(".edit");
    editButton.addEventListener("click", function () {
      initEditTitle(post);
    });
    const insertButton = buttonsNode.querySelector(".insert");
    insertButton.addEventListener("click", function () {
      insertBlock();
    });
    buttonsNode.classList.remove("hidden");
  }
  return titleNode;
}
