import { Routes, Route } from 'react-router-dom';
import Mainpage from '../pages/MainPage';
import MyPage from '../pages/MyPage';

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </>
  );
}
