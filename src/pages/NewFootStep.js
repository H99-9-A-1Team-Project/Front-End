import React from 'react';
import Layout from '../global/components/Layout';
import MainPageTabBar from '../components/main/MainPageTabBar';
import NewFootStepHeader from '../components/newFootStep/NewFootStepHeader';
import NewFootStepAddress from '../components/newFootStep/NewFootStepAddress';
export default function NewFootStep() {
  return (
    <Layout>
      <NewFootStepHeader />
      <NewFootStepAddress />
      <MainPageTabBar />
    </Layout>
  );
}
