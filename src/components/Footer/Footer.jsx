import React from "react";
import { Box, Typography, Grid, TextField, Button, Link, IconButton } from "@mui/material";
import { GitHub, Twitter, LinkedIn, Facebook, Instagram } from "@mui/icons-material";

const Footer = () => {
  // Define social icons with labels
  const socialIcons = [
    { Icon: GitHub, label: "GitHub" },
    { Icon: Twitter, label: "Twitter" },
    { Icon: LinkedIn, label: "LinkedIn" },
    { Icon: Facebook, label: "Facebook" },
    { Icon: Instagram, label: "Instagram" },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#F5F5F5",  // Match homepage background color
        color: "#333",  // Dark text color for better contrast
        padding: "40px 20px",
        borderTop: "1px solid #ccc",  // Subtle border to match the design
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {/* Newsletter Section */}
        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              <span style={{ color: "#3f51b5" }}>News Hub</span>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Join the newsletter
            </Typography>
            <Typography variant="body2" gutterBottom>
              Subscribe for weekly updates. No spams ever!
            </Typography>
            <Box
              component="form"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                justifyContent: "center",
                mt: 2,
              }}
            >
              <TextField
                variant="outlined"
                placeholder="Your email address"
                InputProps={{
                  style: { color: "#333", backgroundColor: "#fff", borderRadius: "4px" },  // Dark input text
                }}
                sx={{
                  flexGrow: 1,
                  maxWidth: "300px",
                }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#3f51b5",  // Keep consistent with homepage button
                  "&:hover": { backgroundColor: "#2c387e" },
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* Links Section */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={6} sm={3}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                Product
              </Typography>
              <Link href="https://github.com/elvinjoy" underline="hover" color="inherit" display="block">
                Features
              </Link>
              <Link href="https://github.com/elvinjoy" underline="hover" color="inherit" display="block">
                Testimonials
              </Link>
              <Link href="https://github.com/elvinjoy" underline="hover" color="inherit" display="block">
                Highlights
              </Link>
              <Link href="https://github.com/elvinjoy" underline="hover" color="inherit" display="block">
                Pricing
              </Link>
              <Link href="https://github.com/elvinjoy" underline="hover" color="inherit" display="block">
                FAQs
              </Link>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                Company
              </Typography>
              <Link href="https://github.com/elvinjoy" underline="hover" color="inherit" display="block">
                About us
              </Link>
              <Link href="https://github.com/elvinjoy" underline="hover" color="inherit" display="block">
                Careers
              </Link>
              <Link href="https://github.com/elvinjoy" underline="hover" color="inherit" display="block">
                Press
              </Link>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                Legal
              </Typography>
              <Link href="https://github.com/elvinjoy" underline="hover" color="inherit" display="block">
                Terms
              </Link>
              <Link href="https://github.com/elvinjoy" underline="hover" color="inherit" display="block">
                Privacy
              </Link>
              <Link href="https://github.com/elvinjoy" underline="hover" color="inherit" display="block">
                Contact
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Bottom Section */}
      <Box
        sx={{
          mt: 4,
          pt: 2,
          borderTop: "1px solid #ccc",  // Subtle border for separation
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },  // Stack vertically on small screens
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: { xs: "center", sm: "left" }, // Center text on small screens
        }}
      >
        <Typography variant="body2" sx={{ color: "#aaa" }}>
          Privacy Policy • Terms of Service
        </Typography>
        <Typography variant="body2" sx={{ color: "#aaa" }}>
          Copyright © News Blog 2025
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          {socialIcons.map(({ Icon, label }, index) => (
            <IconButton key={index} aria-label={label.toLowerCase()} color="inherit">
              <Icon />
            </IconButton>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
