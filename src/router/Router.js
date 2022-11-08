import { Routes, Route } from 'react-router-dom';

import MyPage from '../pages/MyPage';
import MainPage from '../pages/MainPage';
import RequestPage from '../pages/RequestPage';
import MyPageConsultingList from '../pages/ConsultingList';

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/request" element={<RequestPage />} />
        <Route path="/consultinglist" element={<MyPageConsultingList />} />
      </Routes>
    </>
  );
}
