// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppBar, Box, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import favicon from "../assets/favicon.svg";
import { handleLanguageChange } from "../utils/Handlers";

export default function HeaderMobile() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState("");

  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const response = await import("../assets/languages.json");
        setLanguages(response.languages);

        const availableLanguages = response.languages.map((lang) => lang.code);
        const browserLanguage = navigator.language.split("-")[0];

        const cookieLanguage = document.cookie
          .split("; ")
          .find((row) => row.startsWith("i18next="))
          ?.split("=")[1];

        const languageToSet =
          cookieLanguage ||
          (availableLanguages.includes(browserLanguage)
            ? browserLanguage
            : availableLanguages[0] || "pt");

        setLanguage(languageToSet);
      } catch (error) {
        console.error("Erro ao carregar as línguas:", error);
      }
    };

    loadLanguages();
  }, [i18n.language]);

  return (
    <AppBar position="fixed">
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "0 auto",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <Box sx={{ m: "15px" }}>
          <Link to="/" className="text-reset">
            <img
              src={favicon}
              alt="Logo"
              style={{ maxWidth: "50px", height: "auto" }}
            />
            <Typography
              variant="h6"
              sx={{ marginTop: "8px", fontSize: "16px" }}
            >
              Hair Radiant
            </Typography>
          </Link>
        </Box>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ m: "15px" }}
        >
          <MenuIcon />
        </IconButton>
      </Box>
    </AppBar>
  );
}
