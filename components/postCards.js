import { initPost } from "./postCard.js";

export function initPosts(posts, parentNode = null) {
	if (!parentNode) parentNode = document.querySelector(".home");
	const node = document.createElement("div");
	node.classList.add("posts");

	posts.forEach((post, i) => {
		const postNode = initPost(post);
		postNode.setAttribute("data-postid", post._id);
		node.appendChild(postNode);
	});
	parentNode.appendChild(node);
}
