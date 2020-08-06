export interface ILang {
    validation: {
        required: string,
        isNumber: string,
        isCreditCard: string,
        minLength: string,
        maxLength: string,
        invalidDoc: string
        min: string;
        max: string;
        isInt: string;
        isNotEmpty: string;
        default: string;
    }
    genericError: string;
    noSelectLabel: string;
  
}