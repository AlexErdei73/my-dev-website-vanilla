import { initBlock } from "./block.js";
import { initAuthor } from "./author.js";
import { importTemp, swapElements, animate } from "../helper.js";
import { prism } from "../prism.js";
import { createBlock, updatePost } from "../backend/backend.js";
import { loginData } from "../index.js";
import { initEditBlock } from "./editBlock.js";
import { initTitle } from "./title.js";

let _post;

export function initPost(post, edit, parentNode) {
  _post = post;
  let postNode = parentNode;
  if (!parentNode) postNode = document.querySelector(".post");
  const oldNode = postNode.querySelector("article.article");
  const node = document.createElement("article");
  node.classList.add("article");
  const titleNode = initTitle(post, edit);
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
    if (_post.content.length === index + 1) {
      const lastNodeID = _post.content[index - 1]._id;
      const lastNode = document.querySelector(`[data-blockid="${lastNodeID}"]`);
      lastNode.parentNode.appendChild(initBlock(newBlock, true));
    } else {
      const nextNodeID = _post.content[index + 1]._id;
      const nextNode = document.querySelector(`[data-blockid="${nextNodeID}"]`);
      nextNode.parentNode.insertBefore(initBlock(newBlock, true), nextNode);
    }
    if (newBlock.errors.length !== 0) initEditBlock(newBlock);
  }
}

export function removeBlock(block) {
  _post.content.splice(+block._id, 1);
  const blockNode = document.querySelector(
    `.post [data-blockid="${block._id}"]`
  );
  blockNode.remove();
}

export async function swapBlocks() {
  const newPost = { ..._post };
  const nodesToSwap = document.querySelectorAll(".edit-block");
  const idsToSwap = Array.from(nodesToSwap).map((node) =>
    node.getAttribute("data-blockid")
  );
  const indexes = idsToSwap.map((id) =>
    newPost.content.findIndex((block) => block._id === id)
  );
  const swapBlock = _post.content[indexes[0]];
  newPost.content[indexes[0]] = newPost.content[indexes[1]];
  newPost.content[indexes[1]] = swapBlock;
  try {
    const response = await updatePost(newPost, loginData.token);
    if (response.success) {
      _post = newPost;
      const firstBlockA = nodesToSwap[0].getBoundingClientRect();
      const firstBlockB = nodesToSwap[1].getBoundingClientRect();
      swapElements(nodesToSwap[1], nodesToSwap[0]);
      const lastBlockA = nodesToSwap[0].getBoundingClientRect();
      const lastBlockB = nodesToSwap[1].getBoundingClientRect();
      animate(nodesToSwap[0], firstBlockA, lastBlockA);
      animate(nodesToSwap[1], firstBlockB, lastBlockB);
    } else {
      showErrors(response.errors, indexes);
    }
  } catch (error) {
    showErrors([{ msg: error.message }], indexes);
  }
}

function showErrors(errors, indexes) {
  _post.content[indexes[0]].errors = errors;
  _post.content[indexes[1]].errors = errors;
  initEditBlock(_post.content[indexes[0]]);
  initEditBlock(_post.content[indexes[1]]);
}
