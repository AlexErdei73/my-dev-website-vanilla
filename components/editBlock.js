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
  const inputNode = importTemp(21);
  const textareaNode = editBlockNode.querySelector(".input-container textarea");
  const selectTypeNode = editBlockNode.querySelector("select#type");
  selectTypeNode.value = block.type;
  if (block.type !== "subtitle") {
    inputNode.addEventListener("change", function () {
      console.log("Input Change!");
      textareaNode.value = inputNode.value;
    });
    textareaNode.addEventListener("change", function () {
      console.log("Textarea Change!");
      inputNode.value = textareaNode.value;
    });
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
    textareaNode.parentNode.replaceChild(inputNode, textareaNode);
  }
  cancelButton.addEventListener("click", function () {
    const blockNode = initBlock(block, true);
    editBlockNode.parentNode.replaceChild(blockNode, editBlockNode);
    if (block.type === "code") prism();
  });
  editBlockNode.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log(getNewBlock(block, editBlockNode));
  });
  const blockNode = document.querySelector(
    `.block[data-blockid="${block._id}"]`
  );
  blockNode.parentNode.replaceChild(editBlockNode, blockNode);
}

function getNewBlock(block, node) {
  const inputNode = node.querySelector("input");
  const textareaNode = node.querySelector("textarea");
  const selectTypeNode = node.querySelector("select#type");
  const selectLangNode = node.querySelector("select#language");
  const newBlock = { ...block };
  newBlock.type = selectTypeNode.value;
  if (newBlock.type !== "subtitle") newBlock.text = textareaNode.value;
  else newBlock.text = inputNode.value;
  newBlock.language = " ";
  if (newBlock.type === "code") newBlock.language = selectLangNode.value;
  const output = separateLinksFromText(newBlock.text);
  newBlock.text = output.text;
  newBlock.links = output.links;
  return newBlock;
}

function separateLinksFromText(textInput) {
  const textPieces = textInput.split("](");
  const links = [];
  let position = 0;
  textPieces.forEach((piece, index) => {
    const previousPiece = textPieces[index - 1];
    if (previousPiece && previousPiece.indexOf("[") !== -1) {
      const pieces = previousPiece.split("[");
      textPieces[index - 1] = pieces[0];
      position += pieces[0].length;
      links.push({ description: pieces[1] });
    }
    if (piece.indexOf(")") !== -1) {
      const pieces = piece.split(")");
      const link = links.pop();
      if (link) {
        link.url = pieces[0];
        link.position = position;
        links.push(link);
        textPieces[index] = pieces[1];
      }
    }
  });
  return { links: links, text: textPieces.join("") };
}
