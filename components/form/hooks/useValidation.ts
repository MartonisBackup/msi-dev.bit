import _ from 'lodash';
import { useMemo } from 'react';
import * as langs from '../lang';
import { ValidationRules } from 'react-hook-form';
import { useLanguage } from '../../language';

export type Validation = {
    required?: boolean;
    min?: number;
    max?: number;
    maxLength?: number;
    minLength?: number;
    isNumber?: boolean;
}

export const useValidation = (validation: Validation): ValidationRules => {
    const [ text, lang ] = useLanguage(langs);
    return useMemo(() => {
    return _.reduce(validation, (prev, curr, key) => {
        let value: any;
        let t: string;
        let k: string;
        switch(key) {
            case 'isNumber':
                k = 'pattern';
                value = /^[0-9]*$/;
                t = text.validation.isNumber;
                break;
            default:
                k = key;
                value =  curr;
                t = text.validation[k];
                break;
        }
        prev[k] = { value, message: t.replace('{0}', value) };
        return prev;
    }, {})
}, [validation, lang])
}