import React, { PropsWithChildren, useContext, useMemo } from 'react';
import * as _ from 'lodash';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import {Logged} from './logged';
import { useLanguage } from '@bit/martonis.react.language';
import { TextContext } from '@bit/martonis.react.text';

export interface Page {
    route: string
}
export interface Category {
    text: string;
    pages: Page[]
}

export interface SideNavProps {
    menu: (Page|Category)[];
    toggled: boolean; 
    title: string;
    className?: string;
    routesPath: {[x:string]: string};
    userContext: React.Context<{username: string}>
}

export const SideNav = ({ menu, toggled, title, className = '', routesPath, userContext, ...props }: PropsWithChildren<SideNavProps>) => {
    const text = useContext(TextContext)
    const location = useLocation();

    const items = useMemo(() => {
        const getLink = (page: Page) => {
            const key = _.findKey(routesPath, value => value == page.route)
            const selected = location.pathname.includes(page.route);

            return <li key={page.route}>
                <Link  className={`list-group-item list-group-item-action bg-light ${selected ? 'text-info' : ''}`} to={page.route} >
                    {text.routes[key]}
                    </Link>
            </li>
        }

        const getCategory = (category: Category) => {
            return [
                <li key={category.text} className="separator"><span className="text-muted">{category.text}</span></li>,
                ..._.map(category.pages, getLink) 
            ]
        }

        const isPage = (item: Page|Category): item is Page => {
            return (item as any).route;
        }

        return _.map(menu, (item) => {    
            if(isPage(item))
                return getLink(item);
            else
                return getCategory(item);
        })
    }, [ location.pathname ])

    return (
        <Col id="sidebar-wrapper" {...props} className={`${className} bg-light border-right ${toggled ? 'toggled' : ''}`}>
            <div className="h-100 list-group-flush d-flex flex-column">
                <div className="sidebar-heading">{title}</div> 
                    <ul className="list-unstyled d-flex flex-column flex-grow-1 col overflow-auto">
                        {items}
                    </ul>
                   <Logged userContext={userContext}/>
            </div>
        </Col>
    );
}