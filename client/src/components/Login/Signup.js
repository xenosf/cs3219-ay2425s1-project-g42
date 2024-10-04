import {
    Box,
    Button,
    Container,
    TextField,
  } from "@mui/material";
  import { Link as RouterLink, useNavigate } from "react-router-dom";
  import { ReactComponent as Logo } from "../../assets/logo.svg";
  import { ReactComponent as Background } from "../../assets/background.svg";
  import "./style/login.css";
  import axios from "axios";
  import React, { useState} from "react";
  import Alert from '@mui/material/Alert';
  
  function Signup() {

    const [emailError, setEmailError] = useState(false);
    const [missingFields, setMissingFields] = useState(false);
    const [duplicateError, setDuplicateError] = useState(false);
    const [databaseError, setDatabaseError] = useState(false);
    
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();

    const handleSignup = async () => {
        if (!email.includes("@")) {
            setEmailError(true);
          } else {
            setEmailError(false);
  
      const body = {
        "username": username,
        "email": email,
        "password": password
      }
    
      try {
        const response = await axios.post(`http://localhost:3001/users`, body);

        if (response.status === 201) {
            navigate('/login');
        }
    
        
      } catch(error) {
        setMissingFields(false);
        setDuplicateError(false);
        setDatabaseError(false);
        if (error.status === 400) {
            setMissingFields(true);
        } else if (error.status === 409) {
            setDuplicateError(true);
        } else if (error.status === 500) {
            setDatabaseError(true);
        }
      }
    }

      
  
    }
    return (
        <div>
            {missingFields && <Alert severity="error">Missing fields!</Alert>}
            {duplicateError && <Alert severity="error">Duplicate username or email encountered!</Alert>}
            {databaseError && <Alert severity="error">Database or server error!</Alert>}
      <Container id="login-container">
        <Box id="login-box">
          <Box sx={{ fontSize: "2rem", fontWeight: 500 }} >
            SIGNUP
          </Box>
          <TextField label="Username" required className="login-input" onChange={(e) => setUsername(e.target.value)}/>
          <TextField label="Email" required error={emailError} helperText={emailError ? "Please enter a valid email" : ""} className="login-input" onChange={(e) => setEmail(e.target.value)}/>
          <TextField label="Password" type="password" required className="login-input" onChange={(e) => setPassword(e.target.value)}/>
          <Box id="login-footer">
            <RouterLink>
              <Button variant="contained" id="login-button" onClick = {handleSignup}>
                Signup
              </Button>
            </RouterLink>
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
  
  export default Signup;
  