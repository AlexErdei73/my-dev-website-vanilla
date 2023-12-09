import { importTemp } from "../helper.js";

export function initNewPost(submit) {
  const newPostNode = document.querySelector(".newpost");
  const node = importTemp(16); //New Post Form
  const titleInput = node.querySelector("input");
  node.addEventListener("submit", async function (event) {
    event.preventDefault();
    const oldErrorMsgNode = newPostNode.querySelector(".error-msg");
    if (oldErrorMsgNode) oldErrorMsgNode.remove();
    const msg = await submit({ title: titleInput.value });
    if (msg) {
      const errorMsgNode = importTemp(14);
      errorMsgNode.textContent = msg;
      node.appendChild(errorMsgNode);
    } else window.location.href = "#login";
  });
  newPostNode.appendChild(node);
}
