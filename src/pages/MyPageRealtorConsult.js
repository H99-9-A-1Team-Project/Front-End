import React from 'react';
import MainPageTabBar from '../components/main/MainPageTabBar';
import MyConsultHeader from '../components/MyPageMyConsult/MyConsultHeader';
import MyConsultSearch from '../components/MyPageMyConsult/MyConsultSearch';
import RealtorConsult from '../components/MyPageMyConsult/RealtorConsult';
import Layout from '../global/components/Layout';

export default function MyPageRealtorConsult() {
  return (
    <Layout>
      <MyConsultHeader text={window.location.pathname === '/waitlist' ? '대기중인 상담' : '답변한 상담'} page={'/mypage'} />
      <MyConsultSearch />
      <RealtorConsult />
      <MainPageTabBar />
    </Layout>
  );
}
