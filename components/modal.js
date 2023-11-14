import { importTemp } from "../helper.js";

let postID = "";

export function initModal({ variant, header, footer, onDelete, onCancel }) {
  const modalNode = document.querySelector(".modal");
  const cardNode = importTemp(6);
  if (variant) cardNode.classList.add(variant);
  const oldCard = modalNode.querySelector(".card");
  const cardBody = importTemp(17);
  const deleteButton = cardBody.querySelector(".delete");
  deleteButton.addEventListener("click", function () {
    onDelete(postID);
  });
  const cancelButton = cardBody.querySelector(".cancel");
  cancelButton.addEventListener("click", () => onCancel());
  const headerNode = cardNode.querySelector(".head .left");
  headerNode.textContent = header;
  const footerNode = cardNode.querySelector(".footer .left");
  footerNode.textContent = footer;
  const oldBody = cardNode.querySelector(".body");
  cardNode.replaceChild(cardBody, oldBody);
  modalNode.replaceChild(cardNode, oldCard);
}

export function showModal(postToDelete = "") {
  postID = postToDelete;
  const modalNode = document.querySelector(".modal");
  modalNode.classList.add("show");
}

export function closeModal() {
  const modalNode = document.querySelector(".modal");
  modalNode.classList.remove("show");
}

export function showErrorMsg(errorMsg) {
  const cardBody = document.querySelector(".modal .card .body");
  const msgNode = importTemp(14); //Error Message
  msgNode.textContent = errorMsg;
  const pNode = cardBody.querySelector("p");
  cardBody.replaceChild(msgNode, pNode);
}
