import React, { useEffect } from 'react';
import MainPageTabBar from '../components/main/MainPageTabBar';
import FootstepMainArticle from '../components/footstepmain/FootstepMainArticle';
import Layout from '../global/components/Layout';
import { useRecoilValue } from 'recoil';
import { isLogin } from '../store/store';
import { useNavigate } from 'react-router-dom';

export default function FootstepMain() {
  const LoginState = useRecoilValue(isLogin);
  const navigate = useNavigate();
  useEffect(() => {
    if (LoginState === false) {
      navigate('/');
    }
  });
  return (
    <>
      <Layout>
        <FootstepMainArticle />
        <MainPageTabBar />
      </Layout>
    </>
  );
}
