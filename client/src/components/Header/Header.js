import { Button, CircularProgress  } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style/header.css";
import { useAuth } from "../../hooks/useAuth";

function Header() {
  const { isAuthenticated, checkIsAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticate = async () => {
      await checkIsAuthenticated();
      setLoading(false); 
    };
    authenticate();
  }, []);

  return (
    <div id="landing-header">
      <h1>PeerPrep</h1>
      <div id="button-header">
        {loading ? (
          <CircularProgress />
        ) : isAuthenticated ? (
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
