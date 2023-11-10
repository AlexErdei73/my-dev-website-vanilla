import { importTemp } from "../helper.js";
import { submitLogin } from "../index.js";

export function initLogin(loginData) {
	const { success, user, msg } = loginData;
	let { username, password } = user;

	const loginNode = document.querySelector(".login");
	const oldNode = loginNode.childNodes[0];
	let node;
	if (!success) {
		node = importTemp(12); //Login Form
		const usernameInput = node.querySelector("#username");
		const passwordInput = node.querySelector("#password");
		usernameInput.value = username;
		passwordInput.value = password;
		if (msg) {
			const msgNode = importTemp(13); //Error Message
			msgNode.textContent = msg;
			node.appendChild(msgNode);
		}
		node.addEventListener("submit", function (event) {
			event.preventDefault();
			username = usernameInput.value;
			password = passwordInput.value;
			submitLogin({ username, password });
		});
		if (!oldNode) loginNode.appendChild(node);
		else loginNode.replaceChild(node, oldNode);
	}
}
