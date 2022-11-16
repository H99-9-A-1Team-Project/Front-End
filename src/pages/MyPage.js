import { useRecoilValue } from 'recoil';
import MainPageHeader from '../components/main/MainPageHeader';
import MainPageTabBar from '../components/main/MainPageTabBar';
import LoginMyPageArticle from '../components/MyPage/LoginMyPageArticle';
import LogoutMyPageArticle from '../components/MyPage/LogoutMyPageArticle';
import Layout from '../global/components/Layout';
import { isLogin } from '../store/store';

export default function MyPage() {
  const loginState = useRecoilValue(isLogin);
  return (
    <Layout>
      <MainPageHeader />
      {!loginState ? <LogoutMyPageArticle /> : <LoginMyPageArticle />}
      <MainPageTabBar />
    </Layout>
  );
}
