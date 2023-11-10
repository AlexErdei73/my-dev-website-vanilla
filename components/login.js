import { importTemp } from "../helper.js";

export function initLogin(loginData) {
	const { success, user, msg } = loginData;
	let { username, password } = user;

	const loginNode = document.querySelector(".login");
	let node;
	if (!success) {
		node = importTemp(12); //Login Form
		const usernameInput = node.querySelector("#username");
		const passwordInput = node.querySelector("#password");
		usernameInput.value = username;
		passwordInput.value = password;
		node.addEventListener("submit", function (event) {
			event.preventDefault();
			username = usernameInput.value;
			password = passwordInput.value;
			console.log({ username, password });
		});
		loginNode.appendChild(node);
	}
}
