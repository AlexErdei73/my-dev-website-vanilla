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
import { initLogin } from "./components/login.js";
import { initNewPost } from "./newPost.js";

export let posts = [
	{
		title: "...Loading",
		author: {
			username: "...Loading",
		},
		content: [],
	},
];

export let loginData = {
	success: false,
	user: {
		username: "",
		password: "",
		isAdmin: false,
		name: "",
		jobTitle: "",
		bio: "",
	},
	token: "",
	msg: "",
};

function getPost(_postID) {
	return posts.filter((post) => post._id === _postID)[0];
}

function getPublishedPosts() {
	return posts.filter((post) => post.published);
}

const aboutID = "64b3b9fc11a583b26b48b476";
let postID = aboutID;
initPost(posts[0]);
initAboutPost(posts[0]);
const storageItem = localStorage.getItem("loginData");
if (storageItem) loginData = JSON.parse(storageItem);

export function viewPost(_postID) {
	if (_postID) postID = _postID;
	initPost(getPost(postID));
	window.location.href = "#post";
}

getPosts().then((json) => {
	posts = json.posts;
	initPosts(getPublishedPosts());
	initPost(getPost(postID));
	initAboutPost(getPost(aboutID));
	initLogin(loginData);
	initNewPost(createPost);
	console.log(posts);
});

async function createPost(post) {
	console.log(post);
	post.author = loginData.user._id;
	let msg = "";
	try {
		const response = await postPosts(post, loginData.token);
		console.log(response);
		// The next line will deal with unauthorized access when response do not have post
		if (!response.post) msg = "Unauthorized";
	} catch (error) {
		msg = error.message;
	}
	return msg;
}

export async function submitLogin({ username, password }) {
	try {
		const response = await login(username, password);
		if (response.success) {
			//user logged in successfully
			loginData = response;
			loginData.user.password = ""; //Do not store password as it is sensitive information!!!
			//Store newLoginState, which contains the token, in localStorage
			localStorage.setItem("loginData", JSON.stringify(loginData));
		} else {
			loginData.user.username = username;
			loginData.user.password = password;
			loginData.msg = response.msg;
		}
	} catch (error) {
		console.error(error);
		loginData.msg = error.message;
	}
	initLogin(loginData);
}

showMainElement();
