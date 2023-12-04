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

export function animate(element, first, last) {
  // Invert: determine the delta between the
  // first and last bounds to invert the element
  const deltaX = first.left - last.left;
  const deltaY = first.top - last.top;
  const deltaW = first.width / last.width;
  const deltaH = first.height / last.height;

  // Play: animate the final element from its first bounds
  // to its last bounds (which is no transform)
  element.animate(
    [
      {
        transformOrigin: "top left",
        transform: `
    translate(${deltaX}px, ${deltaY}px)
    scale(${deltaW}, ${deltaH})
  `,
      },
      {
        transformOrigin: "top left",
        transform: "none",
      },
    ],
    {
      duration: 900,
      easing: "ease-in-out",
      fill: "both",
    }
  );
}

export function insertErrorMessages(node, errors) {
  if (!errors || errors.length === 0) return;
  const errorNodes = errors.map((error) => {
    const errorNode = importTemp(14);
    errorNode.textContent = error.msg;
    return errorNode;
  });
  const errorContainer = node.querySelector(".errors");
  errorNodes.forEach((errorNode) => errorContainer.appendChild(errorNode));
}
