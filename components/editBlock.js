import { importTemp } from "../helper.js";

export function initEditBlock(block) {
  const editBlockNode = importTemp(20);
  const blockNode = document.querySelector(
    `.block[data-blockid="${block._id}"]`
  );
  blockNode.parentNode.replaceChild(editBlockNode, blockNode);
}
