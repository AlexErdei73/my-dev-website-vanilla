import { initBlock } from "./block.js";
import { initAuthor } from "./author.js";
import { importTemp } from "../helper.js";
import { prism } from "../prism.js";
import { createBlock, updatePost } from "../backend/backend.js";
import { loginData } from "../index.js";
import { initEditBlock } from "./editBlock.js";

let _post, _parentNode;

export function initPost(post, edit, parentNode) {
	_post = post;
	_parentNode = parentNode;
	let postNode = parentNode;
	if (!parentNode) postNode = document.querySelector(".post");
	const oldNode = postNode.querySelector("article.article");
	const node = document.createElement("article");
	node.classList.add("article");
	const titleNode = importTemp(8);
	titleNode.textContent = post.title;
	node.appendChild(titleNode);

	post.content.forEach((block) => {
		const blockNode = initBlock(block, edit);
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

export async function insertBlock(block) {
	let newBlock = {
		_id: "new-block",
		post: _post._id,
		type: "paragraph",
		text: "New block",
		links: [],
		errors: [],
	};
	let index = _post.content.findIndex((_block) => _block._id === block._id);
	index++;
	_post.content.splice(index, 0, newBlock);
	delete newBlock._id;
	try {
		const response = await createBlock(newBlock, loginData.token);
		if (response.success) {
			newBlock = response.block;
			_post.content[index] = newBlock;
			newBlock.errors = [];
			const response2 = await updatePost(_post, loginData.token);
			if (!response2.success) newBlock.errors.push(response2.errors[0]);
		} else {
			newBlock.errors.push(response.errors[0]);
		}
	} catch (error) {
		newBlock.errors.push({ msg: error.message });
	} finally {
		if (!newBlock._id) newBlock._id = index;
		initPost(_post, true, _parentNode);
		if (newBlock.errors.length !== 0) initEditBlock(newBlock);
	}
}

export function removeBlock(block) {
	_post.content.splice(+block._id, 1);
	initPost(_post, true, _parentNode);
}
