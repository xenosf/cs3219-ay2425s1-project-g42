import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function Logout() {
  useEffect(() => {
    const cookies = new Cookies();
    cookies.remove("accessToken", { path: "/" });
    window.location.reload();
  }, []);

  return <Navigate to="/login" replace />;
}

export default Logout;
