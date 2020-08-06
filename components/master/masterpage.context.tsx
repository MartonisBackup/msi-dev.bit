import React, { ReactElement, Dispatch, SetStateAction, MouseEventHandler } from "react";
import { QueryParamConfigMap, DecodedValueMap, SetQuery } from "use-query-params";

export interface IAction {
    text: string;
    to?: string;
    onClick?: MouseEventHandler<any>;
    modal?: { title: string; text: string; }
    className?: string;
  }

export type FilterOptions = { elements: ReactElement, query: [DecodedValueMap<QueryParamConfigMap>, SetQuery<QueryParamConfigMap>] };
export interface IMasterContext  { 
    setFilter: (options: FilterOptions) => void;  
    setLoad: (loading: boolean) => void; 
    setActions: (actions: IAction[]) => void; 
    setBreadcrumb: (paths: (string|string[])[]) => void
}

const masterContext: IMasterContext = { 
    setFilter: (options) => {}, 
    setLoad:(loading: boolean) => {}, 
    setActions: (actions: IAction[]) => {},
    setBreadcrumb: (paths: string[]) => {}
}

export const MasterContext = React.createContext(masterContext);
