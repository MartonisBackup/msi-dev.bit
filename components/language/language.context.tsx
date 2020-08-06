import React, { Dispatch, SetStateAction } from "react";

export type SupportedLanguage =  { key: string, text: string };

export type LanguageContextType  = [string, Dispatch<SetStateAction<string>>, SupportedLanguage[] ]

const languageContext: LanguageContextType = ['', (l: string) => {}, []]

export const LanguageContext = React.createContext(languageContext);
