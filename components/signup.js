import { importTemp } from "../helper.js";
import { modifyUser, submitUser } from "../index.js";

export function initSignup() {
  const loginNode = document.querySelector(".signup");
  const oldNode = loginNode.childNodes[0];
  const node = importTemp(23);
  toggleEventListener(node, false);
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

export function toggleEventListener(node, loginSuccess) {
  const handleSignupSubmit = function (event) {
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
  };

  const handleUserSubmit = function (event) {
    const username = node.querySelector("#username").value;
    const name = node.querySelector("#name").value;
    const jobTitle = node.querySelector("#jobTitle").value;
    const bio = node.querySelector("#bio").value;
    event.preventDefault();
    modifyUser({
      username,
      name,
      jobTitle,
      bio,
      isAdmin: false,
    });
  };

  if (loginSuccess) {
    node.removeEventListener("submit", handleUserSubmit);
    node.addEventListener("submit", handleSignupSubmit);
  } else {
    node.removeEventListener("submit", handleSignupSubmit);
    node.addEventListener("submit", handleUserSubmit);
  }
}

export function fillInUserForm(user) {
  const usernameInput = document.querySelector("#username");
  const nameInput = document.querySelector("#name");
  const jobTitleInput = document.querySelector("#jobTitle");
  const bioTextarea = document.querySelector("#bio");
  usernameInput.value = user.username;
  nameInput.value = user.name;
  jobTitleInput.value = user.jobTitle;
  bioTextarea.value = user.bio;
}
