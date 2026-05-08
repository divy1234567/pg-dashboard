import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import zh from "./locales/zh.json";

// Centralised list of languages exposed to the UI. Adding a new language
// here and dropping a JSON next to en.json/zh.json is all the wiring needed.
export const supportedLanguages = [
    { code: "en", labelKey: "common.languageEnglish" },
    { code: "zh", labelKey: "common.languageChinese" },
];

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            zh: { translation: zh },
        },
        fallbackLng: "en",
        supportedLngs: supportedLanguages.map((l) => l.code),
        nonExplicitSupportedLngs: true, // treat "zh-CN" etc. as "zh"
        interpolation: { escapeValue: false }, // React already escapes
        detection: {
            // Persist the user's choice across sessions; fall back to the
            // browser locale on first visit.
            order: ["localStorage", "navigator"],
            lookupLocalStorage: "volcano-dashboard-lang",
            caches: ["localStorage"],
        },
    });

export default i18n;
