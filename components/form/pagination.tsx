import React, { Dispatch, SetStateAction, PropsWithoutRef }  from 'react';
import { Pagination } from 'react-bootstrap';
import { createUltimatePagination, ITEM_TYPES } from 'react-ultimate-pagination';
import { PageInfo } from './hooks/usePage';

export type ITablePagination = {
    totalCount: number;
    pageInfo?: PageInfo;
    setPageInfo?: Dispatch<SetStateAction<PageInfo>>;
}

const InternalPagination = createUltimatePagination({
  WrapperComponent: Pagination,
  itemTypeToComponent: {
    [ITEM_TYPES.PAGE]: ({value, isActive, onClick}) => (
      <Pagination.Item onClick={onClick} data-value={value} active={isActive}>{value}</Pagination.Item>
    ),
    [ITEM_TYPES.ELLIPSIS]: ({value, isActive, onClick}) => (
      <Pagination.Ellipsis data-value={value} onClick={onClick}/>
    ),
    [ITEM_TYPES.FIRST_PAGE_LINK]: ({isActive, onClick}) => (
      <Pagination.First data-value={1} disabled={isActive} onClick={onClick}/>
    ),
    [ITEM_TYPES.PREVIOUS_PAGE_LINK]: ({value, isActive, onClick}) => (
      <Pagination.Prev data-value={value} disabled={isActive} onClick={onClick}/>
    ),
    [ITEM_TYPES.NEXT_PAGE_LINK]: ({value, isActive, onClick}) => (
      <Pagination.Next data-value={value} disabled={isActive} onClick={onClick}/>
    ),
    [ITEM_TYPES.LAST_PAGE_LINK]: ({value, isActive, onClick}) => (
      <Pagination.Last data-value={value} disabled={isActive} onClick={onClick}/>
    ),
  },
});

export const TablePagination = ({setPageInfo, totalCount, pageInfo}:  PropsWithoutRef<ITablePagination>) => {
    if(!totalCount || !pageInfo)
        return null;

    const totalPages = Math.ceil(totalCount / pageInfo.itemsPerPage);

    return (
        <InternalPagination
          currentPage={pageInfo.page}
          totalPages={totalPages}
          onChange={(value) => { setPageInfo({ ...pageInfo, page: value })}}
          boundaryPagesRange={1}
          siblingPagesRange={2}
        />
      );

}