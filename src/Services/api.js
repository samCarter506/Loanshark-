import axios from "axios";

const api = axios.create({
  //api
  baseURL:"https://loansharkapi.onrender.com/api",
  withCredentials: true,
});

export default api;