import { useQuery } from '@tanstack/react-query';
import { ReadProfile } from '../api/apiGET';
import MainPageHeader from '../components/main/MainPageHeader';
import MyPageBody from '../components/mypage/MyPageBody';
import MyPageBodyAdmin from '../components/mypage/MyPageBodyAdmin';
import MyPageLayout from '../components/mypage/MyPageLayout';

export default function MyPage() {
  const { data } = useQuery(['profile'], ReadProfile, {
    refetchOnWindowFocus: false,
    onSuccess: (temp) => {
      sessionStorage.setItem('accountState', data?.accountstate);
    },
  });
  return (
    <MyPageLayout>
      <MainPageHeader />
      {data?.accountstate === 2 ? <MyPageBodyAdmin /> : <MyPageBody />}
    </MyPageLayout>
  );
}
