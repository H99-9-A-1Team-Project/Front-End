import { Routes, Route } from 'react-router-dom';
import MyPage from '../pages/MyPage';
import MainPage from '../pages/MainPage';
import RequestPage from '../pages/RequestPage';
import MyPageConsultingList from '../pages/ConsultingList';
import StanbyList from '../pages/StandbyList';
import DoneList from '../pages/DoneList';
import FootStepMain from '../pages/FootStepMain';
import NewFootStep from '../pages/NewFootStep';

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/request" element={<RequestPage />} />
        <Route path="/consultinglist" element={<MyPageConsultingList />} />
        <Route path="/stanbylist" element={<StanbyList />} />
        <Route path="/donelist" element={<DoneList />} />
        <Route path="/footstep" element={<FootStepMain />} />
        <Route path="/newfootstep" element={<NewFootStep />} />
      </Routes>
    </>
  );
}
