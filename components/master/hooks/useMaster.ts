import { useContext, useEffect, ReactElement } from "react";
import _ from 'lodash';
import { MasterContext, FilterOptions, IAction } from "../masterpage.context";

export const useMaster = ({ loading, paths = [], actions, filterOption }: { filterOption?: FilterOptions, loading?: boolean, actions?: IAction[], paths?: (string | string[])[] }) => {
    const { setFilter, setLoad,  setActions, setBreadcrumb } = useContext(MasterContext);
    useEffect(() => {

        setFilter(filterOption);

        return () => {
            setFilter(null);
        }
    }, [filterOption])

    useEffect(() => {

        setLoad(loading);

        return () => {
            setLoad(false);
        }
    }, [loading])

    useEffect(() => {

        setActions(actions);

        return () => {
            setActions(null);
        }
    },[actions])
    useEffect(() => {

        setBreadcrumb(paths);

        return () => {
            setBreadcrumb(null);
        }
    }, [paths])
    
}
