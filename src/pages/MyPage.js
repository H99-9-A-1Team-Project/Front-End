import MyPageBody from '../components/mypage/MyPageBody';
import MyPageHeader from '../components/mypage/MyPageHeader';
import MyPageLayout from '../components/mypage/MyPageLayout';

export default function MyPage() {
  return (
    <MyPageLayout>
      <MyPageHeader />
      <MyPageBody />
    </MyPageLayout>
  );
}
