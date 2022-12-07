import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLogin } from '../../store/store';

function PublicRoute({ children }) {
  const [AppLogin, setAppLogin] = useRecoilState(isLogin);
  return AppLogin === true ? <Navigate to="/" /> : children;
}

export default PublicRoute;

