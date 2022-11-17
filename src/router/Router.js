import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import SignUp from '../pages/SignUp';
import MyPage from '../pages/MyPage';
import Request from '../pages/RequestMain';
import Request1 from '../pages/Request1';
import Request2 from '../pages/Request2';
import Request3 from '../pages/Request3';
import './route.css';
import RequestCheck from '../pages/RequestCheck';
export default function Router() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="request" element={<Request />} />
        <Route path="mypage" element={<MyPage />} />
        <Route path="request1" element={<Request1 />} />
        <Route path="request2" element={<Request2 />} />
        <Route path="request3" element={<Request3 />} />
        <Route path="requestcheck" element={<RequestCheck />} />
      </Routes>
    </div>
  );
}
