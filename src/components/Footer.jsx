// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  createTheme,
} from "@mui/material";
import { Facebook, Instagram, WhatsApp } from "@mui/icons-material";
import XIcon from "@mui/icons-material/X";
import MobileFooter from "./MobileFooter";

export default function Footer() {
  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      position="fixed"
      sx={{
        top: "auto",
        bottom: 0,
        width: "100%",
        py: 2,
        backgroundColor: theme.palette.primary.main,
        boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      {isMobile ? (
        <MobileFooter />
      ) : (
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
          >
            <img
              src="path-to-designer-logo.png"
              alt="Designer Logo"
              style={{ width: 50 }}
            />
            <Typography variant="body2" color="white">
              Mr WebCat
            </Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <Box display="flex" justifyContent="center" gap={3}>
              <Link
                to="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <IconButton sx={{ color: "white" }}>
                  <Facebook />
                </IconButton>
                <Typography variant="body2" color="white">
                  Facebook
                </Typography>
              </Link>
              <Link
                to="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <IconButton sx={{ color: "white" }}>
                  <Instagram />
                </IconButton>
                <Typography variant="body2" color="white">
                  Instagram
                </Typography>
              </Link>
              <Link
                to="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <IconButton sx={{ color: "white" }}>
                  <WhatsApp />
                </IconButton>
                <Typography variant="body2" color="white">
                  WhatsApp
                </Typography>
              </Link>
              <Link
                to="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <IconButton sx={{ color: "white" }}>
                  <XIcon />
                </IconButton>
                <Typography variant="body2" color="white">
                  X
                </Typography>
              </Link>
            </Box>

            <Typography variant="body2" color="white">
              © {new Date().getFullYear()} Hair Radiant
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <Typography variant="body2" color="white" mr={2}>
              Pagamento seguro via Stripe
            </Typography>
          </Box>
        </Toolbar>
      )}
    </AppBar>
  );
}
