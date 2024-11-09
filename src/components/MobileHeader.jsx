// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Box,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  Button,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import {
  handleLanguageChange,
  loadLanguages,
  handleMouseEnter,
  handleMouseLeave,
  useMenuItems,
} from "../utils/Handlers";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Flag from "react-world-flags";
import MenuIcon from "@mui/icons-material/Menu";
import favicon from "../assets/favicon.svg";

export default function HeaderMobile() {
  const { t, i18n } = useTranslation();
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState("");
  const menuItems = useMenuItems();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const buttonRefs = useRef([]);
  const location = useLocation();

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  useEffect(() => {
    loadLanguages(setLanguages, setLanguage);
  }, [i18n.language]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: "0 15px",
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Link
          to="/"
          className="text-reset d-flex flex-column align-items-center"
        >
          <img
            src={favicon}
            alt="Logo"
            className="img-fluid"
            style={{ maxWidth: "50px", height: "auto" }}
          />
          <Typography variant="h6" sx={{ fontSize: "16px", marginTop: "4px" }}>
            Hair Radiant
          </Typography>
        </Link>
      </Box>

      <Box display="flex" alignItems="center">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{
            m: "15px",
            height: "56px",
            width: "56px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>

        <FormControl fullWidth sx={{ width: 62, mt: 1 }}>
          <Select
            labelId="LangSelectorLabel"
            id="LangSelector"
            onChange={(event) => handleLanguageChange(event, i18n, setLanguage)}
            value={language || ""}
            renderValue={(selected) => {
              const selectedLang = languages.find(
                (lang) => lang.code === selected
              );
              if (!selectedLang) {
                return (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography sx={{ fontWeight: "bold" }}></Typography>
                  </Box>
                );
              }
              return (
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Flag
                    code={selectedLang.flagCode}
                    style={{ width: 24, height: 24, marginRight: 4 }}
                  />
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {selectedLang.code.toUpperCase()}
                  </Typography>
                </Box>
              );
            }}
            displayEmpty
            IconComponent={() => null}
            sx={{
              "& .MuiSelect-select": {
                paddingLeft: "30px",
                paddingRight: 0,
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            }}
          >
            {languages.map((lang) => (
              <MenuItem key={lang.code} value={lang.code}>
                <Box display="flex" alignItems="center">
                  <Flag
                    code={lang.flagCode}
                    style={{ width: 24, height: 24, marginRight: 8 }}
                  />
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {lang.code.toUpperCase()}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item, index) => (
              <Link
                to={item.path}
                key={index}
                style={{ textDecoration: "none" }}
                className="text-reset"
              >
                <ListItem button>
                  <Button
                    ref={(el) => (buttonRefs.current[index] = el)}
                    color="inherit"
                    onMouseEnter={() =>
                      handleMouseEnter(index, location, menuItems, buttonRefs)
                    }
                    onMouseLeave={() =>
                      handleMouseLeave(index, location, menuItems, buttonRefs)
                    }
                    style={{
                      backgroundColor:
                        location.pathname === item.path
                          ? "rgba(0, 0, 0, 0.2)"
                          : "",
                      transition: "background-color 0.2s",
                      width: "100%",
                      justifyContent: "flex-start",
                    }}
                  >
                    {item.t}
                  </Button>
                </ListItem>
              </Link>
            ))}
          </List>
          <Box sx={{ m: 1, display: "flex", gap: 1 }}>
            <Link to="/registar" style={{ textDecoration: "none", flex: 1 }}>
              <Button
                size="small"
                variant="contained"
                startIcon={<PersonAddIcon />}
                style={{ width: "100%" }}
              >
                {t("botao.registar")}
              </Button>
            </Link>
            <Link to="/login" style={{ textDecoration: "none", flex: 1 }}>
              <Button
                size="small"
                variant="contained"
                startIcon={<PersonAddIcon />}
                style={{ width: "100%" }}
              >
                {t("botao.logar")}
              </Button>
            </Link>
          </Box>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={1}
          sx={{
            position: "absolute",
            bottom: 10,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <img
            src="path-to-designer-logo.png"
            alt="Designer Logo"
            style={{
              width: "15vw",
              maxWidth: 100,
              minWidth: 50,
            }}
          />
          <Typography variant="body2" color="black">
            Mr WebCat
          </Typography>
        </Box>
      </Drawer>
    </Box>
  );
}
