import MainPageHeader from '../components/main/MainPageHeader';
import MyPageLayout from '../components/mypage/MyPageLayout';
import StandbyList from '../components/list/StandbyList';

export default function StanbyList() {
  return (
    <MyPageLayout>
      <MainPageHeader />
      <StandbyList />
    </MyPageLayout>
  );
}
