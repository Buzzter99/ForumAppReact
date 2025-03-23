const apiBaseUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const userService = {
  async isAuthenticated() {
    return fetch(`${apiBaseUrl}/user/isAuthenticated`, {
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
  async logout() {
    return fetch(`${apiBaseUrl}/user/logout`, {
      method: "POST",
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
  async getCurrentUsers() {
    return fetch(`${apiBaseUrl}/user/all`, {
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
  async login(username, password) {
    return fetch(`${apiBaseUrl}/user/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
      body: JSON.stringify({
        emailOrUsername: username,
        password: password,
      }),
    });
  },
  async register(email, username, password, repeatPassword) {
    return fetch(`${apiBaseUrl}/user/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
        repeatPassword: repeatPassword,
      }),
    });
  },
  async getCommentById(commentId) {
    return fetch(`${apiBaseUrl}/user/edit/comment/${commentId}`, {
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
  async editCommentById(commentId, msg) {
    return fetch(`${apiBaseUrl}/user/edit/comment/${commentId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
      body: JSON.stringify({ msg }),
    });
  },
  async getLoggedInUser() {
    return fetch(`${apiBaseUrl}/user/info`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
    });
  },
  async updateAccount({
    username,
    email,
    oldPassword,
    newPassword,
    confirmNewPassword,
  }) {
    return fetch(`${apiBaseUrl}/user/update`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
      body: JSON.stringify({
        username: username,
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword,
      }),
    });
  },
};
export default userService;
