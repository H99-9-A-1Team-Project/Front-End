import ConsultingDetailComponent from '../components/list/ConsultingDetailComponent';
import MainPageHeader from '../components/main/MainPageHeader';
import MyPageLayout from '../components/mypage/MyPageLayout';

export default function ConsultingDetailPage() {
  return (
    <MyPageLayout>
      <MainPageHeader />
      <ConsultingDetailComponent />
    </MyPageLayout>
  );
}
