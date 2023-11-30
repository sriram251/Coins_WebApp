

import React from 'react'
import { Navigate } from 'react-router-dom';

function AuthRoute({ component: Component, isAuthenticated, ...rest }) {

  console.log(Component,isAuthenticated)
  return <div>{isAuthenticated ? <Component {...rest} /> : <Navigate to="/" />}</div>
   
}

export default AuthRoute