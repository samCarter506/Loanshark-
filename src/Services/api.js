import axios from "axios";

const api = axios.create({
  //
  baseURL:"https://loanshark-phi.vercel.app/api",
  withCredentials: true,
});

export default api;