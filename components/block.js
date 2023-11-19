import { importTemp } from "../helper.js";
import { getPost } from "../index.js";
import { initEditBlock } from "./editBlock.js";

function addLinks(text, links) {
  let shift = 0; //Shift the position from the original with the combined lengths of the insertations
  links
    .map((link) => {
      return {
        text: `<a href="${link.url}">${link.description}</a>`,
        pos: link.position,
      };
    })
    .filter((link) => link.pos >= 0) //Filter out links with incorrect position to avoid unwanted behaviour
    .sort((link1, link2) => link1.pos - link2.pos) //Sort links to increasing position to avoid unwanted behaviour
    .forEach((link) => {
      //Insert links in text
      const position = link.pos + shift;
      const firstTextPart = text.slice(0, position) + " ";
      const lastTextPart = " " + text.slice(position, text.length + 1);
      text = firstTextPart + link.text + lastTextPart;
      shift = shift + link.text.length + 2;
    });
  return text;
}

export function initBlock(block, edit) {
  let blockNode = document.createElement("div");
  blockNode.classList.add("block");
  blockNode.setAttribute("data-blockid", block._id);
  let contentNode;
  switch (block.type) {
    case "paragraph":
      contentNode = importTemp(9);
      contentNode.innerHTML = addLinks(block.text, block.links);
      break;
    case "subtitle":
      contentNode = importTemp(10);
      contentNode.textContent = block.text;
      break;
    case "code":
      contentNode = importTemp(11);
      const codeNode = contentNode.querySelector("code");
      codeNode.textContent = block.text;
      if (block.language !== " ")
        codeNode.classList.add(`language-${block.language}`);
      break;
  }
  blockNode.appendChild(contentNode);
  if (edit) {
    const blockButtonsNode = importTemp(19);
    const editButton = blockButtonsNode.querySelector(".edit");
    editButton.addEventListener("click", function (event) {
      const editBtn = event.target;
      const blockNode = editBtn.parentNode.parentNode;
      const blockID = blockNode.getAttribute("data-blockid");
      const postID =
        blockNode.parentNode.parentNode.getAttribute("data-postid");
      const post = getPost(postID);
      const block = post.content.find((block) => block._id === blockID);
      initEditBlock(block);
    });
    blockNode.appendChild(blockButtonsNode);
  }
  return blockNode;
}
