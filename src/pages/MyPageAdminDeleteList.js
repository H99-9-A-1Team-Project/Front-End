import React from 'react';
import AdminDeleteIdList from '../components/admin/AdminDeleteIdList';
import MainPageTabBar from '../components/main/MainPageTabBar';
import MyConsultHeader from '../components/MyPageMyConsult/MyConsultHeader';
import Layout from '../global/components/Layout';

export default function MyPageAdminDeleteList() {
  return (
    <Layout>
      <MyConsultHeader text={'탈퇴 계정 목록'} page={'/mypage'} />
      <AdminDeleteIdList />
      <MainPageTabBar />
    </Layout>
  );
}
