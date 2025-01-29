import React, { useState } from "react";
import { Box, Container, TextField, Button, Typography, Link, styled } from "@mui/material";
import axios from "axios";
import { DEV_URL } from "../../constants/Constants"; // Import DEV_URL from Constants
import { toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useDispatch } from "react-redux"; // Import useDispatch from react-redux
import { setUser } from "../../Slices/userSlice"; // Import setUser action

const LoginContainer = styled(Container)`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  color: #333;
`;

const LoginBox = styled(Box)`
  background-color: #ffffff;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const LoginForm = styled(Box)`
  margin-top: 16px;
`;

const StyledTextField = styled(TextField)`
  margin-top: 16px;

  .MuiOutlinedInput-root {
    color: #333;
    & fieldset {
      border-color: rgba(0, 0, 0, 0.5);
    }
    &:hover fieldset {
      border-color: rgba(0, 0, 0, 0.8);
    }
    &.Mui-focused fieldset {
      border-color: #1976d2;
    }
  }

  .MuiInputLabel-root {
    color: rgba(0, 0, 0, 0.7);
  }
`;

const LoginButton = styled(Button)`
  margin-top: 24px;
  margin-bottom: 16px;
  background-color: #1976d2;

  &:hover {
    background-color: #1565c0;
  }
`;

const FooterText = styled(Typography)`
  margin-top: 16px;
  color: #aaa;

  a {
    color: #1976d2;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!email || !password) {
      setError("Both fields must be filled!");
      toast.error("Both fields must be filled!");
      return;
    }

    try {
      const response = await axios.post(`${DEV_URL}/users/login`, {
        email,
        password,
      });

      const { token, user } = response.data;

      // Dispatch user data to Redux store
      dispatch(setUser({ user, token }));

      // Store token and user details in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setError(""); // Clear any previous error
      toast.success("Logged in successfully!");

      // Redirect to home or dashboard
      navigate("/");
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || "Error during login";
        setError(errorMessage);
        toast.error(errorMessage);
      } else {
        setError("An error occurred while submitting the form");
        toast.error("An error occurred while submitting the form");
      }
    }
  };

  return (
    <LoginContainer maxWidth={false} disableGutters>
      <LoginBox>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
        </Typography>
        <LoginForm component="form" onSubmit={handleSubmit} noValidate>
          <StyledTextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledTextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Typography variant="body2" color="error" align="center" sx={{ marginTop: 1 }}>
              {error}
            </Typography>
          )}

          <LoginButton type="submit" fullWidth variant="contained" color="primary">
            Login
          </LoginButton>
        </LoginForm>
        <FooterText variant="body2" align="center">
          Don't have an account? <Link href="/signup">Sign Up</Link>
        </FooterText>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;
