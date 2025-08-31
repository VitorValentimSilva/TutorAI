import { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../i18n/i18n";

const LANG_KEY = "appLanguage";

interface LanguageContextProps {
  language: string;
  setLanguage: (lang: string) => void;
}

export const LanguageContext = createContext<LanguageContextProps>({
  language: "ptBR",
  setLanguage: () => {},
});

interface Props {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: Props) => {
  const [language, setLanguageState] = useState<string>("ptBR");

  useEffect(() => {
    AsyncStorage.getItem(LANG_KEY).then((lang) => {
      if (lang) {
        setLanguageState(lang);
        i18n.changeLanguage(lang);
      }
    });
  }, []);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    i18n.changeLanguage(lang);
    AsyncStorage.setItem(LANG_KEY, lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
