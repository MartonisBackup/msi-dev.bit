import React, { PropsWithChildren, useState, useEffect, ReactElement, useMemo, useCallback, PropsWithoutRef } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FilterOptions } from '../masterpage.context';
import { Form, Col, ButtonGroup, Button, Container, Collapse } from 'react-bootstrap';
import _ from 'lodash';
import * as langs from '../lang';
import { useLanguage } from '@bit/martonis.react.language';

export const FilterForm = ({ setCurrentFilter, filterOptions, setSearchToggled, searchToggled }: PropsWithoutRef<{ searchToggled: boolean, setCurrentFilter: (UserFilter) => void, filterOptions: FilterOptions, setSearchToggled: (show: boolean) => void }>) => {
    const [text, lang] = useLanguage(langs);
    const { elements, query: [filter, setFilter] } = filterOptions;

    const form = useForm({ defaultValues: filter });
    useEffect(() => {
        setCurrentFilter(_.pickBy(filter))
    }, [filter]);

    const cleanFilter = useCallback(() => {
        form.reset(_.mapValues(filter, x => x ?? ''));
        setFilter({}, 'replace');
        setTimeout(() => { setSearchToggled(false) }, 1000);
    }, [])

    const submitFilter = useCallback(form.handleSubmit((data) => {
        setFilter(_.pickBy(data), 'replace');
        setTimeout(() => { setSearchToggled(false) }, 400);
    }), []);

    useEffect(() => {
        return () => {
            setSearchToggled(false);
        }
    }, []);

    return (
        <Collapse in={searchToggled}>
        <Container>
            <FormProvider {...form}  >
                <Form onSubmit={submitFilter}>
                    <Form.Row >
                        {elements}
                    </Form.Row>
                    <Form.Row >
                        <Col className='d-flex justify-content-end'>
                            <ButtonGroup className="mx-1">
                                <Button variant="secondary" onClick={cleanFilter}>{text.filter.clean}</Button>
                            </ButtonGroup>
                            <ButtonGroup className="mx-1">
                                <Button variant="primary" type="submit">{text.filter.save}</Button>
                            </ButtonGroup>
                        </Col>
                    </Form.Row>
                </Form>
            </FormProvider>
        </Container>
        </Collapse>
    )
}