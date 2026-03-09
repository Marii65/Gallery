import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLogged = !!localStorage.getItem("token");

  if (!isLogged) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
