import { Navigate } from "react-router-dom";
import AuthStore from "../Store/Auth.store";

const ProtectedRoute = ({ children }) => {
  const {isAuthenticated} = AuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
