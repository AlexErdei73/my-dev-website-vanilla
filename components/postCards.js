import { initPost } from "./postCard.js";
import { posts } from "../index.js";

export function initPosts() {
  const homeNode = document.querySelector(".home");
  const node = document.createElement("div");
  node.classList.add("posts");

  posts.forEach((post, i) => {
    if (post.published) {
      const postNode = initPost(post);
      postNode.setAttribute("data-postid", post._id);
      node.appendChild(postNode);
    }
  });
  homeNode.appendChild(node);
}
