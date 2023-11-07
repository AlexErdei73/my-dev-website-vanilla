import { initPost } from "./post.js";

export function initAboutPost(aboutPost) {
	const aboutNode = document.querySelector(".about");
	initPost(aboutPost, aboutNode);
}
