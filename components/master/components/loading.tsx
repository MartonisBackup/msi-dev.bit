import React, { PropsWithChildren } from "react";
import { Spinner } from "react-bootstrap";

export const LoadingOverlay = ({load, ...props }: PropsWithChildren<{ load: boolean }>) => {
    if(!load)
        return null;

    return (
        <div {...props} className="overlay d-flex align-items-center justify-content-center">
          <Spinner animation="grow" />
        </div>
    );
}