import { useTranslation } from "react-i18next";
import axios from "axios";

// ----------------------------- Local || Remote Logic -----------------------------

const getApiBaseUrl = () => {
  const isRemote = import.meta.env.VITE_REMOTE === "true";
  return isRemote
    ? import.meta.env.VITE_APIREMOTE
    : import.meta.env.VITE_APILOCAL;
};
const baseUrl = getApiBaseUrl();
// ----------------------------- API Logic -----------------------------
const handleApiRequest = async (
  email,
  token,
  recaptchaToken,
  setErrors,
  errorMessage,
  t
) => {
  try {
    const response = await axios.post(`${baseUrl}/api/users/validate-email`, {
      email,
      token,
      recaptchaToken,
    });

    if (!response.data.isValid) {
      const messageKey = response.data.message || errorMessage;
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: t(messageKey) || "Email is invalid.",
      }));
      return false;
    }

    return true;
  } catch (error) {
    const fallbackKey = "validation.emailCheckError";
    const errorMsg =
      t(error.response?.data?.message || fallbackKey) ||
      "Error verifying email.";

    setErrors((prevErrors) => ({
      ...prevErrors,
      email: errorMsg,
    }));

    return false;
  }
};

export const validateEmail = async (
  email,
  token,
  recaptchaToken,
  setErrors,
  t
) => {
  return handleApiRequest(
    email,
    token,
    recaptchaToken,
    setErrors,
    "validation.emailInvalid",
    t
  );
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

// ----------------------------- Other button Logic -----------------------------
