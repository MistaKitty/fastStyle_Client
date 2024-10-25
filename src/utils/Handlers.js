import { useTranslation } from "react-i18next";

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
    { key: "menu.inicio", path: "/" },
    { key: "menu.servicos", path: "/servicos" },
    { key: "menu.sobre", path: "/sobre" },
    { key: "menu.contato", path: "/contato" },
    { key: "menu.galeria", path: "/galeria" },
    { key: "menu.blog", path: "/blog" },
    { key: "menu.recrutamento", path: "/recrutamento" },
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
