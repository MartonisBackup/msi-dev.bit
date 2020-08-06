import { TextObject } from "../../text";

export interface IInput extends TextObject {
    label?: string,
    describe?: string
}

export type FormText<T> = Record<keyof T, IInput> 