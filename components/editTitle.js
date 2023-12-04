import { importTemp, insertErrorMessages } from "../helper.js";
import { submitTitle } from "../index.js";

export function initEditTitle(post, errors) {
  const editTitleNode = importTemp(22);
  const inputNode = editTitleNode.querySelector("input#title");
  inputNode.value = post.title;
  const titleNode = document.querySelector(".post .post-title");
  if (errors && errors.length > 0) insertErrorMessages(editTitleNode, errors);
  const cancelButton = editTitleNode.querySelector(".cancel");
  cancelButton.addEventListener("click", function () {
    editTitleNode.parentNode.replaceChild(titleNode, editTitleNode);
  });
  editTitleNode.addEventListener("submit", function (event) {
    event.preventDefault();
    submitTitle({
      ...post,
      title: inputNode.value,
    });
  });
  titleNode.parentNode.replaceChild(editTitleNode, titleNode);
}
