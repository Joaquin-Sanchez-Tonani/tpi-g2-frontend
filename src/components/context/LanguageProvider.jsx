import { useState, useEffect } from "react";
import { LanguageContext } from "./LanguageContext";
import { LANG } from "./LanguageContext.const";
import { translation_dictionary } from "./translations";

const savedLang = localStorage.getItem("lang-p3");

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(savedLang ?? LANG.SPANISH);

  useEffect(() => {
    localStorage.setItem("lang-p3", language);
  }, [language]);

  const handleToggleLanguage = () => {
    setLanguage((prev) =>
      prev === LANG.SPANISH ? LANG.ENGLISH : LANG.SPANISH
    );
  };

  const t = (key) => {
    const entry = translation_dictionary[language].find(
      (item) => item.key === key
    );
    return entry ? entry.value : key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        onToggleLanguage: handleToggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
