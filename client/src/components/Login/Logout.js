import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Logout() {
  const navigate = useNavigate();
  const {logout} = useAuth()

  useEffect(() => {
    console.log('re-render')
    logout()
    navigate("/login", { replace: true });
  }, [navigate, logout]);

  return null;
}

export default Logout;
