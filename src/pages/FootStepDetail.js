import React from 'react';
import Layout from '../global/components/Layout';
import Header from '../components/footstepdetail/Header';
import ImageList from '../components/footstepdetail/ImageList';
import Address from '../components/footstepdetail/Address';
import Tab from '../components/footstepdetail/Tab';
import Basic from '../components/footstepdetail/Basic';
import CheckList from '../components/footstepdetail/CheckList';

export default function FootStepDetail() {
  return (
    <Layout>
      <Header />
      <ImageList />
      <Address />
      <Tab />
      <CheckList />
      <Basic />
    </Layout>
  );
}
