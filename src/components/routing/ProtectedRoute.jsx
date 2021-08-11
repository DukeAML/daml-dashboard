import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Context } from "../../context/Context";

const ProtectedRoute = props => {

    const { context } = useContext(Context);
    const { component: Component, ...rest } = props;

    // Load component if auth, otherwise push to login
    return (
        <Route {...rest}>
            {
                context.auth ?
                    (
                        <Component />
                    ) :
                    (
                        <Redirect to={{ pathname: '/login' }} />
                    )
            }
        </Route>
    );
}

export default ProtectedRoute;