import { useContext } from "react";
import { LanguageContext } from "./language.context";

export const useLanguage = <T>(langs: { [x:string]: T }): [T, string]  => {
    const [ language ] =  useContext(LanguageContext)
    const searchLang = language ? language.replace('-','') : '';
    const text = langs[searchLang] ?? langs[0];
    return [text, language]
  }
