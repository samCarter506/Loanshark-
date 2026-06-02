import { Navigate } from "react-router-dom";
import { useAuth } from "../Hocks/AuthContext";

export default function RoleRoute({
  children,
  allowedRoles
}) {

  const { user } = useAuth();

  // NOT LOGGED IN
  if (!user) {
    return <Navigate to="/login" />;
  }

  // ROLE CHECK
  if (
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/" />;
  }

  return children;
}