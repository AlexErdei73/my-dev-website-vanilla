import { importTemp } from "../helper.js";

export function initModal({ variant = "", header, footer, message = "" }) {
  const modalNode = document.querySelector(".modal");
  const cardNode = importTemp(6);
  if (variant) cardNode.classList.add(variant);
  const oldCard = modalNode.querySelector(".card");
  const cardBody = importTemp(17);
  const headerNode = cardNode.querySelector(".head .left");
  headerNode.textContent = header;
  const footerNode = cardNode.querySelector(".footer .left");
  footerNode.textContent = footer;
  const oldBody = cardNode.querySelector(".body");
  cardNode.replaceChild(cardBody, oldBody);
  modalNode.replaceChild(cardNode, oldCard);
}

export function showModal() {
  const modalNode = document.querySelector(".modal");
  modalNode.classList.add("show");
}

export function closeModal() {
  const modalNode = document.querySelector(".modal");
  modalNode.classList.remove("show");
}
