import { escapeHTML } from "../helper.js";

export function initPost(postID) {
  const postNode = document.querySelector(".post");

  const codeNode = postNode.querySelector("code");
  codeNode.textContent = "<h1>This is a HTML element!</h1>";

  const oldNode = postNode.querySelector("div");
  const node = document.createElement("div");
  node.textContent = `Post ID: ${postID}`;
  if (oldNode) postNode.replaceChild(node, oldNode);
  else postNode.appendChild(node);
}
