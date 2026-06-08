import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import api from '../Services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getCurrentUser = async () => {
      try {

        const response =
          await api.get("/auth/me", {
            withCredentials: true
          });
        console.log("==============")
        console.log(response.data);

        setUser(response.data);

      } catch (error) {

        console.error(error);

        setUser(null);

      } finally {

        setLoading(false);

      }
    };

    getCurrentUser();

  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}