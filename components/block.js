import { importTemp } from "../helper.js";

export function initBlock(block) {
	let blockNode;
	switch (block.type) {
		case "paragraph":
			blockNode = importTemp(8);
			blockNode.textContent = block.text;
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
