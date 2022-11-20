import React from 'react';
import Layout from '../global/components/Layout';
import RqHeader from '../components/request/RequestHeader';
import RqProgress from '../components/request/RequestProgress';
import RqHeadline from '../components/request/RqHeadline';
import Rq1Article from '../components/request/Request1Article';
export default function Request1() {
  return (
    <Layout>
      <RqHeader />
      <RqProgress />
      <RqHeadline />
      <Rq1Article />
    </Layout>
  );
}
