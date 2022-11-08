import ConsultingList from '../components/list/ConsultingList';
import MainPageHeader from '../components/main/MainPageHeader';
import MyPageLayout from '../components/mypage/MyPageLayout';

export default function MyPageConsultingList() {
  return (
    <MyPageLayout>
      <MainPageHeader />
      <ConsultingList />
    </MyPageLayout>
  );
}
