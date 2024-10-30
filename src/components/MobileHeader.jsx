// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  AppBar,
  Box,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import Flag from "react-world-flags";

import MenuIcon from "@mui/icons-material/Menu";
import favicon from "../assets/favicon.svg";
import { handleLanguageChange, loadLanguages } from "../utils/Handlers";
import { useMenuItems } from "../utils/Handlers";

export default function HeaderMobile() {
  const { i18n } = useTranslation();
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState("");
  const menuItems = useMenuItems();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };
  useEffect(() => {
    loadLanguages(setLanguages, setLanguage);
  }, [i18n.language]);

  return (
    <AppBar position="fixed">
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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link to="/" className="text-reset">
            <img
              src={favicon}
              alt="Logo"
              style={{ maxWidth: "50px", height: "auto" }}
            />
            <Typography
              variant="h6"
              sx={{ marginLeft: "8px", fontSize: "16px" }}
            >
              Hair Radiant
            </Typography>
          </Link>
        </Box>

        <Box display="flex" alignItems="center">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ m: "15px" }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <FormControl fullWidth sx={{ width: 62, mt: 1 }}>
            <Select
              labelId="LangSelectorLabel"
              id="LangSelector"
              onChange={(event) =>
                handleLanguageChange(event, i18n, setLanguage)
              }
              value={language || "pt"}
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
                      <Typography sx={{ fontWeight: "bold" }}>PT</Typography>
                    </Box>
                  );
                }
                return (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
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

        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={toggleDrawer(false)}
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
          >
            <List>
              {menuItems.map((item, index) => (
                <ListItem button component={Link} to={item.path} key={index}>
                  <ListItemText primary={item.t} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
    </AppBar>
  );
}
