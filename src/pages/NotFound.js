import React from 'react';
import MainPageHeader from '../components/main/MainPageHeader';
import MainPageTabBar from '../components/main/MainPageTabBar';
import Layout from '../global/components/Layout';
import NotFoundBody from '../notfound/NotFoundBody';

export default function NotFound() {
  return (
    <Layout>
      <MainPageHeader />
      <NotFoundBody />
      <MainPageTabBar />
    </Layout>
  );
}
