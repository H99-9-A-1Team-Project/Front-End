import React from 'react';
import Layout from '../global/components/MyPageLayout';
import RqHeader from '../components/request/RequestHeader';
import RqProgress from '../components/request/RequestProgress';
import RqHeadline from '../components/request/RqHeadline';
import Request3Article from '../components/request/Request3Article';
export default function Request3() {
  return (
    <Layout>
      <RqHeader />
      <RqProgress />
      <RqHeadline />
      <Request3Article />
    </Layout>
  );
}
