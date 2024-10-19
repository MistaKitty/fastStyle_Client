import Header from "./components/Header";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import { Routes, Route } from "react-router-dom";
function App() {
  const { t } = useTranslation();

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<h1>{t("underdev")}</h1>} />
      </Routes>
    </div>
  );
}

export default App;
