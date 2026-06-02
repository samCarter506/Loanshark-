import axios from "axios";

const api = axios.create({
//  baseURL: "https://localhost:4000/api",
  baseURL:"https://loanshark-phi.vercel.app/",
  withCredentials: true,
});

export default api;