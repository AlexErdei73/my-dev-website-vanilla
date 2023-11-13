import { initPost } from "./postCard.js";

export function initPosts(posts, parentNode = null) {
	let edit = true;
	if (!parentNode) {
		parentNode = document.querySelector(".home");
		edit = false;
	}
	const node = document.createElement("div");
	node.classList.add("posts");

	posts.forEach((post, i) => {
		const postNode = initPost(post, edit);
		postNode.setAttribute("data-postid", post._id);
		node.appendChild(postNode);
	});
	parentNode.appendChild(node);
}
