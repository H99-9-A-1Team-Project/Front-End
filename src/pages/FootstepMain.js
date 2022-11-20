import React from 'react';
import MainPageTabBar from '../components/main/MainPageTabBar';
import FootstepMainArticle from '../components/footstepmain/FootstepMainArticle';
import Layout from '../global/components/Layout';

export default function FootstepMain() {
  return (
    <>
      <Layout>
        <FootstepMainArticle />
        <MainPageTabBar />
      </Layout>
    </>
  );
}
