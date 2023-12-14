import { importTemp } from "../helper.js";
import { modifyUser, submitUser } from "../index.js";

let _loginSuccess;

export function initSignup(loginData) {
  _loginSuccess = loginData.success;
  const loginNode = document.querySelector(".signup");
  const oldNode = loginNode.childNodes[0];
  const node = importTemp(23);
  addSubmitListener(node);
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
  if (loginData.success) {
    passwordLabel.classList.add("hidden");
    passwordInput.classList.add("hidden");
    fillInUserForm(loginData.user);
    passwordInput.value = ".";
  } else {
    passwordLabel.classList.remove("hidden");
    passwordInput.classList.remove("hidden");
    deleteUserForm();
  }
}

function addSubmitListener(node) {
  const listener = function (event) {
    event.preventDefault();
    const username = node.querySelector("#username").value;
    const password = node.querySelector("#password").value;
    const name = node.querySelector("#name").value;
    const jobTitle = node.querySelector("#jobTitle").value;
    const bio = node.querySelector("#bio").value;
    console.log("loginSuccess: ", _loginSuccess);
    const user = {
      username,
      password,
      name,
      jobTitle,
      bio,
      isAdmin: false,
    };
    if (_loginSuccess) {
      delete user.password;
      modifyUser(user);
    } else submitUser(user);
  };

  node.addEventListener("submit", listener);
}

export function fillInUserForm(user) {
  const usernameInput = document.querySelector(".signup #username");
  const nameInput = document.querySelector(".signup #name");
  const jobTitleInput = document.querySelector(".signup #jobTitle");
  const bioTextarea = document.querySelector(".signup #bio");
  usernameInput.value = user.username;
  nameInput.value = user.name;
  jobTitleInput.value = user.jobTitle;
  bioTextarea.value = user.bio;
}

export function deleteUserForm() {
  const usernameInput = document.querySelector(".signup #username");
  const passwordInput = document.querySelector(".signup #password");
  const nameInput = document.querySelector(".signup #name");
  const jobTitleInput = document.querySelector(".signup #jobTitle");
  const bioTextarea = document.querySelector(".signup #bio");
  usernameInput.value = "";
  passwordInput.value = "";
  nameInput.value = "";
  jobTitleInput.value = "";
  bioTextarea.value = "";
}

export function setLoginSuccess(loginSuccess) {
  _loginSuccess = loginSuccess;
}
