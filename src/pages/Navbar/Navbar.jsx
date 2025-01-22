import React, { useState } from "react";
import { Box, Typography, IconButton, Drawer, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [open, setOpen] = useState(false); // State to manage drawer visibility

  const toggleDrawer = (open) => {
    setOpen(open);
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
        padding: "0.5rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "linear-gradient(90deg, #6a11cb, #2575fc)",
        color: "#fff",
      }}
    >
      {/* Hamburger Icon for Mobile - Positioned Left of Welcome User */}
      <IconButton
        sx={{ display: { xs: "block", sm: "none" }, marginRight: "1rem" }}
        onClick={() => toggleDrawer(true)}
      >
        <MenuIcon sx={{ color: "#fff" }} />
      </IconButton>

      {/* Welcome User Text */}
      <Typography variant="h6" sx={{ fontWeight: "bold", cursor: "pointer" }}>
        Welcome User
      </Typography>

      {/* Login and Signup Links for Desktop */}
      <Box sx={{ display: { xs: "none", sm: "flex" }, gap: "1rem" }}>
        <Link
          to="/login"
          style={{
            color: "#fff",
            textDecoration: "none",
            padding: "0.5rem 1rem",
            border: "1px solid #fff",
            borderRadius: "5px",
            textAlign: "center",
            textTransform: "none",
          }}
        >
          Login
        </Link>
        <Link
          to="/signup"
          style={{
            color: "#fff",
            backgroundColor: "#ff7eb3",
            textDecoration: "none",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            textAlign: "center",
            textTransform: "none",
          }}
        >
          Sign Up
        </Link>
      </Box>

      {/* Side Drawer for Mobile */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => toggleDrawer(false)}
        sx={{
          display: { xs: "block", sm: "none" },
        }}
      >
        <Box
          sx={{
            width: 250,
            height: "100%",
            backgroundColor: "#6a11cb",
            color: "#fff",
            padding: "1rem",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>
            Navigation
          </Typography>
          <Divider sx={{ backgroundColor: "#fff", marginBottom: "1rem" }} />
          <Link
            to="/login"
            style={{
              color: "#fff",
              textDecoration: "none",
              marginBottom: "1rem",
              display: "block",
            }}
          >
            Login
          </Link>
          <Link
            to="/signup"
            style={{
              color: "#fff",
              textDecoration: "none",
              marginBottom: "1rem",
              display: "block",
            }}
          >
            Sign Up
          </Link>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Navbar;
