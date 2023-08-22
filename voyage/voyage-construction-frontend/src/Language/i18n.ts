import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import TRANSLATIONS_EN from "./en/translations";
import TRANSLATIONS_JA from "./ja/translations";

const local = navigator.language.substring(0, 2);
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: TRANSLATIONS_EN,
      },
      ja: {
        translation: TRANSLATIONS_JA,
      },
    },
  });

i18n.changeLanguage(local);
