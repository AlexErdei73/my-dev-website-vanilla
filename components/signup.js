import { importTemp } from "../helper.js";
import { submitUser } from "../index.js";

export function initSignup() {
  const loginNode = document.querySelector(".signup");
  const oldNode = loginNode.childNodes[0];
  const node = importTemp(23);
  node.addEventListener("submit", function (event) {
    const username = node.querySelector("#username").value;
    const password = node.querySelector("#password").value;
    const name = node.querySelector("#name").value;
    const jobTitle = node.querySelector("#jobTitle").value;
    const bio = node.querySelector("#bio").value;
    event.preventDefault();
    submitUser({
      username,
      password,
      name,
      jobTitle,
      bio,
      isAdmin: false,
    });
  });
  if (!oldNode) loginNode.appendChild(node);
  else loginNode.replaceChild(node, oldNode);
}

export function removeErrors() {
  const errorsNode = document.querySelector(".signup .errors");
  const newNode = document.createElement("div");
  newNode.classList.add("errors");
  errorsNode.parentNode.replaceChild(newNode, errorsNode);
}

export function togglePassword(loginData) {
  const passwordLabel = document.querySelector(
    ".signup label[htmlFor='password']"
  );
  const passwordInput = document.querySelector(".signup input#password");
  const usernameInput = document.querySelector(".signup input#username");
  console.log(loginData.success);
  if (loginData.success) {
    passwordLabel.classList.add("hidden");
    passwordInput.classList.add("hidden");
    usernameInput.value = loginData.user.username;
    passwordInput.value = ".";
  } else {
    passwordLabel.classList.remove("hidden");
    passwordInput.classList.remove("hidden");
    usernameInput.value = "";
    passwordInput.value = "";
  }
}
