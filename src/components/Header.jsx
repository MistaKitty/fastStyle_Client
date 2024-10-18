import { useEffect, useState } from "react";
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

export default function Header() {
  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { t, i18n } = useTranslation();
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const response = await import("../assets/languages.json");
        setLanguages(response.languages);
      } catch (error) {
        console.error("Erro ao carregar as línguas:", error);
      }
    };

    loadLanguages();
  }, []);

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
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
              defaultValue={i18n.language}
            >
              {languages.map((language) => (
                <MenuItem key={language.code} value={language.code}>
                  {language.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Toolbar>
      )}
    </AppBar>
  );
}
