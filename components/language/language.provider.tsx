import React, { PropsWithChildren, useState, useCallback } from 'react'
import { useCookies } from 'react-cookie';
import { LanguageContext, SupportedLanguage } from './language.context';

const LANGUAGE_COOKIE = 'language';

export function LanguageProvider({ children, supportedLanguages }: PropsWithChildren<{ supportedLanguages:  SupportedLanguage[]}>) {
  const [{ language }, setCookies ] = useCookies([LANGUAGE_COOKIE]);
  const defaultLanguage = supportedLanguages.find(x => x.key === language ?? window.navigator.language)
  const [ lang, setLang ] = useState(defaultLanguage ? defaultLanguage.key : supportedLanguages[0].key);


  const setLanguage = useCallback((lang: string) => {
    setLang(lang);
    setCookies(LANGUAGE_COOKIE, lang);
  }, [])

  return (
    <LanguageContext.Provider value={[lang, setLanguage, supportedLanguages]} >
      {children}
    </LanguageContext.Provider>
  )

}
