import React from 'react';
import AdminBody from '../components/admin/AdminBody';
import MainPageSideBar from '../components/main/MainPageSideBar';
import MainPageTabBar from '../components/main/MainPageTabBar';
import MyConsultHeader from '../components/MyPageMyConsult/MyConsultHeader';
import Layout from '../global/components/Layout';
import OuterLayout from '../global/components/OuterLayout';

export default function MyPageAdmin() {
  return (
    <OuterLayout>
      <Layout>
        <MyConsultHeader text={'계정목록'} page={'/mypage'} />
        <AdminBody />
        <MainPageTabBar />
      </Layout>
      <MainPageSideBar />
    </OuterLayout>
  );
}
