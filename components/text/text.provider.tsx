import React, { PropsWithChildren} from 'react'
import { TextContext, TextObject } from './text.context';


export function TextProvider({ children, text }: PropsWithChildren<{ text: TextObject }>) {
  return (
    <TextContext.Provider value={text} >
      {children}
    </TextContext.Provider>
  )
}
