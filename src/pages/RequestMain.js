import React from 'react';
import MainPageHeader from '../components/main/MainPageHeader';
import RequestArticle from '../components/requestmain/requestMainArticle';
import RequestList from '../components/requestmain/requestMainList';
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
