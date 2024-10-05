import axios from "axios";
//import Cookies from "js-cookie";
import Cookies from "universal-cookie";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/Login/Login";
import Logout from "../components/Login/Logout";
import Signup from "../components/Login/Signup";
import QuestionPage from "../components/QuestionPage/QuestionPage";
import AuthRedirect from "./AuthRedirect";
import ProtectedRoute from "./ProtectedRoute";

// Function to get the access token from cookies
const getAccessToken = () => {
  const cookies = new Cookies()
  return cookies.get("accessToken");
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
    children: [
      {
        element: <ProtectedRoute isAuthenticated={await isAuthenticated()} />,
        children: [
          {
            index: true,
            element: <QuestionPage />,
          },
        ],
      },
    ],
  },
  {
    element: <AuthRedirect isAuthenticated={await isAuthenticated()} />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);
