import MainPageHeader from '../components/main/MainPageHeader';
import MainPageTabBar from '../components/main/MainPageTabBar';
import MyPageArticle from '../components/MyPage/MyPageArticle';
import MyPageLayout from '../components/MyPage/MyPageLayout';

export default function MyPage() {
  return (
    <MyPageLayout>
      <MainPageHeader />
      <MyPageArticle />
      <MainPageTabBar />
    </MyPageLayout>
  );
}
