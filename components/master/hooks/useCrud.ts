import { useQueryParam, BooleanParam } from "use-query-params";
import { useParams, useHistory } from "react-router";
import { DocumentNode } from "graphql";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useMemo, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useForm, UseFormOptions } from "react-hook-form";
import _ from "lodash";
import { IAction } from "../masterpage.context";

export type CrudAction = {
    query: DocumentNode; 
    response: string; 
    omit?: string[]; 
    variable?:  (id: string, data?: any) => { [x: string]: any } 
}

export type ActionText = { title?: string, action: string; message?: string; modal?: { title: string; text: string } };

export type Crud = {
    view: CrudAction ;
    insert: CrudAction;
    update: CrudAction;
    delete: CrudAction;
}

export type GetVariables = (id: string, edit: boolean) => { [x: string]: any };

export type ActionsText = {
    insert?: ActionText;
    delete?: ActionText;
    update?: ActionText;
    view: ActionText;
};

export type CrudOptions = {
    crud: Crud;
    basePath: { list: string, view: string };
    actionsText: ActionsText;
    formOptions?: UseFormOptions;
}

export const useCrud = ({ crud, basePath, actionsText, formOptions: formOptions = {} }: CrudOptions) => {
    const history = useHistory();
    const [edit, setEdit] = useQueryParam("edit", BooleanParam);
    let { id } = useParams();
    const form = useForm(formOptions);
    const { reset, handleSubmit } = form;
    const [getUser, { loading: getLoading, error: getError, data: getData }] = useLazyQuery(crud.view.query, { variables: crud.view.variable(id) });
    const [insertUser, { error: insertError, loading: insertLoading }] = useMutation(crud.insert.query);
    const [updateUser, { error: updateError, loading: updateLoading }] = useMutation(crud.update.query,  { refetchQueries: [{ query: crud.view.query, variables: crud.view.variable(id) }] })
    const [deleteUser, { loading: deleteLoading, error: deleteError }] = useMutation(crud.delete.query, { variables: crud.delete.variable(id) })


    const { mutation, actions, paths } = useMemo(() => {
        const editAction: IAction = actionsText.update ? { text: actionsText.update.action, onClick: () => { setEdit(true) } } : null
        const viewAction: IAction = actionsText.view ? { text: actionsText.view.action, onClick: () => { setEdit(false) } } : null;
        const deleteAction: IAction = actionsText.delete ? {
            text: actionsText.delete.action, modal: { text: actionsText.delete.modal.text, title: actionsText.delete.modal.title.replace('{0}', id) }, className: 'text-danger', onClick: async () => {
                const res = await deleteUser();
                if (res.data && !res.errors) {
                    const value = _.get(res.data, crud.delete.response);
                    toast.success(actionsText.delete.message.replace('{0}', value));
                    history.push(basePath.list);
                }
            }
        } : null;

        if (id) {
            if (edit) {
                return { mutation: updateUser, actions: [viewAction, deleteAction], paths: [basePath.list, [basePath.view, actionsText.update.title.replace('{0}', id)]] }
            } else {
                return { actions: [editAction, deleteAction], paths: [basePath.list, [basePath.view, actionsText.view.title.replace('{0}', id)]] }
            }
        } else {
            return { mutation: insertUser, actions: [], paths: [basePath.list, [basePath.view, actionsText.insert.title]] }
        }
    }, [id, edit, actionsText])

    useEffect(() => {
        if (id) {
            getUser();
        }
    }, [id])

    useEffect(() => {
        if (getData) {
            reset(_.get(getData, crud.view.response));
        }
    }, [getData])

    const submit = useCallback(handleSubmit(async (item) => {
        let crudAction: CrudAction; 
        let actionText: ActionText;
        if(id) {
            crudAction = crud.update;
            actionText = actionsText.update;
        } else {
            crudAction = crud.insert;
            actionText = actionsText.insert;
        }
        
        const formData = _.pickBy(item, (value, key) => key[0] != '_');
        const variable = crudAction.variable(id, formData);
        const res = await mutation?.({ variables: variable })

        if (res?.data && !res.errors) {
            const value = _.get(res.data, crudAction.response);
            const message = actionText.message.replace('{0}', value)
            toast.success(message);
            history.push(`${basePath.view}/${value}`);
        }
    }), [mutation, id, actionsText])

    const masterOptions = {
        paths: paths,
        loading: insertLoading || updateLoading || getLoading || deleteLoading,
        actions: actions
    }

    return { form, id, edit, submit, editable: !!mutation, masterOptions }
}