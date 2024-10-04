import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/Login/Login";
import QuestionPage from "../components/QuestionPage/QuestionPage";
import Signup from "../components/Login/Signup";
import ProtectedRoute from "./ProtectedRoute";
import Cookies from "js-cookie";
import axios from "axios";
import Logout from "../components/Login/Logout";

// Function to get the access token from cookies
const getAccessToken = () => {
  return Cookies.get("accessToken");
};

// Function to check if the user is authenticated
const isAuthenticated = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3001/auth/verify-token",
      {
        headers: {
          Authorization: `Bearer ` + getAccessToken(),
        },
      }
    );
    console.log(response);
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    if (error.status === 401 || error.status === 500) {
      return false;
    }
  }

  return false;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },

  {
    element: <ProtectedRoute isAuthenticated={await isAuthenticated()} />,
    children: [
      {
        path: "/questionpage",
        element: <QuestionPage />,
      },
    ],
  },
]);
