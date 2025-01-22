import React from "react";
import { Box, Container, TextField, Button, Typography, Link, styled } from "@mui/material";

const SignUpContainer = styled(Container)`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #F5F5F5;  // Light Gray background for a clean look
    color: #333;  // Dark text for better contrast
`;

const SignUpBox = styled(Box)`
    background-color: #FFFFFF; // White box for form
    padding: 32px;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
`;

const SignUpForm = styled(Box)`
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

const SignUpButton = styled(Button)`
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

const SignUp = () => {
    return (
        <SignUpContainer maxWidth={false} disableGutters>
            <SignUpBox>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Sign Up
                </Typography>
                <SignUpForm component="form" noValidate>
                    <StyledTextField
                        fullWidth
                        label="Full Name"
                        variant="outlined"
                    />
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
                    <SignUpButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Sign Up
                    </SignUpButton>
                </SignUpForm>
                <FooterText variant="body2" align="center">
                    Already have an account?{" "}
                    <Link href="/login">
                        Login
                    </Link>
                </FooterText>
            </SignUpBox>
        </SignUpContainer>
    );
};

export default SignUp;
