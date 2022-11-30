import React from 'react';
import MyConsultHeader from '../components/MyPageMyConsult/MyConsultHeader';
import DeleteIdPageArticle from '../components/MyPage/DeleteIdPageArticle';
import Layout from '../global/components/Layout';

export default function DeleteId() {
  return (
    <Layout>
      <MyConsultHeader text={'회원탈퇴'} page={'/mypage'} />
      <DeleteIdPageArticle />
    </Layout>
  );
}
