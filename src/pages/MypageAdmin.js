import MainPageHeader from '../components/main/MainPageHeader';
import MyPageBodyAdmin from '../components/mypage/MyPageBodyAdmin';
import MyPageLayout from '../components/mypage/MyPageLayout';

export default function MypageAdmin() {
  return (
    <MyPageLayout>
      <MainPageHeader />
      <MyPageBodyAdmin />
    </MyPageLayout>
  );
}
