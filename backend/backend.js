const BASE_URL = "https://blog-api.alexerdei.co.uk";

async function getJSON(response) {
  let json;
  if (response.status === 401) {
    json = { success: false, errors: [{ msg: "Unauthorized" }] };
  } else json = await response.json();
  return json;
}

export async function login(username, password) {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  const json = await response.json();
  return json;
}

export async function updatePost(post, token) {
  const response = await fetch(`${BASE_URL}/posts/${post._id}`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  });
  return await getJSON(response);
}

export async function updateBlock(block, token) {
  const response = await fetch(
    `${BASE_URL}/posts/${block.post}/blocks/${block._id}`,
    {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(block),
    }
  );
  return await getJSON(response);
}

export async function getPost(ID) {
  const response = await fetch(`${BASE_URL}/posts/${ID}`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  return json;
}

export async function createBlock(block, token) {
  const response = await fetch(`${BASE_URL}/posts/${block.post}/blocks`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(block),
  });
  return await getJSON(response);
}

export async function deleteBlock(block, token) {
  const response = await fetch(
    `${BASE_URL}/posts/${block.post}/blocks/${block._id}`,
    {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
  return await getJSON(response);
}

export async function getPosts() {
  const response = await fetch(`${BASE_URL}/posts`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  return json;
}

export async function postPosts(post, token) {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  });
  return await getJSON(response);
}

export async function deletePosts(post, token) {
  const response = await fetch(`${BASE_URL}/posts/${post._id}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return await getJSON(response);
}

export async function createUser(user) {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const json = await response.json();
  return json;
}

export async function updateUser(user, token) {
  const response = await fetch(`${BASE_URL}/users/${user._id}`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(user),
  });
  return await getJSON(response);
}

export async function updatePostLikes(postId, userId) {
  const response = await fetch(`${BASE_URL}/posts/${postId}/likes`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: userId }),
  });
  const json = await response.json();
  return json;
}
