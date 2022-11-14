import React from 'react';
import MainPageHeader from '../components/main/MainPageHeader';
import RequestArticle from '../components/request/requestArticle';
import RequestList from '../components/request/requestList';
import MainPageTabBar from '../components/main/MainPageTabBar';
export default function Request() {
  return (
    <>
      <MainPageHeader />
      <RequestArticle />
      <RequestList />
      <MainPageTabBar />
    </>
  );
}
