import MainPageHeader from '../components/main/MainPageHeader';
import MyPageLayout from '../components/mypage/MyPageLayout';
import DoneListComponent from '../components/list/DoneListComponent';

export default function DoneList() {
  return (
    <MyPageLayout>
      <MainPageHeader />
      <DoneListComponent />
    </MyPageLayout>
  );
}
