import React from 'react'
import AuthStore from '../Store/Auth.store';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({children}) => {
  const {isAuthenticated} = AuthStore();
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PublicRoute
