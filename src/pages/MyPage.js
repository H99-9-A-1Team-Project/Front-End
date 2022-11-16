import { useRecoilValue } from 'recoil';
import MainPageHeader from '../components/main/MainPageHeader';
import MainPageTabBar from '../components/main/MainPageTabBar';
import AdminMyPageArticle from '../components/MyPage/AdminMyPageArticle';
import LoginMyPageArticle from '../components/MyPage/LoginMyPageArticle';
import LogoutMyPageArticle from '../components/MyPage/LogoutMyPageArticle';
import Layout from '../global/components/Layout';
import { isLogin } from '../store/store';

export default function MyPage() {
  const loginState = useRecoilValue(isLogin);
  const accountstate = sessionStorage.getItem('accountstate');
  return (
    <Layout>
      <MainPageHeader />
      {/* {accountstate === 2 ? <AdminMyPageArticle /> : !loginState ? <LogoutMyPageArticle /> : <LoginMyPageArticle />} */}
      {true ? <AdminMyPageArticle /> : !loginState ? <LogoutMyPageArticle /> : <LoginMyPageArticle />}
      <MainPageTabBar />
    </Layout>
  );
}
