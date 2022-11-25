import React from 'react';
import MyConsultBody from '../components/MyPageMyConsult/MyConsultBody';
import MyConsultHeader from '../components/MyPageMyConsult/MyConsultHeader';
import MyConsultSearch from '../components/MyPageMyConsult/MyConsultSearch';

import Layout from '../global/components/Layout';

export default function MyPageMyConsult() {
  return (
    <Layout>
      <MyConsultHeader text={'내 상담'} page={'/mypage'} />
      <MyConsultSearch />
      <MyConsultBody />
    </Layout>
  );
}
