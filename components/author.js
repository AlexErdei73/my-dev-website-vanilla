import { importTemp } from "../helper.js";

export function initAuthor(author) {
  const { username, name, jobTitle, bio } = author;
  const authorNode = importTemp(11);
  const nameNode = authorNode.querySelector(".name");
  const jobNode = authorNode.querySelector(".job");
  const bioNode = authorNode.querySelector(".bio");
  if (!name) nameNode.textContent = username;
  else nameNode.textContent = name;
  if (jobTitle) jobNode.textContent = jobTitle;
  if (bio) bioNode.textContent = bio;
  return authorNode;
}
