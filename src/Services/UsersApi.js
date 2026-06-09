import api from "./api";

export const getUsers = async () => {
  const response = await api.get("/User");
  return response.data;
};

export const getUser = async (id) => {
  const response = await api.get(`/User/${id}`);
  return response.data;
};

export const createUser = async (user) => {
  const response = await api.post("/User", user);
  return response.data;
};

export const UpdateUser = async (user) => {
  const response = await api.put("/User", user);
  return response.data;
};

export const Profile = async () => {
  const response = await api.get("/User/profile");
  return response.data;
};