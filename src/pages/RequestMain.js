import React from 'react';
import MainPageHeader from '../components/main/MainPageHeader';
import RequestArticle from '../components/requestmain/RequestMainArticle';
import RequestList from '../components/requestmain/RequestMainList';
import MainPageTabBar from '../components/main/MainPageTabBar';
import Layout from '../global/components/Layout';
import { useRecoilValue } from 'recoil';
import { isLogin } from '../store/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Request() {
  const LoginState = useRecoilValue(isLogin);
  const navigate = useNavigate();
  useEffect(() => {
    if (LoginState === false) {
      navigate('/');
    }
  });
  return (
    <Layout>
      <MainPageHeader />
      <RequestArticle />
      <RequestList />
      <MainPageTabBar />
    </Layout>
  );
}
