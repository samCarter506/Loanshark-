import axios from "axios";

const api = axios.create({
  //api
  baseURL:"https://loansharkapi.onrender.com/api",
  //baseURL:"https://localhost:4000/api",

  withCredentials: true,
});

export default api;