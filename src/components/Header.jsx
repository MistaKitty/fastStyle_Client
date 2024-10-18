import React, { useEffect, useState } from "react";

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
  }, []);

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
            <img src="" alt="Logo" style={{ width: "100px", height: "auto" }} />
            <Typography variant="h6" sx={{ marginTop: "8px" }}>
              Logo
            </Typography>
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
          <FormControl
            variant="filled"
            sx={{
              m: 1,
              minWidth: 120,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <InputLabel id="LangSelectorLabel">{t("menu.lingua")}</InputLabel>
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
            <LoadingButton
              size="small"
              // onClick={handleClick}
              // loading={loading}
              loadingPosition="start"
              loadingIndicator="A registar..."
              startIcon={<PersonAddIcon />}
              variant="contained"
            >
              Register
            </LoadingButton>
          </FormControl>
        </Toolbar>
      )}
    </AppBar>
  );
}
