import React from 'react'
import { Redirect, Route } from 'react-router'
import auth from './auth-helper'
const PrivateRoute = ({component: Component, ...rest}) => {
   <Route {...rest} render={props => (
       auth.isAuthenticated() ? (
           <Component {...props}/>
       ) : (
           <Redirect to={{
               pathname: '/signin',
               state: { from: props.location }
           }} />
       )
   )} />
}

export default PrivateRoute
