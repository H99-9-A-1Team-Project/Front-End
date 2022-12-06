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
import FootStepDetailImg from '../pages/FootStepDetailImg';
import MainPageSideBar from '../components/main/MainPageSideBar';
import styled from 'styled-components';
import background from '../global/sources/background.png';
import logo from '../global/sources/main_header_name.png';
import right_arrow from '../global/sources/path_right.png';
import DeleteId from '../pages/DeleteId';
import MyPageAdminDeleteList from '../pages/MyPageAdminDeleteList';
import ToastMessage from '../global/components/ToastMessage';
import { useRecoilState } from 'recoil';
import { toastVisible, TextToast } from '../store/store';

export default function Router() {
  const [visible, setVisible] = useRecoilState(toastVisible);
  // toast 에 들어갈 문구 recoilstate
  const [toasttext, setToastText] = useRecoilState(TextToast);
  return (
    <>
      <Container>
        <div className="left_container">
          <div className="left_container_text_box">
            <div className="left_container_text_1">부동산 안전 거래 지킴이</div>
            <img src={logo} alt="logo" />
          </div>
        </div>
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
            <Route path="/deletelist" element={<MyPageAdminDeleteList />} />
            <Route path="/footstepmain" element={<FootstepMain />} />
            <Route path="/newfootstep" element={<NewFootStep />} />
            <Route path="/myconsultdetail/:id" element={<MyConsultDetail />} />
            <Route path="/waitlist" element={<MyPageRealtorConsult />} />
            <Route path="/answeredlist" element={<MyPageRealtorConsult />} />
            <Route path="footstepmain/:id" element={<FootStepDetail />} />
            <Route path="footstepmain/:id/:id" element={<FootStepDetailImg />} />
            <Route path="/introduce" element={<IntroducePage />} />
            <Route path="/deleteid" element={<DeleteId />} />
          </Routes>
          <MainPageSideBar />
          <ToastMessage text={toasttext} />
        </App>
        <div className="right_container">
          <div className="right_container_button">
            베타 서비스 설문 참여하기
            <img src={right_arrow} alt="" />
          </div>
          <div className="right_container_text">
            <div className="right_container_text_1">FE 조병민 김성욱 김하나</div>
            <div className="right_container_text_2">BE 장경원 유은정 정규재</div>
            <div className="right_container_text_1">UI/UX 손하영</div>
          </div>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  @media (max-width: 1280px) {
    background-image: none;
  }
  background-color: var(--gray6);
  background-image: url(${background});
  background-repeat: no-repeat;
  background-position: bottom;
  .left_container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 1280px) {
      display: none;
    }
    .left_container_text_1 {
      font-family: var(--headline-font-family);
      font-size: 32px;
      font-weight: 500;
      line-height: 48.9px;
    }
    img {
      width: 167px;
      height: 40px;
      margin: 12px 0 0 -5px;
    }
  }
  .left_container_text_box {
    margin: 332px auto auto auto;
  }
  .right_container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    margin: auto 32px 24px auto;
    @media (max-width: 1280px) {
      display: none;
    }
    .right_container_button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 245px;
      height: 56px;
      background-color: white;
      border-radius: 8px;
      margin-bottom: 40px;
      font-family: var(--headline-font-family);
      font-size: var(--body_Large-font-size);
      font-weight: var(--body_Large-font-weight);
      line-height: var(--button_Large-line-height);
      letter-spacing: var(--button_Large-letter-spacing);
      color: var(--primary2-400);
      cursor: pointer;
      img {
        width: 24px;
        height: 24px;
        padding-left: 8px;
        margin-right: -12px;
      }
    }
    .right_container_text {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: flex-end;
      justify-content: flex-end;
      font-family: var(--headline-font-family);
      font-size: var(--body_Medium-font-size);
      font-weight: var(--body_Medium-font-weight);
      line-height: var(--body_Medium-line-height);
      letter-spacing: var(--body_Medium-letter-spacing);
      color: var(--gray3);
      .right_container_text_1,
      .right_container_text_2 {
        margin-right: 16px;
      }
    }
  }
`;

const App = styled.div`
  width: 360px;
  height: 100vh;
  /* max-height: fit-content; */
  /* display: flex; */
  flex-direction: row;
  align-items: flex-end;
  background-color: white;
  box-shadow: var(--Shadow3-box-shadow);
  z-index: 1;
`;
