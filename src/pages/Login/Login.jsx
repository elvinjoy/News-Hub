import React from "react";
import { Box, Container, TextField, Button, Typography, Link, styled } from "@mui/material";

const LoginContainer = styled(Container)`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #F5F5F5;  // Light Gray background for softer feel
    color: #333;  // Dark text for better contrast
`;

const LoginBox = styled(Box)`
    background-color: #FFFFFF;  // White box for form
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
        color: #333;  // Dark text color for readability
        & fieldset {
            border-color: rgba(0, 0, 0, 0.5);  // Subtle border color
        }
        &:hover fieldset {
            border-color: rgba(0, 0, 0, 0.8);
        }
        &.Mui-focused fieldset {
            border-color: #1976d2;  // Blue on focus
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
    return (
        <LoginContainer maxWidth={false} disableGutters>
            <LoginBox>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Login
                </Typography>
                <LoginForm component="form" noValidate>
                    <StyledTextField
                        fullWidth
                        label="Email"
                        type="email"
                        variant="outlined"
                    />
                    <StyledTextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                    />
                    <LoginButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Login
                    </LoginButton>
                </LoginForm>
                <FooterText variant="body2" align="center">
                    Don't have an account?{" "}
                    <Link href="/signup">
                        Sign Up
                    </Link>
                </FooterText>
            </LoginBox>
        </LoginContainer>
    );
};

export default Login;
