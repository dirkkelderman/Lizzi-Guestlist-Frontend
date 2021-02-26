import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute  = ({component: Component, user, ...rest}) => {

  const isAuthenticated = localStorage.getItem('user');

  console.log({component: Component, isAuthenticated, ...rest})
    return (
      <Route
        {...rest}
        render={ props  => {

          return isAuthenticated ? 
          (<Component {...props} userInSession={isAuthenticated}/>)
          :
          (<Redirect to={{pathname: '/login', state: {from: props.location}}} />)
            // if(isAuthenticated){
            //   return <Component {...props} userInSession={isAuthenticated}/>
            // } else {
            //   return <Redirect to={{pathname: '/login', state: {from: props.location}}} />
            // }
          }
        }
      />
    )
}
export default ProtectedRoute;
