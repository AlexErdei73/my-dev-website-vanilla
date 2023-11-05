import { importTemp } from "../helper.js";

export function initPost(post) {
  const postCardNode = importTemp(5);
  const postCardBody = importTemp(6);
  const cardBody = postCardNode.querySelector(".body");
  postCardNode.replaceChild(postCardBody, cardBody);
  const postTitleNode = postCardNode.querySelector(".body .title h2");
  const postAuthorNode = postCardNode.querySelector(".head .left");
  const numberOfLikesNode = postCardNode.querySelector(".head .right");
  const createdNode = postCardNode.querySelector(".footer .left");
  const updatedNode = postCardNode.querySelector(".footer .right");
  const viewButton = postCardNode.querySelector("button.view");

  postTitleNode.textContent = post.title;
  postAuthorNode.textContent = post.author.username;
  numberOfLikesNode.textContent = post.likes.length;
  createdNode.textContent = post.createdAt.slice(0, 10);
  updatedNode.textContent = post.updatedAt.slice(0, 10);

  viewButton.addEventListener("click", function () {
    alert("View Clicked!");
  });

  return postCardNode;
}
