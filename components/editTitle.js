import { importTemp } from "../helper.js";

export function initEditTitle(post) {
  const editTitleNode = importTemp(22);
  const inputNode = editTitleNode.querySelector("input#title");
  inputNode.value = post.title;
  const titleNode = document.querySelector(".post .post-title");
  titleNode.parentNode.replaceChild(editTitleNode, titleNode);
}
