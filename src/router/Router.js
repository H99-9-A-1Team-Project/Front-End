import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import SignUp from '../pages/SignUp';
import MyPage from '../pages/MyPage';
import Request from '../pages/RequestMain';
import Request1 from '../pages/Request1';
import Request2 from '../pages/Request2';
import Request3 from '../pages/Request3';
import RequestCheck from '../pages/RequestCheck';
import MyPageMyConsult from '../pages/MyPageMyConsult';
import MyPageAdmin from '../pages/MyPageAdmin';
import FootstepMain from '../pages/FootstepMain';
import NewFootStep from '../pages/NewFootStep';
import MyConsultDetail from '../pages/MyConsultDetail';
import MyPageRealtorConsult from '../pages/MyPageRealtorConsult';
import FootStepDetail from '../pages/FootStepDetail';
import IntroducePage from '../pages/IntroducePage';
import MainPageSideBar from '../components/main/MainPageSideBar';
import styled from 'styled-components';
import DefaultLeft from './DefaultLeft';
import DefaultRight from './DefaultRight';

export default function Router() {
  return (
    <>
      <Container>
        <DefaultLeft />
        <App>
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
          <MainPageSideBar />
        </App>
        <DefaultRight />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
`;

const App = styled.div`
  width: 360px;
  min-height: 100vh;
  max-height: fit-content;
  display: flex;
  flex-direction: row;
  background-color: white;
  box-shadow: 0px 8px 12px 6px rgba(0, 0, 0, 0.1), 0px 4px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const Backgrounds = styled.div`
  background-color: #edf0f3;
  width: 100%;
`;

const LeftHeadline = styled.div`
  font-family: var(--headline-font-family);
  color: var(--gray1);
  margin-left: 120px;
  margin-top: 331px;
  cursor: default;
  font-size: 32px;
  line-height: 48.9px;
`;

const LogoImg = styled.img`
  margin-left: 112px;
  margin-top: 12px;
  width: 167px;
  height: 40.02px;
`;

const LeftHome1 = styled.img`
  position: absolute;
  margin-top: 341.24px;
  margin-left: 180px;
  z-index: 1;
  opacity: 0.66;
`;
const LeftHome2 = styled.img`
  position: absolute;
  margin-left: 454px;
  margin-top: 255px;
  z-index: 0;
  opacity: 0.6;
`;
