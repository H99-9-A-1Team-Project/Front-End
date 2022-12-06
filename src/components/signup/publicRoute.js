import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLogin } from '../../store/store';

function PublicRoute({ children }) {
  return isLogin === true ? <Navigate to="/" /> : children;
}

export default PublicRoute;

