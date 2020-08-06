import React, { PropsWithChildren, useState, useEffect, ReactElement, useMemo, useCallback } from 'react';
import './master.scss';
import CarretLeft from 'bootstrap-icons/icons/caret-left.svg'
import CarretRight from 'bootstrap-icons/icons/caret-right.svg'
import Refresh from 'bootstrap-icons/icons/arrow-clockwise.svg'
import { useMediaQuery } from 'react-responsive'
import {SideNav, Page, Category, Crumbs, Actions, FilterIcon, LoadingOverlay, FilterForm } from './components';
import { MasterContext, FilterOptions } from './masterpage.context';
import { Collapse, Container, Navbar, Row, Col } from 'react-bootstrap';
import _ from 'lodash';
import { useApolloClient } from '@apollo/client';

export type UserContext =  React.Context<{username: string} & any>;

export interface MasterPageProps {
  title: string;
  menu: (Page | Category)[];
  userContext: UserContext;
  routesPath: {[x:string]: string};
}

export function Masterpage({ children, title, menu, routesPath, userContext }: PropsWithChildren<MasterPageProps>) {
  const client = useApolloClient();

  const [toggled, setToggled] = useState(false)
  const [searchToggled, setSearchToggled] = useState(false)
  const [currentFilter, setCurrentFilter] = useState(null)
  const [filter, setFilter] = useState<FilterOptions>(null)
  const [load, setLoad] = useState(false)
  const [actions, setActions] = useState(null)
  const [breadcrumb, setBreadcrumb] = useState<(string | string[])[]>(null);

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 768px)'
  })

  useEffect(() => {
    setToggled(!isDesktopOrLaptop)
  }, [isDesktopOrLaptop])

  const refresh = useCallback(async () => {
    setLoad(true);
    await client.resetStore()
    setLoad(false);
  }, [])

  const Arrow = toggled ? CarretRight : CarretLeft;

  const filterForm = useMemo(() => {
    if(filter) {
      return <FilterForm filterOptions={filter} setSearchToggled={setSearchToggled} setCurrentFilter={setCurrentFilter} searchToggled={searchToggled} />
    } else 
      return null;
  },[filter, searchToggled])
  
  const child = useMemo(() => children, []);
  return (
      <MasterContext.Provider value={{ setFilter, setLoad, setActions, setBreadcrumb }}>
          <Col id="wrapper" className="p-0">
            <Row className="w-100">
              <SideNav toggled={toggled} title={title} menu={menu} routesPath={routesPath} userContext={userContext} />
              <Col className="flex-grow-1 pr-0 d-flex flex-column">
                <Navbar bg="light" expand="lg" className="row border-bottom d-flex align-items-center">
                  <div className="d-flex">
                    <Arrow className="" onClick={() => { setToggled(!toggled) }} style={{}} />
                  </div>
                  <div className={`d-flex pb-1 mx-2`}>
                    <Crumbs breadcrumbs={breadcrumb} routesPath={routesPath} className="" />
                  </div>
                  <div className="ml-auto row align-items-center">
                    <div className="d-flex clickable">
                      <Refresh className={load ? `spin` : ''} onClick={refresh} style={{}} />
                    </div>
                    <Actions className="d-flex" actions={actions} />
                    <FilterIcon className="d-flex" currentFilter={currentFilter} show={!!filter} setSearchToggled={setSearchToggled} />
                  </div>
                </Navbar>

                <Row className="flex-grow-1 position-relative d-flex flex-column pt-1">
                  { filter ? filterForm : null}
                  <LoadingOverlay load={load} />
                  <Container className="flex-grow-1 pt-1">{child}</Container>
                </Row>
              </Col>
            </Row>
          </Col>
      </MasterContext.Provider>
  );
}