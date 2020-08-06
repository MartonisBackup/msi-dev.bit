import { useFormContext, useWatch, Controller } from 'react-hook-form';
import React, { useCallback, useContext,  useRef } from 'react';
import * as _ from 'lodash';
import { Form, Col, ColProps, InputGroup } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { FormText } from './interfaces/input';
import { Validation, useValidation } from './hooks/useValidation';
import { TextContext } from '@bit/martonis.react.text';
import X from 'bootstrap-icons/icons/x.svg';

export interface DateRangeProp extends ColProps {
  name: string;
  disabled?: boolean;
  validation?: Validation;
  showTimeSelect?: boolean;
}

const FormDateRange = ({ name, className = '', disabled, validation = {}, showTimeSelect, ...props }: DateRangeProp) => {
  const { register, errors, formState, control, setValue } = useFormContext()
  const text = useContext(TextContext)  as FormText<any>;
  const vals = useValidation(validation);
  const error: any = _.get(errors, name);
  const datePicker = useRef<DatePicker>();

  const clean = useCallback(() => {
    setValue(name, [null,null]);
  }, [])

  return (
    <Form.Group as={Col} {...props} className={className} controlId={name}>
      <Form.Label>{text[name].label}</Form.Label>
      <InputGroup>
        <Controller
          control={control}
          name={name}
          rules={vals}
          render={({ onChange, onBlur, value }) => {
            let selected = [null, null];
            if (value)
              selected = _.map(value, x => x ? new Date(x) : null);

            return (
              <DatePicker
                onChange={(date, event) => { 
                  onChange(date, event); 
                  if (date[1]) 
                    datePicker.current.setOpen(false); 
                  }}
                onBlur={onBlur}
                ref={datePicker}
                selected={selected[0]}
                value={`${selected[0]?.toLocaleDateString() ?? '-'}, ${selected[1]?.toLocaleDateString() ?? '-'}`}
                wrapperClassName='form-control col'
                className={!disabled ? 'clearable-date-input' : ''}
                disabled={disabled}
                startDate={selected[0]}
                endDate={selected[1]}
                shouldCloseOnSelect={false}
                selectsRange
                customInput={
                  <Form.Control
                    isInvalid={formState.isSubmitted && error}
                    isValid={formState.isSubmitted && !error}
                    disabled={disabled}
                    placeholder={text[name].describe}
                  />}
              />
            )
          }}
        />

        {!disabled ?
          <InputGroup.Append>
            <InputGroup.Text onClick={clean} className='clickable'><X /></InputGroup.Text>
          </InputGroup.Append> : null
        }

      </InputGroup>
    </Form.Group>
  )
}

export default FormDateRange;