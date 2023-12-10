import { importTemp } from "../helper.js";
import { submitLogin, logout } from "../index.js";
import { initPosts } from "./postCards.js";
import { posts } from "../index.js";

function getUserPosts(posts, userID) {
  return posts.filter((post) => post.author._id === userID);
}

export function initLogin(loginData) {
  const { success, user, msg } = loginData;
  let { username, password } = user;

  const loginNode = document.querySelector(".login");
  const oldNode = loginNode.childNodes[0];
  let node;
  if (!success) {
    node = importTemp(13); //Login Form
    const usernameInput = node.querySelector("#username");
    const passwordInput = node.querySelector("#password");
    usernameInput.value = username;
    passwordInput.value = password;
    if (msg) {
      const msgNode = importTemp(14); //Error Message
      msgNode.textContent = msg;
      node.appendChild(msgNode);
    }
    node.addEventListener("submit", function (event) {
      event.preventDefault();
      username = usernameInput.value;
      password = passwordInput.value;
      submitLogin({ username, password });
    });
  } else {
    node = importTemp(15); // Logout Component
    const outputNode = node.querySelector("h1 output");
    outputNode.textContent = username;
    const userPostsNode = node.querySelector(".user-posts");
    initPosts(getUserPosts(posts, user._id), userPostsNode);
    const logoutButton = node.querySelector("button.logout");
    logoutButton.addEventListener("click", () => logout(loginData));
  }
  if (!oldNode) loginNode.appendChild(node);
  else loginNode.replaceChild(node, oldNode);
}
