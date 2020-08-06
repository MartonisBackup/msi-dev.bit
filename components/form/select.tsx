import { useFormContext, useWatch } from 'react-hook-form';
import React, { useMemo, useContext } from 'react';
import { Form, Col, ColProps } from 'react-bootstrap';
import _ from 'lodash';
import { FormText } from './interfaces/input';
import { Validation, useValidation } from './hooks/useValidation';
import { TextContext } from '../text';

export interface SelectProp<T> extends ColProps {
    dataValue: string;
    name: string;
    dataKey: string;
    disabled?: boolean;
    data: T[];
    validation?: Validation
}

export function FormSelect<T>({ name, dataKey, dataValue, disabled, data, validation = {}, className = '',  ...props }: SelectProp<T>) {
    const { register, errors, formState, control } = useFormContext()

    const selected = useWatch<string>({
        control,
        name
    })
    const text = useContext(TextContext) as FormText<any>;
    const vals = useValidation(validation)

    const error: any = _.get(errors, name);
    
    const options = useMemo(() => {
        return [
            <option key={dataValue+'-1'} className='text-secondary'  value={''}>{text[dataValue].describe}</option>,
            ..._.map(data, (item, index) => {
                return <option key={dataValue+index} value={item[dataKey]}>{item[dataValue]}</option>
            })
        ]
    }, [data])

    return(
        <Form.Group {...props} as={Col}  className={className} controlId={dataValue}>
        <Form.Label>{text[dataValue].label}</Form.Label>
        <Form.Control  
            disabled={disabled}
            isInvalid={formState.isSubmitted && error}
            isValid={formState.isSubmitted && !error && !_.isEmpty(vals)}
            ref={register({...vals})}
            type="select"
            className={`${(!selected ? 'text-secondary' : '')}`}
            value={selected || undefined }
            placeholder={text[dataValue].describe}
            name={name} as="select" custom>
            {options}
        </Form.Control>
          <Form.Control.Feedback type="invalid">{error?.message}</Form.Control.Feedback>
        </Form.Group>
    )
}