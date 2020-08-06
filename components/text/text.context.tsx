import React, {  createContext } from 'react';

export interface TextObject extends Record<any, string | TextObject> {
    
}

export const TextContext = createContext<TextObject>({});