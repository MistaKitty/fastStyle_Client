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

export default function Header() {
  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const buttonRefs = useRef([]);
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(null);
  const { t, i18n } = useTranslation();
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = React.useState(
    languages.find((lang) => lang.code === i18n.language)?.code || ""
  );

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
        if (response.languages.some((lang) => lang.code === i18n.language)) {
          setLanguage(i18n.language);
        } else {
          setLanguage("pt");
        }
      } catch (error) {
        console.error("Erro ao carregar as línguas:", error);
      }
    };

    loadLanguages();
  }, [i18n.language]);

  // Efeitos click, hover e active

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    setLanguage(selectedLanguage);
  };

  const handleMouseEnter = (index) => {
    if (location.pathname !== items[index].path && activeIndex !== index) {
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

    if (index !== -1) {
      buttonRefs.current[index].style.backgroundColor = "rgba(0, 0, 0, 0.2)";
    }

    buttonRefs.current.forEach((ref, idx) => {
      if (idx !== index) {
        ref.style.backgroundColor = "";
      }
    });
  }, [items, location.pathname]);

  return (
    <AppBar position="fixed">
      {isMobile ? (
        // Menu mobile
        <Button variant="contained">Menu Mobile 🚧</Button>
      ) : (
        // Menu desktop
        <Toolbar className="d-flex justify-content-between">
          {/*Logo box*/}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box>
              <Link to="/" className="text-reset">
                <img src={favicon} alt="Logo" className="img-fluid w-25" />

                <Typography variant="h6" sx={{ marginTop: "8px" }}>
                  Hair Radiant
                </Typography>
              </Link>
            </Box>
          </Box>
          {/*Button box*/}

          <Box>
            {[
              { key: "menu.inicio", path: "/" },
              { key: "menu.servicos", path: "/servicos" },
              { key: "menu.sobre", path: "/sobre" },
              { key: "menu.contato", path: "/contato" },
              { key: "menu.galeria", path: "/galeria" },
              { key: "menu.blog", path: "/blog" },
              { key: "menu.recrutamento", path: "/recrutamento" },
            ].map((item, index) => {
              const isActive = location.pathname === item.path; // Verifica se a rota atual é a do botão

              return (
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
                        isActive || index === activeIndex
                          ? "rgba(0, 0, 0, 0.2)"
                          : "",
                      transition: "background-color 0.2s",
                    }}
                  >
                    {t(item.key)} {/* Tradução para o texto do botão */}
                  </Button>
                </Link>
              );
            })}
          </Box>
          {/*Language Dropdown*/}
          <Box>
            <FormControl
              variant="filled"
              size="small"
              sx={{
                m: 1,
                minWidth: 120,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Box>
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
                  {languages.map((language) => (
                    <MenuItem key={language.code} value={language.code}>
                      {language.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box
                sx={{
                  m: 1,
                  display: "flex",
                  gap: 1,
                }}
              >
                {/* Botão de Registar */}
                <Link
                  to="/registar"
                  style={{ textDecoration: "none", flex: 1 }}
                >
                  <LoadingButton
                    size="small"
                    sx={{ flex: 1 }}
                    // onClick={handleRegisterClick}
                    // loading={loadingRegister}
                    loadingPosition="start"
                    loadingIndicator="A registar..."
                    startIcon={<PersonAddIcon />}
                    variant="contained"
                  >
                    {t("botao.registar")}
                  </LoadingButton>
                </Link>

                {/* Botão de Iniciar Sessão */}
                <Link to="/login" style={{ textDecoration: "none", flex: 1 }}>
                  <LoadingButton
                    size="small"
                    sx={{ flex: 1 }}
                    // onClick={handleLoginClick}
                    // loading={loadingLogin}
                    loadingPosition="start"
                    loadingIndicator="A iniciar sessão..."
                    startIcon={<PersonAddIcon />}
                    variant="contained"
                  >
                    {t("botao.logar")}
                  </LoadingButton>
                </Link>
              </Box>
            </FormControl>
          </Box>
        </Toolbar>
      )}
    </AppBar>
  );
}
