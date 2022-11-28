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
import MyPageMyConsult from '../pages/MyPageMyConsult';
import MyPageAdmin from '../pages/MyPageAdmin';
import FootstepMain from '../pages/FootstepMain';
import NewFootStep from '../pages/NewFootStep';
import MyConsultDetail from '../pages/MyConsultDetail';
import MyPageRealtorConsult from '../pages/MyPageRealtorConsult';
import FootStepDetail from '../pages/FootStepDetail';
import IntroducePage from '../pages/IntroducePage';
export default function Router() {
  return (
    <>
      <div className="container">
        <div className="default"></div>
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
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/myconsult" element={<MyPageMyConsult />} />
            <Route path="/admin" element={<MyPageAdmin />} />
            <Route path="/footstepmain" element={<FootstepMain />} />
            <Route path="/newfootstep" element={<NewFootStep />} />
            <Route path="/myconsultdetail/:id" element={<MyConsultDetail />} />
            <Route path="/waitlist" element={<MyPageRealtorConsult />} />
            <Route path="/answeredlist" element={<MyPageRealtorConsult />} />
            <Route path="footstepmain/:id" element={<FootStepDetail />} />
            <Route path="/introduce" element={<IntroducePage />} />
          </Routes>
        </div>
        <div className="default"></div>
      </div>
    </>
  );
}
