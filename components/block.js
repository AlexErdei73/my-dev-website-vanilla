import { importTemp } from "../helper.js";

function addLinks(text, links) {
  let shift = 0; //Shift the position from the original with the combined lengths of the insertations
  links
    .map((link) => {
      return {
        text: `<a href="${link.url}">${link.description}</a>`,
        pos: link.position,
      };
    })
    .filter((link) => link.pos >= 0) //Filter out links with incorrect position to avoid unwanted behaviour
    .sort((link1, link2) => link1.pos - link2.pos) //Sort links to increasing position to avoid unwanted behaviour
    .forEach((link) => {
      //Insert links in text
      const position = link.pos + shift;
      const firstTextPart = text.slice(0, position) + " ";
      const lastTextPart = " " + text.slice(position, text.length + 1);
      text = firstTextPart + link.text + lastTextPart;
      shift = shift + link.text.length + 2;
    });
  return text;
}

export function initBlock(block) {
  let blockNode;
  switch (block.type) {
    case "paragraph":
      blockNode = importTemp(8);
      blockNode.innerHTML = addLinks(block.text, block.links);
      break;
    case "subtitle":
      blockNode = importTemp(9);
      blockNode.textContent = block.text;
      break;
    case "code":
      blockNode = importTemp(10);
      const codeNode = blockNode.querySelector("code");
      codeNode.textContent = block.text;
      if (block.language !== " ")
        codeNode.classList.add(`language-${block.language}`);
      break;
  }
  return blockNode;
}
