import { importTemp } from "../helper.js";
import { initBlock } from "./block.js";
import { prism } from "../prism.js";

function numberOfLines(text) {
  return text.split("\n").length;
}

function textWithLinks(block) {
  if (!block.links) return block.text;
  const text = [];
  let previousPosition = 0;
  block.links.forEach((link) => {
    const nextTextPiece = block.text.slice(previousPosition, link.position);
    if (nextTextPiece) text.push(nextTextPiece);
    text.push(`[${link.description}](${link.url})`);
    previousPosition = link.position;
  });
  const nextTextPiece = block.text.slice(previousPosition, block.text.length);
  if (nextTextPiece) text.push(nextTextPiece);
  return text.join("");
}

export function initEditBlock(block) {
  const editBlockNode = importTemp(20);
  const cancelButton = editBlockNode.querySelector(".buttons .cancel");
  const inputNode = editBlockNode.querySelector(".input-container input");
  if (block.type !== "subtitle") {
    const textareaNode = editBlockNode.querySelector(
      ".input-container textarea"
    );
    inputNode.classList.toggle("hidden");
    textareaNode.classList.toggle("hidden");
    textareaNode.style = "";
    if (block.type === "code") {
      const selectLangNode = editBlockNode.querySelector("#language");
      selectLangNode.classList.remove("hidden");
      textareaNode.value = block.text;
      textareaNode.rows = numberOfLines(block.text);
    } else {
      textareaNode.value = textWithLinks(block);
    }
  } else {
    inputNode.value = block.text;
  }
  cancelButton.addEventListener("click", function () {
    const blockNode = initBlock(block, true);
    editBlockNode.parentNode.replaceChild(blockNode, editBlockNode);
    if (block.type === "code") prism();
  });
  const blockNode = document.querySelector(
    `.block[data-blockid="${block._id}"]`
  );
  blockNode.parentNode.replaceChild(editBlockNode, blockNode);
}
