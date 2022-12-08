import React from 'react';
import styled from 'styled-components';
import Layout from '../global/components/Layout';
import Header from '../components/onboading/Header';
import Article from '../components/onboading/Article';
import Footer from '../components/onboading/Footer';

export default function OnBoading() {
  return (
    <Layout>
      <Header />
      <Article />
      <Footer />
    </Layout>
  );
}
