import React, { useContext, Props, useCallback } from 'react';
import Person from 'bootstrap-icons/icons/person.svg';
import CaretRight from 'bootstrap-icons/icons/caret-right.svg'
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { LanguageSelect } from '@bit/martonis.react.language';
import { UserContext } from '../masterpage';

export const Logged = ({ userContext }: { userContext: UserContext }) => {
    const user = useContext(userContext);
    const [, , removeCookies] = useCookies()

    const listItem = React.forwardRef((props, ref: any) => {
        return (
            <div {...props} className="d-flex align-items-center justify-content-end pointer list-group-item list-group-item-info list-group-item-action">
                <LanguageSelect className="mr-auto" />
                <div className="d-flex mt-1 mr-2" ref={ref}>
                    <Person />
                </div>
                {user?.username ?? 'Loading'}
                <div className="ml-2">{<CaretRight/>}</div>
            </div>
        )
    })

    const logout = useCallback(() => {
        removeCookies('access_token');
    }, [])

    return (
        <Dropdown className="">
             
            <Dropdown.Toggle variant="success" id="dropdown-basic" as={listItem}></Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>


        </Dropdown>
    )
}