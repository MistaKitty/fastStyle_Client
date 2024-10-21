import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

const CustomLanguageDetector = {
  type: "languageDetector",
  async: true,
  detect: (callback) => {
    const cookieLanguage = document.cookie
      .split("; ")
      .find((row) => row.startsWith("i18next="));
    const language = cookieLanguage
      ? cookieLanguage.split("=")[1]
      : navigator.language.split("-")[0];
    callback(language);
  },
  init: () => {},
  cacheUserLanguage: (language) => {
    document.cookie = `i18next=${language}; path=/`;
  },
};

i18n
  .use(HttpBackend)
  .use(CustomLanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "pt",
    debug: false,
    backend: {
      loadPath: "/locales/{{lng}}.json",
    },
    detection: {
      order: ["cookie", "localStorage", "navigator"],
      caches: ["cookie"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
