export function importTemp(templateIndex) {
  const temps = document.querySelectorAll("template");
  const temp = temps[templateIndex];
  const tempContent = temp.content.childNodes[1];
  const contentNode = document.importNode(tempContent, true);
  return contentNode;
}

export function swapElements(obj1, obj2) {
  // create marker element and insert it where obj1 is
  var temp = document.createElement("div");
  obj1.parentNode.insertBefore(temp, obj1);

  // move obj1 to right before obj2
  obj2.parentNode.insertBefore(obj1, obj2);

  // move obj2 to right before where obj1 used to be
  temp.parentNode.insertBefore(obj2, temp);

  // remove temporary marker node
  temp.parentNode.removeChild(temp);
}
