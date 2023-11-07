import { showMainElement } from "./components/navigationBar.js";
import { initPosts } from "./components/postCards.js";
import { initPost } from "./components/post.js";
import {
	login,
	updatePost,
	updateBlock,
	getPosts,
	postPosts,
	deletePosts,
	createUser,
	updateUser,
	updatePostLikes,
} from "./backend/backend.js";
import { initAboutPost } from "./components/about.js";

export let posts = [
	{
		title: "...Loading",
		author: {
			username: "...Loading",
		},
		content: [],
	},
];

function getPost(_postID) {
	return posts.filter((post) => post._id === _postID)[0];
}

const aboutID = "64b3b9fc11a583b26b48b476";
let postID = aboutID;
initPost(posts[0]);
initAboutPost(posts[0]);

export function viewPost(_postID) {
	if (_postID) postID = _postID;
	initPost(getPost(postID));
	window.location.href = "#post";
}

getPosts().then((json) => {
	posts = json.posts;
	initPosts(posts);
	initPost(getPost(postID));
	initAboutPost(getPost(aboutID));
	console.log(posts);
});

showMainElement();
