import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ReadUser } from '../../api/api';
import { Context } from "../context/Context";

class ProtectedRoute extends React.Component {
    static contextType = Context;

    render() {
        const { component: Component, ...rest } = this.props;
        const { context, dispatch } = this.context;

        return (
        <Route {...rest}>
            {
            context.loading ? 
                (
                    <div>LOADING dot dot dot</div>
                ) :
                (
                    context.auth ? 
                    (
                        <Component/>
                    ) :
                    (
                        <Redirect to={{ pathname: '/login' }} />
                    )
                )
            }
        </Route>
        );
    }
}

export default ProtectedRoute;