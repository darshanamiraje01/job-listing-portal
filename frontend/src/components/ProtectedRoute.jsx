import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("token"); 
  // or use context later

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
