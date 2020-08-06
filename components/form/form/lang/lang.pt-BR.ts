import { ILang } from "./lang.interface";

export const ptBR: ILang = {
    validation: {
        required: 'campo obrigatório',
        isNumber: 'apenas números',
        maxLength: 'tamanho máximo de {0}',
        minLength: 'tamanho mínimo de {0}',
        invalidDoc: 'document inválido',
        isCreditCard: 'cartão invalido',
        default: 'campo inválido',
        isInt: 'apenas números',
        isNotEmpty: 'campo obrigatório',
        max: 'valor acima do permitido',
        min: 'valor menor que o permitido'
    },
    genericError: 'Ocorreu um erro.',
    noSelectLabel: 'Selecione'
}