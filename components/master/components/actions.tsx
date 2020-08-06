import React, { PropsWithChildren, useMemo, MouseEventHandler, useState } from 'react';
import * as _ from 'lodash';
import { Link } from 'react-router-dom';
import { Dropdown, Modal, Button } from 'react-bootstrap';
import List from 'bootstrap-icons/icons/list.svg'
import * as langs from '../lang';
import { IAction } from '../masterpage.context';
import { useLanguage } from '@bit/martonis.react.language';


export const Actions = ({ actions, className, ...props }: PropsWithChildren<{ actions: IAction[], className?: string }>) => {
  if (!actions?.length)
    return null;
  const [text, lang] = useLanguage(langs);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modalAction, setModalAction] = useState<IAction>(null);

  const CustomToggle = React.forwardRef<any, any>((props, ref) => (
    <List {...props} />
  ));

  const actionItems = useMemo(() => {
    return _.map(actions, (act: IAction, i) => {
      return <Dropdown.Item key={'action' + i} as={React.forwardRef<any, any>((props, ref) => {
        if (act.to)
          return <Link ref={ref} {...props} className={`dropdown-item ${act.className}`} to={act.to}>{act.text}</Link>;
        else
          return <span className={`dropdown-item clickable ${act.className}`} onClick={(event) => {
            props?.onClick(event);
            if (act.modal) {
              handleShow();
              setModalAction(act)
            } else {
              act?.onClick(event);
            }
          }}> {act.text}</span>
      }
      )}>
      </Dropdown.Item>
    })
  }, [actions])

  return (<>
    <Dropdown drop='left' className={`clickable ${className}`}>
      <Dropdown.Toggle className="self-align-center" title="actions" as={CustomToggle}></Dropdown.Toggle>
      <Dropdown.Menu >
        {actionItems}
      </Dropdown.Menu>
    </Dropdown>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalAction?.modal.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalAction?.modal.text}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {text.modal.cancel}
        </Button>
        <Button variant="primary" onClick={(event) => { modalAction?.onClick(event); handleClose(); }}>
          {text.modal.confirm}
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )

}
