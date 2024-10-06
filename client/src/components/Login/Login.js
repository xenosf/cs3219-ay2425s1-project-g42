import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import axios from "axios";
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { ReactComponent as Background } from "../../assets/background.svg";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import "./style/login.css";
import { SVC_ENDPOINTS } from "../../consts/api";

function Login() {
  const [emailError, setEmailError] = useState(false);
  const [invalidEmailError, setInvalidEmailError] = useState(false);
  const [missingFields, setMissingFields] = useState(false);
  const [databaseError, setDatabaseError] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const handleLogin = async () => {
    if (!email.includes("@")) {
      setEmailError(true);
    } else {
      setEmailError(false);
      const body = {
        email: email,
        password: password,
      };
      try {
        const response = await axios.post(
          `${SVC_ENDPOINTS.user}/auth/login`,
          body
        );
        if (response.status === 200) {
          const cookies = new Cookies();
          cookies.set("accessToken", response.data.data.accessToken, {
            path: "/",
          });
          navigate("/", { replace: true });
          window.location.reload();
        }
      } catch (error) {
        setMissingFields(false);
        setInvalidEmailError(false);
        setDatabaseError(false);
        if (error.status === 400) {
          setMissingFields(true);
        }
        if (error.status === 401) {
          setInvalidEmailError(true);
        }
        if (error.status === 500) {
          setDatabaseError(true);
        }
      }
    }
  };
  return (
    <div>
      {invalidEmailError && (
        <Alert severity="error">Incorrect email or password!</Alert>
      )}
      {missingFields && <Alert severity="error">Missing fields!</Alert>}
      {databaseError && <Alert severity="error">DatabaseError!</Alert>}
      <Container id="login-container">
        <Box id="login-box">
          <Box sx={{ fontSize: "2rem", fontWeight: "bold" }}>LOGIN</Box>
          <TextField
            label="Email"
            required
            error={emailError}
            helperText={emailError ? "Please enter a valid email" : ""}
            className="login-input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            required
            className="login-input"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />
          <Box id="login-footer">
            <RouterLink>
              <Button
                variant="contained"
                id="login-button"
                onClick={handleLogin}
              >
                Login
              </Button>
            </RouterLink>
            <Box id="login-to-register">
              <Typography variant="body2">Don't have an account?</Typography>
              <Typography variant="body2">
                Sign up{" "}
                <Link component={RouterLink} to="/signup">
                  here
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            position: "relative",
          }}
        >
          <Box
            sx={{
              zIndex: 1,
            }}
          >
            <Background />
          </Box>

          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 2,
            }}
          >
            <Logo />
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Login;
