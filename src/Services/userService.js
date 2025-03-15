const apiBaseUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;
async function isAuthenticated() {
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
}

async function logout() {
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
}

async function getCurrentUsers() {
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
}

async function login(username, password) {
  return fetch(`${apiBaseUrl}/user/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
    },
    body: JSON.stringify({
      emailOrUsername: username,
      password: password
    })
  })
}

async function register(email,username,password,repeatPassword) {
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
      repeatPassword: repeatPassword
    })
  })
}

export { isAuthenticated, logout, getCurrentUsers, login, register };
