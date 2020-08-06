import queryString from 'query-string';
import { useQueryParams, withDefault, NumberParam, SetQuery } from "use-query-params";

export type PageInfo = {page: number, itemsPerPage: number }
export type Pagination = {skip: number, limit: number}

export const usePage = (): [PageInfo, (pageInfo: PageInfo) => void, Pagination] => {
    const [pageInfo, setPageInfo] = useQueryParams({
        page: withDefault(NumberParam, 1),
        itemsPerPage: withDefault(NumberParam, 10),
      });

    const skip = pageInfo.itemsPerPage * (pageInfo.page - 1);
    const pagination = {
        skip,
        limit: pageInfo.itemsPerPage
    }

    return [<any>pageInfo, setPageInfo, pagination]
}