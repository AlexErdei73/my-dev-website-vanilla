import { initPost } from "./postCard.js";
import { posts } from "../index.js";

export function initPosts() {
	const homeNode = document.querySelector(".home");
	const node = document.createElement("div");
	node.classList.add("posts");

	posts.forEach((post, i) => {
		const postNode = initPost(post);
		node.appendChild(postNode);
	});
	homeNode.appendChild(node);
}
