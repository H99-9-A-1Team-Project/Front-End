import React from 'react';
import Layout from '../global/components/Layout';
import RqHeader from '../components/request/RequestHeader';
import RqProgress from '../components/request/RequestProgress';
import RqHeadline from '../components/request/RqHeadline';
import Request2Article from '../components/request/Request2Article';

export default function Request2() {
  return (
    <Layout>
      <RqHeader />
      <RqProgress />
      <RqHeadline />
      <Request2Article />
    </Layout>
  );
}
