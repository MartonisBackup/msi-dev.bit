import React, { PropsWithoutRef, useMemo, Dispatch, SetStateAction } from "react";
import _ from 'lodash';
import { Table, Pagination, Container } from 'react-bootstrap'
import {TablePagination, ITablePagination } from "./pagination";

export type Metadata<T> = {
    name: string,
    value: (item: T) => string,
    className?: string
}

export type TableText = { [x: string]: string | TableText }
export interface DataTableProps<T> extends ITablePagination {
    metadata: Metadata<T>[];
    data: T[];
    text: TableText;
    onClick?: (item:T) => void;
}

export function DataTable<T>({ metadata, data, text, totalCount, pageInfo = null, onClick, setPageInfo }: PropsWithoutRef<DataTableProps<T>>) {
    const getHead = useMemo(() => {
  
        return _.map(metadata, (meta) => {
            return <th key={meta.name} scope="col">{_.get(text, meta.name)}</th>
        });

    }, [text])
    const getBody = useMemo(() => {
        if (data)
            return _.map(data, (item, index) => {
                const tds = _.map(metadata, meta => {
                    return <td className={meta.className} key={meta.name + index}>{meta.value(item)}</td>
                })
                return <tr className={onClick ? 'clickable' : ''} onClick={event => { onClick?.(item) }} key={'tr' + index} >{tds}</tr>
            });
        else return [];
    }, [data])

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <Table responsive size="sm" striped >
                <thead>
                    <tr>
                        {getHead}
                    </tr>
                </thead>
                <tbody>
                    {getBody}
                </tbody>
            </Table>
            <TablePagination totalCount={totalCount} pageInfo={pageInfo} setPageInfo={setPageInfo}/>
        </div>
    );
}
