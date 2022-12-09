import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLogin } from '../../store/store';

function PublicRoute({ children }) {
  const AppLogin = useRecoilValue(isLogin);
  return AppLogin === true ? <Navigate to="/" /> : children;
}

export default PublicRoute;
