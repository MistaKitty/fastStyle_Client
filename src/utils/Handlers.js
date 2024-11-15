import { useTranslation } from "react-i18next";
import axios from "axios";

// ----------------------------- API Logic -----------------------------

const apiBaseURL =
  import.meta.env.VITE_REMOTE === "true"
    ? import.meta.env.VITE_APIREMOTE
    : import.meta.env.VITE_APILOCAL;

axios.defaults.baseURL = apiBaseURL;

const handleApiRequest = async (
  endpoint,
  field,
  value,
  setErrors,
  errorMessage
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation();
  try {
    const response = await axios.post(endpoint, { [field]: value });
    if (!response.data.isValid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]:
          response.data.message || t(errorMessage) || `${field} is invalid.`,
      }));
      return false;
    }
    return true;
  } catch (error) {
    const errorMsg =
      error.response?.data?.message ||
      t(`${field}CheckError`) ||
      `Error verifying ${field}.`;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMsg,
    }));
    return false;
  }
};

export const validateField = async (field, value, setErrors) => {
  const endpoints = {
    email: "/api/validate-email",
    password: "/api/validate-password",
    phone: "/api/validate-phone",
  };

  const errorMessages = {
    email: "validation.emailInvalid",
    password: "validation.passwordInvalid",
    phone: "validation.phoneInvalid",
  };

  return handleApiRequest(
    endpoints[field],
    field,
    value,
    setErrors,
    errorMessages[field]
  );
};

export const validateEmail = async (email, setErrors) => {
  return handleApiRequest(
    "/api/validate-email",
    "email",
    email,
    setErrors,
    "validation.emailInvalid"
  );
};

export const registerUser = async (userData, setErrors) => {
  try {
    const response = await axios.post("/api/users/register", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.success) {
      return true;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: response.data.message || "Erro durante o registo.",
      }));
      return false;
    }
  } catch (error) {
    const errorMsg =
      error.response?.data?.message || "Erro ao conectar com o servidor.";

    setErrors((prevErrors) => ({
      ...prevErrors,
      email: errorMsg,
    }));
    return false;
  }
};

// ----------------------------- Language Logic -----------------------------

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
    console.error("Error loading languages:", error);
  }
};

export const handleLanguageChange = (event, i18n, setLanguage) => {
  const selectedLanguage = event.target.value;
  i18n.changeLanguage(selectedLanguage);
  setLanguage(selectedLanguage);
};

// ----------------------------- Menu Logic -----------------------------

export const validatePassword = async (password, setErrors) => {
  return handleApiRequest(
    "/api/validate-password",
    "password",
    password,
    setErrors,
    "validation.passwordInvalid"
  );
};

export const validatePhone = async (phone, setErrors) => {
  return handleApiRequest(
    "/api/validate-phone",
    "phone",
    phone,
    setErrors,
    "validation.phoneInvalid"
  );
};

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
    { key: "menu.services", path: "/services" },
    { key: "menu.about", path: "/about" },
    { key: "menu.contact", path: "/contact" },
    { key: "menu.gallery", path: "/gallery" },
    { key: "menu.blog", path: "/blog" },
    { key: "menu.recruitment", path: "/recruitment" },
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
