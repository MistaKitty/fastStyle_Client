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
  Avatar,
} from "@mui/material";

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

        <Box display="flex" flexDirection="column" alignItems="center">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ m: "15px" }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <FormControl fullWidth sx={{ width: 40, mt: 1 }}>
            <Select
              labelId="LangSelectorLabel"
              id="LangSelector"
              onChange={(event) =>
                handleLanguageChange(event, i18n, setLanguage)
              }
              value={language}
              renderValue={() => null}
              displayEmpty
            >
              {languages.map((lang) => (
                <MenuItem key={lang.code} value={lang.code}>
                  <Avatar
                    sx={{ width: 24, height: 24 }}
                    src={`/flags/${lang.flagCode.toLowerCase()}.svg`}
                    alt={`${lang.name} Flag`}
                  />
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
