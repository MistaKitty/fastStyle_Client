// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  createTheme,
  Typography,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoadingButton from "@mui/lab/LoadingButton";
import favicon from "../assets/favicon.svg";
import {
  handleLanguageChange,
  handleMouseEnter,
  handleMouseLeave,
  handleClick,
  updateActiveButtonStyles,
} from "../utils/Handlers";
import MobileHeader from "./MobileHeader";

export default function Header() {
  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const buttonRefs = useRef([]);
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(null);
  const { t, i18n } = useTranslation();
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState("");

  const items = [
    { key: "menu.inicio", path: "/" },
    { key: "menu.servicos", path: "/servicos" },
    { key: "menu.sobre", path: "/sobre" },
    { key: "menu.contato", path: "/contato" },
    { key: "menu.galeria", path: "/galeria" },
    { key: "menu.blog", path: "/blog" },
    { key: "menu.recrutamento", path: "/recrutamento" },
  ].map((item) => ({ ...item, t: t(item.key) }));

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

  useEffect(() => {
    updateActiveButtonStyles(location, items, buttonRefs, setActiveIndex);
  }, [items, location, location.pathname]);

  return (
    <AppBar position="fixed">
      {isMobile ? (
        <MobileHeader />
      ) : (
        <Toolbar className="d-flex justify-content-between">
          <Box>
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
          <Box>
            {items.map((item, index) => (
              <Link
                to={item.path}
                key={index}
                style={{ textDecoration: "none" }}
                className="text-reset"
              >
                <Button
                  ref={(el) => (buttonRefs.current[index] = el)}
                  color="inherit"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  onClick={() => handleClick(index)}
                  style={{
                    backgroundColor:
                      location.pathname === item.path || index === activeIndex
                        ? "rgba(0, 0, 0, 0.2)"
                        : "",
                    transition: "background-color 0.2s",
                  }}
                >
                  {item.t}
                </Button>
              </Link>
            ))}
          </Box>
          <Box>
            <FormControl
              variant="filled"
              size="small"
              sx={{ m: 1, minWidth: 120 }}
            >
              <InputLabel
                id="LangSelectorLabel"
                sx={{ textAlign: "center", width: "100%" }}
              >
                {t("botao.lingua")}
              </InputLabel>
              <Select
                labelId="LangSelectorLabel"
                id="LangSelector"
                onChange={(event) =>
                  handleLanguageChange(event, i18n, setLanguage)
                }
                value={language}
              >
                {languages.map((lang) => (
                  <MenuItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ m: 1, display: "flex", gap: 1 }}>
              <Link to="/registar" style={{ textDecoration: "none", flex: 1 }}>
                <LoadingButton
                  size="small"
                  loadingPosition="start"
                  loadingIndicator="botao.registando"
                  startIcon={<PersonAddIcon />}
                  variant="contained"
                >
                  {t("botao.registar")}
                </LoadingButton>
              </Link>
              <Link to="/login" style={{ textDecoration: "none", flex: 1 }}>
                <LoadingButton
                  size="small"
                  loadingPosition="start"
                  loadingIndicator="botao.logando"
                  startIcon={<PersonAddIcon />}
                  variant="contained"
                >
                  {t("botao.logar")}
                </LoadingButton>
              </Link>
            </Box>
          </Box>
        </Toolbar>
      )}
    </AppBar>
  );
}
