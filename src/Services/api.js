import axios from "axios";

const api = axios.create({
//  baseURL: "https://localhost:4000/api",
  baseURL:"https://loansharkapi-1.onrender.com",
  withCredentials: true,
});

export default api;