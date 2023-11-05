import { showMainElement } from "./components/navigationBar.js";
import { initPosts } from "./components/postCards.js";
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

export let posts = [
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
  initPosts(posts);
  console.log(posts);
});

showMainElement();
