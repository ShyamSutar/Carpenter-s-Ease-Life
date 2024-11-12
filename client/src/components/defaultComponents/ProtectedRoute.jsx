import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const status = useSelector((state) => state.auth.status);
  return status==="true"?<Outlet/>:<Navigate to="/"/>
};

export default ProtectedRoute;
