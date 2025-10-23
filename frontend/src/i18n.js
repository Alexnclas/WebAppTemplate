// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Example translations
const resources = {
  en: {
    translation: {
      welcome: "Welcome to my app",
      description: "This is running with i18next!"
    }
  },
  fr: {
    translation: {
      welcome: "Bienvenue dans mon application",
      description: "Ceci fonctionne avec i18next !"
    }
  }
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: "fr", 
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;