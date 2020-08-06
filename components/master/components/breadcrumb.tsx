import React, { PropsWithChildren, useContext, useMemo } from 'react';
import * as _ from 'lodash';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';
import { TextContext } from '@bit/martonis.react.text';


export const Crumbs = ({ breadcrumbs, routesPath, className = '', ...props }: PropsWithChildren<{ className?: string, breadcrumbs: (string|string[])[], routesPath: {[x:string]: string} }>) => {
    if(!breadcrumbs)
        return null;

    const text = useContext(TextContext);

    const items = useMemo(() => {
        return _.map(['/home', ...breadcrumbs], (b, i) => {
            const sliced = i === 0 ? [b] : breadcrumbs.slice(0, i);
            const path = Array.isArray(b) ? b[0] : b;
            const bread = Array.isArray(b) && b[1] ? b[1] : text.routes[_.findKey(routesPath, value => value == path)];
            const active = i === breadcrumbs.length;

            return <Breadcrumb.Item active={active} key={'action' + i} as={React.forwardRef<any, any>(({ active, ...props }, ref) => {
                return !active ? <Link {...props} to={sliced.join('')}>{bread}</Link> : <span {...props}>{bread}</span>
            })} />
        });
    }, [breadcrumbs])


    return (
            <Breadcrumb listProps={{ className: `bg-light p-0 mb-0 ${className}` }}>
                {items}
            </Breadcrumb>
    );
}