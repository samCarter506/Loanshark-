import api from './api'

export const getUsers = async () => {
    const response = await api.get("/User",
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
};
export const getUser = async (id) => {
    const response = await api.get("/User",id,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
};

export const createUser = async(user)=>{
    const response = await api.post("/User",user,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    return response.data;
}
export const UpdateUser = async(user)=>{
    const response = await api.put("/User",user,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    return response.data;
}

export const Profile=async (user)=>
{
    const record = await api.get("/profile",user,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    return record.data;
}