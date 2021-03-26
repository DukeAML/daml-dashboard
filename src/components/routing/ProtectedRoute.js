import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Context } from "../../context/Context";

class ProtectedRoute extends React.Component {
    static contextType = Context;

    render() {
        const { component: Component, ...rest } = this.props;
        const { context } = this.context;
        
        // Load component if auth, otherwise push to login
        return (
            <Route {...rest}>
                {
                    context.auth ? 
                    (
                        <Component/>
                    ) :
                    (
                        <Redirect to={{ pathname: '/login' }} />
                    )
                }
            </Route>
        );
    }
}

export default ProtectedRoute;