

import { useFormContext } from 'react-hook-form';
import React, { useContext, useState } from 'react';
import * as _ from 'lodash';
import { Form, Col, FormControlProps, ColProps, InputGroup } from 'react-bootstrap';
import { FormText } from './interfaces/input';
import { Validation, useValidation } from './hooks/useValidation';
import { TextContext } from '@bit/martonis.react.text';
import Eye from 'bootstrap-icons/icons/eye.svg';
import EyeSlash from 'bootstrap-icons/icons/eye-slash.svg';

export interface InputProp extends ColProps {
  name: string;
  disabled?: boolean;
  type?: string;
  validation?: Validation;
}

export function FormInput({ name, className = '', disabled, type = 'text', validation = {}, ...props }: InputProp) {
  const { register, errors, formState } = useFormContext()
  const text = useContext(TextContext) as FormText<any>;
  const vals = useValidation(validation);
  const [show, setShow] = useState(false)
  const error: any = _.get(errors, name);

  const EyeIcon = show ? EyeSlash : Eye;

  return (
    <Form.Group as={Col} {...props} className={className} controlId={name}>
      <Form.Label>{text[name].label}</Form.Label>
      <InputGroup>
        <Form.Control
          isInvalid={formState.isSubmitted && error}
          isValid={formState.isSubmitted && !error && !_.isEmpty(vals)}
          ref={register({ ...vals })}
          type={show ? 'text' : type}
          disabled={disabled}
          placeholder={text[name].describe}
          name={name}
          {...props}
        />
        {type === 'password' ? 
          <InputGroup.Append>
            <InputGroup.Text className='clickable' onClick={() => { setShow(!show)}}><EyeIcon/></InputGroup.Text>
          </InputGroup.Append>
          : null
        }
      </InputGroup>
      <Form.Control.Feedback type="invalid">{error?.message}</Form.Control.Feedback>

    </Form.Group>
  )
}