import { importTemp } from "../helper.js";

export function initSignup() {
  const loginNode = document.querySelector(".signup");
  const oldNode = loginNode.childNodes[0];
  const node = importTemp(23);
  if (!oldNode) loginNode.appendChild(node);
  else loginNode.replaceChild(node, oldNode);
}
