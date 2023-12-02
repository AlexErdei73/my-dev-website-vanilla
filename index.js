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
  deleteBlock,
  createBlock,
  createUser,
  updateUser,
  updatePostLikes,
} from "./backend/backend.js";
import { initAboutPost } from "./components/about.js";
import { initLogin } from "./components/login.js";
import { initNewPost } from "./newPost.js";
import {
  initModal,
  closeModal,
  showErrorMsg,
  showModal,
} from "./components/modal.js";
import { initBlock } from "./components/block.js";
import { initEditBlock } from "./components/editBlock.js";
import { prism } from "./prism.js";

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

export function getPost(_postID) {
  return posts.filter((post) => post._id === _postID)[0];
}

function getPublishedPosts() {
  return posts.filter((post) => post.published);
}

async function erasePost(post) {
  try {
    const response = await deletePosts(post, loginData.token);
    if (!response.success) {
      showErrorMsg(response.errors[0].msg);
    } else {
      closeModal();
      const postIndex = posts.findIndex((post) => post._id === postID);
      posts.splice(postIndex, 1);
      initPosts(getPublishedPosts());
      initLogin(loginData);
    }
  } catch (error) {
    showErrorMsg(error.message);
  }
}

function openErrorDlg({ msg }) {
  initModal({
    variant: "danger",
    header: "Error!",
    footer: "Sorry,but it happens sometimes",
    onClose: closeModal,
    isErrorDlg: true,
  });
  showModal();
  showErrorMsg(msg);
}

export async function togglePublish(postID) {
  let post = getPost(postID);
  post.published = !post.published;
  try {
    const response = await updatePost(post, loginData.token);
    if (!response.success) {
      post.published = !post.published;
      throw new Error(response.errors[0].msg);
    } else {
      initPosts(getPublishedPosts());
      initLogin(loginData);
    }
  } catch (error) {
    openErrorDlg({ msg: error.message });
  }
}

export async function toggleLike(postId, userId) {
  try {
    const response = await updatePostLikes(postId, userId);
    if (response.success) {
      const post = getPost(postId);
      const likeIndex = post.likes.indexOf(userId);
      const isPostLiked = likeIndex !== -1;
      if (!isPostLiked) post.likes.push(userId);
      else post.likes.splice(likeIndex, 1);
      initPosts(getPublishedPosts());
      initLogin(loginData);
    } else {
      throw new Error(response.errors[0].msg);
    }
  } catch (error) {
    openErrorDlg({ msg: error.message });
  }
}

const aboutID = "64b3b9fc11a583b26b48b476";
let postID = aboutID;
initPost(posts[0]);
initAboutPost(posts[0]);
initModal({
  variant: "danger",
  header: "Danger!",
  footer: "Permanent data loss",
  onDelete: (postID) => erasePost(getPost(postID)),
  onClose: closeModal,
  isErrorDlg: false,
});
const storageItem = localStorage.getItem("loginData");
if (storageItem) loginData = JSON.parse(storageItem);

export function viewPost(_postID, edit) {
  if (_postID) postID = _postID;
  initPost(getPost(postID), edit);
  window.location.href = "#post";
}

getPosts()
  .then((json) => {
    posts = json.posts;
    initPosts(getPublishedPosts());
    initPost(getPost(postID));
    initAboutPost(getPost(aboutID));
    initLogin(loginData);
    initNewPost(createPost);
    console.log(posts);
  })
  .catch((error) => openErrorDlg({ msg: error.message }));

async function createPost(post) {
  post.author = loginData.user._id;
  let msg = "";
  try {
    const response = await postPosts(post, loginData.token);
    // The next line will deal with unauthorized access when response do not have post
    if (!response.post) msg = "Unauthorized";
    if (response.success) {
      const post = response.post;
      post.author = { ...loginData.user };
      posts.push(post);
      initLogin(loginData);
    }
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
  initPosts(getPublishedPosts());
}

export async function submitBlock(block) {
  if (block.type === "code" && block.language === " ") block.language = "html";
  try {
    const response = await updateBlock(block, loginData.token);
    block.errors = response.errors;
    if (response.success) {
      delete block.errors;
      const post = posts.find((post) => post._id === block.post);
      const blockIndex = post.content.findIndex(
        (blck) => blck._id === block._id
      );
      post.content[blockIndex] = block;
    }
  } catch (error) {
    block.errors = [{ msg: error.message }];
  } finally {
    const blockNode = initBlock(block, true);
    const oldBlockNode = document.querySelector(
      `[data-blockid="${block._id}"]`
    );
    oldBlockNode.parentNode.replaceChild(blockNode, oldBlockNode);
    if (block.errors) initEditBlock(block);
    if (block.type === "code") prism();
  }
}

export async function remove(block) {
  const post = posts.find((post) => post._id === block.post);
  const index = post.content.findIndex((blck) => blck._id === block._id);
  try {
    const response = await deleteBlock(block, loginData.token);
    if (response.success) {
      post.content.splice(index, 1);
    } else block.errors = response.errors;
  } catch (error) {
    block.errors = [{ msg: error.message }];
  } finally {
    const blockNode = document.querySelector(`[data-blockid="${block._id}"]`);
    if (block.errors && block.errors.length !== 0) initEditBlock(block);
    else blockNode.remove();
  }
}

showMainElement();
