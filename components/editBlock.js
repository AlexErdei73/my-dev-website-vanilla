import { importTemp } from "../helper.js";
import { initBlock } from "./block.js";

export function initEditBlock(block) {
  const editBlockNode = importTemp(20);
  const cancelButton = editBlockNode.querySelector(".buttons .cancel");
  cancelButton.addEventListener("click", function () {
    const blockNode = initBlock(block, true);
    editBlockNode.parentNode.replaceChild(blockNode, editBlockNode);
  });
  const blockNode = document.querySelector(
    `.block[data-blockid="${block._id}"]`
  );
  blockNode.parentNode.replaceChild(editBlockNode, blockNode);
}
