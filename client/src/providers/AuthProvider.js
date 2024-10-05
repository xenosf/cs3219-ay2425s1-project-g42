import { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { AuthContext, useAuth } from "../hooks/useAuth";

function AuthProvider({ children }) {
  const auth = useAuth()

  const [isAuthenticated, setIsAuthenticated] = useState(auth.isAuthenticated);
  const [accessToken, setAccessToken] = useState(auth.accessToken);

  const checkIsAuthenticated = async () => {
    try {
      const token = auth.getAccessToken();

      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      console.log("calling api")
      const response = await axios.get(
        "http://localhost:3001/auth/verify-token",
        {
          headers: {
            Authorization: `Bearer ` + token,
          },
        }
      );
      if (response.status === 200) {
        setIsAuthenticated(true);
        setAccessToken(token);
      }
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 500)
      ) {
        setIsAuthenticated(false);
      }
    }
  };

  const handleLogout = () => {
    const cookies = new Cookies();
    cookies.remove("accessToken", { path: "/" });
    setIsAuthenticated(false);
    setAccessToken("");
  };

  // NOTE: currently need manual check.
  // Auto check might have async issues
  //useEffect(() => {
  //  checkIsAuthenticated();
  //}, []);

  const value = {
    isAuthenticated: isAuthenticated,
    accessToken: accessToken,
    checkIsAuthenticated: checkIsAuthenticated,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
