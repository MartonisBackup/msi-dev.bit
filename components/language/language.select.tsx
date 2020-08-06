import React, { useMemo, MouseEventHandler, useState, useContext, Props, useRef } from 'react';
import * as _ from 'lodash';
import { Dropdown, DropdownButton, DropdownButtonProps } from 'react-bootstrap';
import { LanguageContext, SupportedLanguage } from './language.context';
import './language.css';


export interface IAction {
  text: string;
  onClick?: MouseEventHandler<any>;
  className?: string;
}

export const LanguageSelect = ({ className= '',  ...props }: Partial<DropdownButtonProps & React.RefAttributes<HTMLDivElement>>) => {
  const [ language, setLanguage, supportedLanguages ] = useContext(LanguageContext)
  const [show, setShow] = useState(false)
  const languageItems = useMemo(() => {
    return _.map(supportedLanguages, (l: SupportedLanguage, i: number) => {
      return <Dropdown.Item key={'action' + i} as={React.forwardRef<any, any>((props, ref) => {
          return <span className={`dropdown-item clickable`} onClick={(event) => { {
              props.onClick?.(event);
              setLanguage(l.key);
          }}}> {l.text}</span>
      }
      )}>
      </Dropdown.Item>
    })
  }, [])

  const ref = useRef<HTMLDivElement>();

  const openMenu = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (e.stopPropagation)  {
        setShow(!show)
        e.stopPropagation();
      }
  }

  return (
      <DropdownButton ref={ref} show={show} onClick={openMenu} id="drop-language" drop='left' className={`${className} self-align-center`} variant='light' title={language} size="sm" {...props}>
          {languageItems}
      </DropdownButton>
  )
}