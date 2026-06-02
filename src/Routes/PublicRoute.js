import { Navigate } from "react-router-dom";
import { useAuth } from "../Hocks/AuthContext";

export default function PublicRoute({ children }) {

  const { user } = useAuth();

  // IF LOGGED IN
  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}