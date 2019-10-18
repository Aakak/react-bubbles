import React from "react";
import {Route, Redirect } from 'react-router-dom';

const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      isAuthenticated() === true
        ? <Component {...props} />
        : <Redirect to='/BubblesPage' />
    )} />
  )
export default PrivateRoute;