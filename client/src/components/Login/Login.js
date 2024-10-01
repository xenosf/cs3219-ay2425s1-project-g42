import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ReactComponent as Logo } from "./assets/logo.svg";
import { ReactComponent as Background } from "./assets/background.svg";
import "./style/login.css";
import { red } from "@mui/material/colors";

function Login() {
  return (
    <Container id="login-container">
      <Box id="login-box">
        <Box sx={{ fontSize: "2rem", fontWeight: "bold", fontWeight: 500 }}>
          LOGIN
        </Box>
        <TextField label="Email" className="login-input" />
        <TextField label="Password" className="login-input" />
        <Box id="login-footer">
          <Link component={RouterLink} to="/">
            Forgot your password?
          </Link>
          <RouterLink>
            <Button variant="contained" id="login-button">
              Login
            </Button>
          </RouterLink>
          <Typography variant="body2" id="login-to-register">
            Don't have an account?
            <Typography variant="body2">
              Sign up{" "}
              <Link component={RouterLink} to="/">
                here
              </Link>
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
