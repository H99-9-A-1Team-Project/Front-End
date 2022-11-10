import MainPageHeader from '../components/main/MainPageHeader';
import MyPageBody from '../components/mypage/MyPageBody';
import MyPageBodyAdmin from '../components/mypage/MyPageBodyAdmin';
import MyPageLayout from '../components/mypage/MyPageLayout';

export default function MyPage() {
  const accountState = 2;
  return (
    <MyPageLayout>
      <MainPageHeader />
      {accountState === 2 ? <MyPageBodyAdmin /> : <MyPageBody />}
    </MyPageLayout>
  );
}
