import React from 'react';
import ConsultDetailBody from '../components/MyPageMyConsult/ConsultDetailBody';
import ConsultDetailComment from '../components/MyPageMyConsult/ConsultDetailComment';
import MyConsultHeader from '../components/MyPageMyConsult/MyConsultHeader';
import Layout from '../global/components/Layout';

export default function MyConsultDetail() {
  return (
    <Layout>
      <MyConsultHeader text={'상담게시글'} page={sessionStorage.getItem('accountstate') === '0' ? '/mypage' : -1} />
      <ConsultDetailBody />
      <ConsultDetailComment />
    </Layout>
  );
}
