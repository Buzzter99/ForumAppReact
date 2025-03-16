const apiBaseUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const storageService = {
  async getUrlForContent(file) {
    return fetch(`${apiBaseUrl}/storage/getContentUrl?fullPath=${file}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      }
    });
  },
};

export default storageService;
