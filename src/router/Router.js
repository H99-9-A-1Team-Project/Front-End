import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import SignUp from '../pages/SignUp';
import MyPage from '../pages/MyPage';
import Request from '../pages/RequestMain';
import './route.css';
import MyPageMyConsult from '../pages/MyPageMyConsult';
export default function Router() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/request" element={<Request />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/myconsult" element={<MyPageMyConsult />} />
      </Routes>
    </div>
  );
}
