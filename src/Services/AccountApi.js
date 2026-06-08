import api from "./api";

// ================================
// LOGIN
// ================================
export const LoginUser = async (user) => {

  const response = await api.post(
    "/auth/signin",
    user
  );
console.log(response.data)
  return response.data;
};

// ================================
// REGISTER
// ================================
export const Registration = async (user) => {

  const response = await api.post(
    "/auth/signup",
    user
  );

  return response.data;
};
// ================================
// UPDATE USER ROLE
// ================================
export const UpdateRoles = async (userId,role) => {

  const response = await api.put(
    `/auth/${userId}`,
    {
      role: role
    }
  );

  return response.data;
};

// ================================
// CHECK AUTH
// ================================
export const GetCurrentUser = async () => {

  const response = await api.get(
    "/auth/me"
  );
  console.log("here ",response)
  return response.data;
};

// ================================
// LOGOUT
// ================================
export const LogoutUser = async () => {

  const response = await api.post(
    "/auth/logout"
  );

  return response.data;
};