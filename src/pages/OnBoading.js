import React from 'react';
import Layout from '../components/onboading/Layout';
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
