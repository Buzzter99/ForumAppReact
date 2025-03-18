const apiBaseUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const postService = {
  async getAllPosts() {
    return fetch(`${apiBaseUrl}/forum/all`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw error;
      });
  },

  async deletePostById(postId) {
    return fetch(`${apiBaseUrl}/forum/all/${postId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw error;
      });
  },
  async getSinglePost(postId) {
    return fetch(`${apiBaseUrl}/forum/${postId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw error;
      });
  },
  async editPostById({ postId, topic, description, additionalInfo }) {
    return fetch(`${apiBaseUrl}/forum/edit/${postId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
      body: JSON.stringify({
        topic: topic,
        description: description,
        additionalInfo: additionalInfo,
      }),
    });
  },
  async addPost({ topic, description, additionalInfo }) {
    return fetch(`${apiBaseUrl}/forum/add`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
      body: JSON.stringify({
        topic: topic,
        description: description,
        additionalInfo: additionalInfo,
      }),
    });
  },
};
export default postService;
