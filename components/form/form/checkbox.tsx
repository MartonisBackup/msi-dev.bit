import { useFormContext, useWatch } from 'react-hook-form';
import React, { useMemo, ReactElement, useCallback, Props, useContext } from 'react';
import * as _ from 'lodash';
import { Form, Col, FormControlProps, ColProps } from 'react-bootstrap';
import { FormText } from './interfaces/input';
import { TextContext } from '@bit/martonis.react.text';
import { Validation, useValidation } from './hooks/useValidation';


export interface CheckboxProp extends ColProps {
    name: string;
    disabled?: boolean;
    validation?: Validation;
}

export function FormCheck({ name, className = '', disabled, validation = {}, ...props }: CheckboxProp) {
    const { register, errors, formState, control } = useFormContext()
    const text = useContext(TextContext) as FormText<any>;
    const vals = useValidation(validation);


    const error: any = _.get(errors, name);
    
    return(
        <Form.Group as={Col} {...props} className={className} controlId={name}>
           <Form.Label></Form.Label>
          <Form.Check
            isInvalid={formState.isSubmitted && error}
            isValid={formState.isSubmitted && !error && !_.isEmpty(vals)}
            ref={register({...vals})}
            disabled={disabled}
            placeholder={text[name].describe}
            name={name}
            label={text[name].label}
            className={'pt-3'}
            {...props}
          />
        </Form.Group>
    )
}