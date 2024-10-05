import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const cookies = new Cookies();
    cookies.remove("accessToken", { path: "/" });
    navigate("/login", { replace: true });
    window.location.reload();
  }, [navigate]);

  return;
}

export default Logout;
