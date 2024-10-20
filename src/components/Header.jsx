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
  IconButton,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MenuIcon from "@mui/icons-material/Menu";
import LoadingButton from "@mui/lab/LoadingButton";
import favicon from "../assets/favicon.svg";

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
        setLanguage(
          availableLanguages.includes(i18n.language)
            ? i18n.language
            : availableLanguages[0] || "pt"
        );
      } catch (error) {
        console.error("Erro ao carregar as línguas:", error);
      }
    };

    loadLanguages();
  }, [i18n.language]);

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    setLanguage(selectedLanguage);
  };

  const handleMouseEnter = (index) => {
    if (location.pathname !== items[index].path) {
      buttonRefs.current[index].style.backgroundColor = "rgba(0, 0, 0, 0.1)";
    }
  };

  const handleMouseLeave = (index) => {
    if (location.pathname !== items[index].path) {
      buttonRefs.current[index].style.backgroundColor = "";
    }
  };

  const handleClick = (index) => {
    setActiveIndex(index);
    buttonRefs.current[index].style.backgroundColor = "rgba(0, 0, 0, 0.2)";
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const index = items.findIndex((item) => item.path === currentPath);
    setActiveIndex(index);

    buttonRefs.current.forEach((ref, idx) => {
      if (ref) {
        ref.style.backgroundColor = idx === index ? "rgba(0, 0, 0, 0.2)" : "";
      }
    });
  }, [items, location.pathname]);

  return (
    <AppBar position="fixed">
      {isMobile ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Box sx={{ ml: -15 }}>
            <Link to="/" className="text-reset">
              <img src={favicon} alt="Logo" className="img-fluid w-25" />
              <Typography variant="h6" sx={{ marginTop: "8px" }}>
                Hair Radiant
              </Typography>
            </Link>
          </Box>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Box>
      ) : (
        <Toolbar className="d-flex justify-content-between">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Link to="/" className="text-reset">
              <img src={favicon} alt="Logo" className="img-fluid w-25" />
              <Typography variant="h6" sx={{ marginTop: "8px" }}>
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
                onChange={handleLanguageChange}
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
