import { useFormContext, useWatch, Controller } from 'react-hook-form';
import React, { useMemo, ReactElement, useCallback, Props, useContext } from 'react';
import * as _ from 'lodash';
import { Form, Col, FormControlProps, ColProps, InputGroup } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { FormText } from './interfaces/input';
import { Validation, useValidation } from './hooks/useValidation';
import { TextContext } from '../text';

export interface DateProp extends ColProps {
  name: string;
  disabled?: boolean;
  validation?: Validation;
  showTimeSelect?: boolean;
}

export function FormDate({ name, className = '', disabled, validation = {}, showTimeSelect, ...props }: DateProp) {
  const { register, errors, formState, control, setValue } = useFormContext()
  const text = useContext(TextContext) as FormText<any>;
  const vals = useValidation(validation);

  const error: any = _.get(errors, name);


  return (
    <Form.Group as={Col} {...props} className={className} controlId={name}>
      <Form.Label>{text[name].label}</Form.Label>
      <InputGroup>
        <Controller
          control={control}
          name={name}
          rules={vals}
          render={({ onChange, onBlur, value }) => {
            const selected = value ? new Date(value) : undefined;
            return (
            <DatePicker
              onChange={onChange}
              onBlur={onBlur}
              selected={selected}
              wrapperClassName='form-control col'
              showTimeSelect={showTimeSelect}
              className={!disabled ? 'clearable-date-input' : ''}
              disabled={disabled}
              dateFormat={showTimeSelect ? "Pp" : "" }
              customInput={
                <Form.Control
                  isInvalid={formState.isSubmitted && error}
                  isValid={formState.isSubmitted && !error}
                  disabled={disabled}
                  placeholder={text[name].describe}
                />}
            />
          )}}
     
        />
        {!disabled ?
          <InputGroup.Append>
            <InputGroup.Text>@</InputGroup.Text>
          </InputGroup.Append> : null
        }

      </InputGroup>
    </Form.Group>
  )
}