import React from 'react';
import MainPageHeader from '../components/main/MainPageHeader';
import RequestArticle from '../components/requestmain/RequestMainArticle';
import RequestList from '../components/requestmain/RequestMainList';
import MainPageTabBar from '../components/main/MainPageTabBar';
import Layout from '../global/components/MyPageLayout';

export default function Request() {
  return (
    <Layout>
      <MainPageHeader />
      <RequestArticle />
      <RequestList />
      <MainPageTabBar />
    </Layout>
  );
}
