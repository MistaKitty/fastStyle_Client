import Header from "./components/Header";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import { Typography, Box } from "@mui/material";

function App() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        padding: 2,
        textAlign: "center",
        maxWidth: "100%",
        margin: "0 auto",
      }}
    >
      <Header />

      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
          lineHeight: 1.2,
          overflowWrap: "break-word",
          wordWrap: "break-word",
        }}
      >
        {t("title")}
      </Typography>

      <Footer />
    </Box>
  );
}

export default App;
