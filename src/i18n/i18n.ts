import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ptBR from "./locales/pt-BR.json";
import en from "./locales/en.json";

const LANG_KEY = "appLanguage";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v4",
  lng: "ptBR",
  fallbackLng: "ptBR",
  resources: {
    ptBR: { translation: ptBR },
    en: { translation: en },
  },
  interpolation: {
    escapeValue: false,
  },
});

export const setAppLanguage = async (lang: string) => {
  await AsyncStorage.setItem(LANG_KEY, lang);
  i18n.changeLanguage(lang);
};

export const getAppLanguage = async (): Promise<string> => {
  const lang = await AsyncStorage.getItem(LANG_KEY);
  return lang || "ptBR";
};

export default i18n;
