import { importTemp } from "../helper.js";
import { initBlock } from "./block.js";
import { prism } from "../prism.js";

export function initEditBlock(block) {
  const editBlockNode = importTemp(20);
  const cancelButton = editBlockNode.querySelector(".buttons .cancel");
  if (block.type !== "subtitle") {
    const inputNode = editBlockNode.querySelector(".input-container input");
    const textareaNode = editBlockNode.querySelector(
      ".input-container textarea"
    );
    inputNode.classList.toggle("hidden");
    textareaNode.classList.toggle("hidden");
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
