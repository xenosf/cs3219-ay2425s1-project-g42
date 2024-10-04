import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "./style/header.css";

function Header() {
  const [authenticated, setAuthenticated] = useState(false);

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
      if (response.status === 200) {
        setAuthenticated(true);
      }
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 500)
      ) {
        setAuthenticated(false);
      }
    }
  };

  // Run authentication check when component mounts
  useEffect(() => {
    isAuthenticated();
  });

  return (
    <div id="landing-header">
      <h1>PeerPrep</h1>
      <div id="button-header">
        {authenticated ? (
          <Link to="/logout">
            <Button variant="contained">Logout</Button>
          </Link>
        ) : (
          <Link to="/login">
            <Button variant="contained">Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
