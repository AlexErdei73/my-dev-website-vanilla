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
