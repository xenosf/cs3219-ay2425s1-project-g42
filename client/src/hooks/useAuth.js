import { createContext, useContext } from "react";
import Cookies from "universal-cookie";

export const AuthContext = createContext({
  isAuthenticated: false,
  checkIsAuthenticated: () => {},
  accessToken: "",
  getAccessToken: () => {
    return new Cookies().get("accessToken");
  }
});

export const useAuth = () => useContext(AuthContext);
