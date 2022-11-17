import React from 'react';
import Layout from '../global/components/MyPageLayout';
import RqHeader from '../components/request/RequestHeader';
import RqProgress from '../components/request/RequestProgress';
import RqHeadline from '../components/request/RqHeadline';
import ReqeustCheckAt from '../components/request/RequestCheckArticle';

export default function RequestCheck() {
  return (
    <Layout>
      <RqHeader />
      <RqProgress />
      <RqHeadline />
      <ReqeustCheckAt />
    </Layout>
  );
}
