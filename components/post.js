import { initBlock } from "./block.js";
import { initAuthor } from "./author.js";
import { importTemp } from "../helper.js";
import { prism } from "../prism.js";

export function initPost(post, parentNode) {
	let postNode = parentNode;
	if (!parentNode) postNode = document.querySelector(".post");
	const oldNode = postNode.querySelector("article.article");
	const node = document.createElement("article");
	node.classList.add("article");
	const titleNode = importTemp(8);
	titleNode.textContent = post.title;
	node.appendChild(titleNode);

	post.content.forEach((block) => {
		const blockNode = initBlock(block);
		node.appendChild(blockNode);
	});

	const oldAuthorNode = postNode.querySelector("article.author");
	const authorNode = initAuthor(post.author);
	if (oldAuthorNode) postNode.replaceChild(authorNode, oldAuthorNode);
	else postNode.appendChild(authorNode);

	if (oldNode) postNode.replaceChild(node, oldNode);
	else postNode.appendChild(node);
	prism();
}
