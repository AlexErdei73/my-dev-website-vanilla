import { importTemp } from "../helper.js";
import { viewPost, loginData } from "../index.js";

export function initPost(post, edit) {
	const postCardNode = importTemp(6);
	const postCardBody = importTemp(7);
	const cardBody = postCardNode.querySelector(".body");
	postCardNode.replaceChild(postCardBody, cardBody);
	const postTitleNode = postCardNode.querySelector(".body .title h2");
	const postAuthorNode = postCardNode.querySelector(".head .left");
	const numberOfLikesNode = postCardNode.querySelector(".head .right");
	const createdNode = postCardNode.querySelector(".footer .left");
	const updatedNode = postCardNode.querySelector(".footer .right");
	const viewButton = postCardNode.querySelector("button.view");

	postTitleNode.textContent = post.title;
	postAuthorNode.textContent = `By ${post.author.username}`;
	numberOfLikesNode.textContent = `Likes: ${post.likes.length}`;
	createdNode.textContent = `Created: ${post.createdAt.slice(0, 10)}`;
	updatedNode.textContent = `Updated: ${post.updatedAt.slice(0, 10)}`;

	viewButton.addEventListener("click", function (event) {
		const buttonNode = event.target;
		const postID =
			buttonNode.parentNode.parentNode.parentNode.getAttribute("data-postid");
		viewPost(postID);
	});

	if (edit) {
		const publishButton = postCardNode.querySelector("button.publish");
		const deleteButton = postCardNode.querySelector("button.delete");
		publishButton.classList.remove("hidden");
		publishButton.textContent = post.published ? "Hide" : "Publish";
		deleteButton.classList.remove("hidden");
	}

	if (!edit && loginData.success) {
		const likeButton = postCardNode.querySelector("button.like");
		likeButton.textContent =
			post.likes.indexOf(loginData.user._id) === -1 ? "Like" : "Unlike";
		likeButton.classList.remove("hidden");
	}

	return postCardNode;
}
