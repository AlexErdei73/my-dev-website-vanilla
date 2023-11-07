import { initBlock } from "./block.js";
import { importTemp } from "../helper.js";
import { prism } from "../prism.js";

export function initPost(post) {
	const postNode = document.querySelector(".post");
	const oldNode = postNode.querySelector("div");
	const node = document.createElement("div");
	const titleNode = importTemp(7);
	titleNode.textContent = post.title;
	node.appendChild(titleNode);

	post.content.forEach((block) => {
		const blockNode = initBlock(block);
		node.appendChild(blockNode);
	});

	if (oldNode) postNode.replaceChild(node, oldNode);
	else postNode.appendChild(node);
	prism();
}
