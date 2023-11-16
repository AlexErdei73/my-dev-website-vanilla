import { importTemp } from "../helper.js";

let postID = "";

export function initModal({
  variant,
  header,
  footer,
  onDelete,
  onClose,
  isErrorDlg,
}) {
  const bodyNode = document.querySelector("body");
  const cardNode = importTemp(6);
  cardNode.classList.add("modal");
  if (variant) cardNode.classList.add(variant);
  const oldCard = bodyNode.querySelector(".modal");
  let cardBody;
  if (!isErrorDlg) {
    cardBody = importTemp(17);
    const deleteButton = cardBody.querySelector(".delete");
    deleteButton.addEventListener("click", function () {
      onDelete(postID);
    });
  } else {
    cardBody = importTemp(18);
  }
  const closeButton = cardBody.querySelector(".close");
  closeButton.addEventListener("click", () => onClose());
  const headerNode = cardNode.querySelector(".head .left");
  headerNode.textContent = header;
  const footerNode = cardNode.querySelector(".footer .left");
  footerNode.textContent = footer;
  const oldBody = cardNode.querySelector(".body");
  cardNode.replaceChild(cardBody, oldBody);
  bodyNode.replaceChild(cardNode, oldCard);
}

export function showModal(postToDelete = "") {
  postID = postToDelete;
  const cardNode = document.querySelector("dialog.modal");
  cardNode.showModal();
}

export function closeModal() {
  const cardNode = document.querySelector("dialog.modal");
  cardNode.close();
}

export function showErrorMsg(errorMsg) {
  const cardBody = document.querySelector(".modal .body");
  const msgNode = importTemp(14); //Error Message
  msgNode.textContent = errorMsg;
  const pNode = cardBody.querySelector("p");
  cardBody.replaceChild(msgNode, pNode);
}
