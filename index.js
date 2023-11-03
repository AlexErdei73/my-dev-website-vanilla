import { showMainElement } from "./components/navigationBar.js";
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

let posts = [
	{
		title: "...Loading",
		author: {
			username: "...Loading",
		},
		content: [],
	},
];

getPosts().then((json) => {
	posts = json.posts;
	console.log(posts);
});

showMainElement();