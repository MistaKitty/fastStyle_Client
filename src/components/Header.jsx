import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  const { t, i18n } = useTranslation();
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = React.useState(
    languages.find((lang) => lang.code === i18n.language)?.code || ""
  );

  console.log("Línguas disponíveis:", languages);
  console.log("Língua atual do i18n:", i18n.language);

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

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    setLanguage(selectedLanguage);
  };

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
            <Button color="inherit">{t("menu.inicio")}</Button>
            <Button color="inherit">{t("menu.servicos")}</Button>
            <Button color="inherit">{t("menu.sobre")}</Button>
            <Button color="inherit">{t("menu.contato")}</Button>
            <Button color="inherit">{t("menu.galeria")}</Button>
            <Button color="inherit">{t("menu.blog")}</Button>
            <Button color="inherit">{t("menu.recrutamento")}</Button>
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
                <LoadingButton
                  size="small"
                  sx={{ flex: 1 }}
                  // onClick={handleClick}
                  // loading={loading}
                  loadingPosition="start"
                  loadingIndicator="A registar..."
                  startIcon={<PersonAddIcon />}
                  variant="contained"
                >
                  {t("botao.registar")}
                </LoadingButton>

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
              </Box>
            </FormControl>
          </Box>
        </Toolbar>
      )}
    </AppBar>
  );
}
