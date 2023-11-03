export function importTemp(templateIndex) {
  const temps = document.querySelectorAll("template");
  const temp = temps[templateIndex];
  const tempContent = temp.content.childNodes[1];
  const contentNode = document.importNode(tempContent, true);
  return contentNode;
}
