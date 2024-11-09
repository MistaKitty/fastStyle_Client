// eslint-disable-next-line no-unused-vars
import React from "react";
import { AppBar, Toolbar, Box, Typography, IconButton } from "@mui/material";
import { Facebook, Instagram, WhatsApp } from "@mui/icons-material";
import XIcon from "@mui/icons-material/X";

export default function MobileFooter() {
  return (
    <AppBar
      position="fixed"
      sx={{
        top: "auto",
        bottom: 0,
        width: "100%",
        py: 2,
        backgroundColor: "primary.main",
        boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Box display="flex" justifyContent="center" gap={2}>
          <IconButton sx={{ color: "white" }}>
            <Facebook />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <Instagram />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <WhatsApp />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <XIcon />
          </IconButton>
        </Box>

        <Typography variant="body2" color="white">
          © {new Date().getFullYear()} Hair Radiant
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
