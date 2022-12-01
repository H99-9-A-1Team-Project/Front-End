import React from 'react';
import MainPageHeader from '../components/main/MainPageHeader';
import MainPageArticle from '../components/main/MainPageArticle';
import MainPageBanner from '../components/main/MainPageBanner';
import MainPageTabBar from '../components/main/MainPageTabBar';
import Layout from '../global/components/Layout';

function Mainpage() {
  return (
    <Layout>
      <MainPageHeader />
      <MainPageArticle />
      <MainPageBanner />
      <MainPageTabBar />
    </Layout>
  );
}
export default React.memo(Mainpage);
