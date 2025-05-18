import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

const urlFiles = import.meta.env.VITE_API_URL

export default api;
export { urlFiles };