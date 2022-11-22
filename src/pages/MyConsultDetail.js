import React from 'react';
import { useParams } from 'react-router-dom';
import ConsultDetailBody from '../components/MyPageMyConsult/ConsultDetailBody';
import ConsultDetailComment from '../components/MyPageMyConsult/ConsultDetailComment';
import MyConsultHeader from '../components/MyPageMyConsult/MyConsultHeader';
import Layout from '../global/components/Layout';

export default function MyConsultDetail() {
  const { id: Id } = useParams();
  return (
    <Layout>
      <MyConsultHeader text={'상담게시글'} page={sessionStorage.getItem('accountstate') === '0' ? '/myconsult' : -1} />
      <ConsultDetailBody id={Id} />
      <ConsultDetailComment id={Id} />
    </Layout>
  );
}
