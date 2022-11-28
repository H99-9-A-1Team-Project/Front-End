import { useRecoilValue } from 'recoil';
import AdminMyPageArticle from '../components/admin/AdminMyPageArticle';
import MainPageHeader from '../components/main/MainPageHeader';
import MainPageSideBar from '../components/main/MainPageSideBar';
import MainPageTabBar from '../components/main/MainPageTabBar';
import LoginMyPageArticle from '../components/MyPage/LoginMyPageArticle';
import LogoutMyPageArticle from '../components/MyPage/LogoutMyPageArticle';
import Layout from '../global/components/Layout';
import OuterLayout from '../global/components/OuterLayout';
import { isLogin } from '../store/store';

export default function MyPage() {
  const loginState = useRecoilValue(isLogin);
  const accountstate = sessionStorage.getItem('accountstate');
  return (
    <Layout>
      <MainPageHeader />
      {accountstate === '2' ? <AdminMyPageArticle /> : !loginState ? <LogoutMyPageArticle /> : <LoginMyPageArticle />}
      <MainPageTabBar />
    </Layout>
  );
}
