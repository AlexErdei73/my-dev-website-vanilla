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

export let posts = [
  {
    title: "...Loading",
    author: {
      username: "...Loading",
    },
    content: [],
  },
];

const aboutID = "64b3b9fc11a583b26b48b476";
let postID = aboutID;
initPost(postID);

export function viewPost(_postID) {
  if (_postID) postID = _postID;
  initPost(postID);
  window.location.href = "#post";
}

getPosts().then((json) => {
  posts = json.posts;
  initPosts(posts);
  console.log(posts);
});

showMainElement();
