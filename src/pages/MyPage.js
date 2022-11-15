import MainPageHeader from '../components/main/MainPageHeader';
import MainPageTabBar from '../components/main/MainPageTabBar';
import MyPageArticle from '../components/MyPage/MyPageArticle';
import Layout from '../global/components/MyPageLayout';

export default function MyPage() {
  return (
    <Layout>
      <MainPageHeader />
      <MyPageArticle />
      <MainPageTabBar />
    </Layout>
  );
}
