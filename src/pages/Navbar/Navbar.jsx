import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Link, IconButton, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const links = (
    <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
      <Link href="#features" underline="hover" sx={{ color: "#fff", fontWeight: 500 }}>
        Features
      </Link>
      <Link href="#testimonials" underline="hover" sx={{ color: "#fff", fontWeight: 500 }}>
        Testimonials
      </Link>
      <Link href="#highlights" underline="hover" sx={{ color: "#fff", fontWeight: 500 }}>
        Highlights
      </Link>
      <Link href="#pricing" underline="hover" sx={{ color: "#fff", fontWeight: 500 }}>
        Pricing
      </Link>
      <Link href="#faq" underline="hover" sx={{ color: "#fff", fontWeight: 500 }}>
        FAQ
      </Link>
      <Link href="#blog" underline="hover" sx={{ color: "#fff", fontWeight: 500 }}>
        Blog
      </Link>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#121212",
        boxShadow: "white",
        width: "50%",
        margin: "20px auto",
        borderRadius: "10px",
        paddingX: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left Section (Logo) */}
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold", color: "#fff" }}>
          Welcome User
        </Typography>

        {/* Hamburger Icon */}
        <IconButton sx={{ display: { xs: "block", md: "none" } }} onClick={toggleDrawer}>
          <MenuIcon sx={{ color: "#fff" }} />
        </IconButton>

        {/* Drawer for Mobile View */}
        <Drawer
          anchor="right"
          open={openDrawer}
          onClose={toggleDrawer}
          sx={{ width: 250 }}
        >
          <Box sx={{ width: 250, padding: 2 }}>
            {links}
          </Box>
        </Drawer>

        {/* Middle Section (Menu Links) */}
        {links}

        {/* Right Section (Buttons) */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            href="#signin"
            variant="outlined"
            sx={{
              color: "#fff",
              borderColor: "#fff",
              textTransform: "none",
              "&:hover": {
                borderColor: "#90caf9",
                color: "#90caf9",
              },
            }}
          >
            Sign In
          </Button>
          <Button
            href="#signup"
            variant="contained"
            sx={{
              backgroundColor: "#90caf9",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#64b5f6",
              },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
