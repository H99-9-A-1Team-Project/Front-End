import React from 'react';
import MainPageHeader from '../components/main/MainPageHeader';
import MainPageArticle from '../components/main/MainPageArticle';
import MainPageBanner from '../components/main/MainPageBanner';
import MainPageTabBar from '../components/main/MainPageTabBar';
import Layout from '../global/components/Layout';
import MainPageSideBar from '../components/main/MainPageSideBar';
import styled from 'styled-components';
import { useState } from 'react';
import { useRef } from 'react';

function Mainpage() {
  const [visible, setVisible] = useState(false);

  return (
    <StMainPageLayout>
      <Layout>
        <MainPageHeader setVisible={setVisible} />
        <MainPageArticle />
        <MainPageBanner />
        <MainPageTabBar />
      </Layout>
      <MainPageSideBar visible={visible} setVisible={setVisible} />
    </StMainPageLayout>
  );
}
export default React.memo(Mainpage);

const StMainPageLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;
