import React from 'react';
import AdminBody from '../components/admin/AdminBody';
import MainPageTabBar from '../components/main/MainPageTabBar';
import MyConsultHeader from '../components/MyPageMyConsult/MyConsultHeader';
import Layout from '../global/components/Layout';

export default function MyPageAdmin() {
  return (
    <Layout>
      <MyConsultHeader text={'계정목록'} page={'/mypage'} />
      <AdminBody />
      <MainPageTabBar />
    </Layout>
  );
}

