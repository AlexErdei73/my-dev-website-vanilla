export function initPost(postID) {
  const postNode = document.querySelector(".post");
  const oldNode = postNode.querySelector("div");
  const node = document.createElement("div");
  node.textContent = `Post ID: ${postID}`;
  if (oldNode) postNode.replaceChild(node, oldNode);
  else postNode.appendChild(node);
}
