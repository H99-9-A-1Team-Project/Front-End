import React from 'react';
import IntroduceBody from '../components/introduce/IntroduceBody';
import MyConsultHeader from '../components/MyPageMyConsult/MyConsultHeader';
import Layout from '../global/components/Layout';

export default function IntroducePage() {
  return (
    <Layout>
      <MyConsultHeader text={'어떤 서비스인가요?'} page={-1} />
      <IntroduceBody />
    </Layout>
  );
}
