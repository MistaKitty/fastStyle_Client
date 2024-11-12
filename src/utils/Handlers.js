import { useTranslation } from "react-i18next";
import axios from "axios";
// Language logic
export const loadLanguages = async (setLanguages, setLanguage) => {
  try {
    const response = await import("../assets/languages.json");
    setLanguages(response.languages);

    const availableLanguages = response.languages.map((lang) => lang.code);
    const browserLanguage = navigator.language.split("-")[0];

    const cookieLanguage = document.cookie
      .split("; ")
      .find((row) => row.startsWith("i18next="))
      ?.split("=")[1];

    const languageToSet =
      cookieLanguage ||
      (availableLanguages.includes(browserLanguage)
        ? browserLanguage
        : availableLanguages[0] || "pt");

    setLanguage(languageToSet);
  } catch (error) {
    console.error("Erro ao carregar as línguas:", error);
  }
};

export const handleLanguageChange = (event, i18n, setLanguage) => {
  const selectedLanguage = event.target.value;
  i18n.changeLanguage(selectedLanguage);
  setLanguage(selectedLanguage);
};
//Menu logic
export const handleMouseEnter = (index, location, items, buttonRefs) => {
  if (location && location.pathname !== items[index].path) {
    buttonRefs.current[index].style.backgroundColor = "rgba(0, 0, 0, 0.1)";
  }
};

export const handleMouseLeave = (index, location, items, buttonRefs) => {
  if (location && location.pathname !== items[index].path) {
    buttonRefs.current[index].style.backgroundColor = "";
  }
};

export const handleClick = (index, setActiveIndex, buttonRefs) => {
  setActiveIndex(index);
  buttonRefs.current[index].style.backgroundColor = "rgba(0, 0, 0, 0.2)";
};

export const updateActiveButtonStyles = (
  location,
  items,
  buttonRefs,
  setActiveIndex
) => {
  const currentPath = location?.pathname;
  const index = items.findIndex((item) => item.path === currentPath);
  setActiveIndex(index);

  buttonRefs.current.forEach((ref, idx) => {
    if (ref) {
      ref.style.backgroundColor = idx === index ? "rgba(0, 0, 0, 0.2)" : "";
    }
  });
};

export const useMenuItems = () => {
  const { t } = useTranslation();

  return [
    { key: "menu.home", path: "/" },
    { key: "menu.services", path: "/servicos" },
    { key: "menu.about", path: "/sobre" },
    { key: "menu.contact", path: "/contato" },
    { key: "menu.gallery", path: "/galeria" },
    { key: "menu.blog", path: "/blog" },
    { key: "menu.recruitment", path: "/recrutamento" },
  ].map((item) => ({ ...item, t: t(item.key) }));
};

export const getButtonStyles = (location, itemPath, activeIndex, index) => {
  return {
    backgroundColor:
      location.pathname === itemPath || index === activeIndex
        ? "rgba(0, 0, 0, 0.2)"
        : "",
    transition: "background-color 0.2s",
  };
};

export const setButtonStyles = (location, itemPath, activeIndex, index) => {
  return {
    backgroundColor:
      location.pathname === itemPath || index === activeIndex
        ? "rgba(0, 0, 0, 0.2)"
        : "",
    transition: "background-color 0.2s",
  };
};

export const handleButtonClick = (index, setActiveIndex, buttonRefs) => {
  setActiveIndex(index);
  buttonRefs.current.forEach((ref, idx) => {
    ref.style.backgroundColor = idx === index ? "rgba(0, 0, 0, 0.2)" : "";
  });
};
//Register logic

export const validateEmail = async (email, setErrors) => {
  const { t } = useTranslation();

  try {
    const response = await axios.post("/api/validate-email", { email });
    if (!response.data.isValid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email:
          response.data.message ||
          t("validation.emailInvalid") ||
          "Email já registado ou inválido.",
      }));
      return false;
    }
    return true;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      t("validation.emailCheckError") ||
      "Erro ao verificar email.";
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: errorMessage,
    }));
    return false;
  }
};

export const validatePassword = async (password, setErrors) => {
  const { t } = useTranslation();

  try {
    const response = await axios.post("/api/validate-password", { password });
    if (!response.data.isValid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          response.data.message ||
          t("validation.passwordInvalid") ||
          "Senha não atende os requisitos.",
      }));
      return false;
    }
    return true;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      t("validation.passwordCheckError") ||
      "Erro ao verificar senha.";
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: errorMessage,
    }));
    return false;
  }
};

export const validatePhone = async (phone, setErrors) => {
  const { t } = useTranslation();

  if (phone.trim() === "") return true;
  try {
    const response = await axios.post("/api/validate-phone", { phone });
    if (!response.data.isValid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone:
          response.data.message ||
          t("validation.phoneInvalid") ||
          "Telemóvel já registado ou inválido.",
      }));
      return false;
    }
    return true;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      t("validation.phoneCheckError") ||
      "Erro ao verificar telemóvel.";
    setErrors((prevErrors) => ({
      ...prevErrors,
      phone: errorMessage,
    }));
    return false;
  }
};
