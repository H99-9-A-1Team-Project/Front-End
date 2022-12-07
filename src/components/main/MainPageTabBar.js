import React, { useEffect } from 'react';
import styled from 'styled-components';
import '../../global/global.css';
import imgHomeOFF from '../../global/sources/Home_outlined.svg';
import imgHomeON from '../../global/sources/Home_fill.svg';
import imgPinOFF from '../../global/sources/Pin_outlined.svg';
import { ReactComponent as ImgPinOn } from '../../global/sources/Pin_fill.svg';
import imgRequestOFF from '../../global/sources/Chat_outlined.svg';
import imgRequestON from '../../global/sources/Chat_fill.svg';
import imgUserOFF from '../../global/sources/User_outlined.svg';
import imgUserON from '../../global/sources/User_fill.svg';
import { TabAccountState, tabBarHome, tabBarPin, tabBarRequest, tabBarUser } from '../../store/store';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

export default function MainPageTabBar() {
  const navigate = useNavigate();
  const [tbHome, setTbHome] = useRecoilState(tabBarHome);
  const [tbPin, setTbPin] = useRecoilState(tabBarPin);
  const [tbReqeust, setTbRequest] = useRecoilState(tabBarRequest);
  const [tbUser, setTbUser] = useRecoilState(tabBarUser);
  const [tbAccountState, setTbAccountState] = useRecoilState(TabAccountState);

  //새로고침했을 때 툴바 유지를 위해 useEffect 사용, 발품기록 추가 필요
  useEffect(() => {
    setTbAccountState(sessionStorage.getItem('accountstate'));
    if (tbAccountState === '0' || tbAccountState === null) {
      if (window.location.pathname === '/') {
        setTbHome(1);
        setTbPin(0);
        setTbRequest(0);
        setTbUser(0);
      }
      if (window.location.pathname === '/request') {
        setTbHome(0);
        setTbPin(0);
        setTbRequest(1);
        setTbUser(0);
      }
      if (window.location.pathname === '/mypage' || window.location.pathname === '/myconsult' || window.location.pathname === '/waitlist' || window.location.pathname === '/answeredlist') {
        setTbHome(0);
        setTbPin(0);
        setTbRequest(0);
        setTbUser(1);
      }
    }

    if (tbAccountState === '1' || tbAccountState === '2') {
      if (window.location.pathname === '/') {
        setTbHome(1);
        setTbRequest(0);
        setTbUser(0);
      }
      if (window.location.pathname === '/mypage' || window.location.pathname === '/myconsult' || window.location.pathname === '/waitlist' || window.location.pathname === '/answeredlist') {
        setTbHome(0);
        setTbRequest(0);
        setTbUser(1);
      }
    }
  });

  const onClickTab = (click) => {
    if (tbAccountState === '0' || tbAccountState === null) {
      if (click === 1) {
        navigate('/');
        setTbHome(1);
        setTbPin(0);
        setTbRequest(0);
        setTbUser(0);
      } else if (click === 2) {
        navigate('/footstepmain');
        setTbHome(0);
        setTbPin(1);
        setTbRequest(0);
        setTbUser(0);
      } else if (click === 3) {
        navigate('/request');
        setTbHome(0);
        setTbPin(0);
        setTbRequest(1);
        setTbUser(0);
        const localToken = localStorage.getItem('access_token');
        const sessToken = sessionStorage.getItem('access_token');
        const localAccountState = localStorage.getItem('accountstate');
        const sessAccountState = sessionStorage.getItem('accountstate');
        if ((localToken !== null && localAccountState === '0') || (sessToken !== null && sessAccountState === '0')) {
        } else if ((localToken !== null && localAccountState !== '0') || (sessToken !== null && sessAccountState !== '0')) {
          alert('일반 회원만 접근 가능합니다.');
        } else if (localToken === null && sessToken === null) {
          navigate('/signup');
        }
      } else if (click === 4) {
        navigate('/mypage');
        setTbHome(0);
        setTbPin(0);
        setTbRequest(0);
        setTbUser(1);
      }
    } else if (tbAccountState === '1' || tbAccountState === '2') {
      console.log('dd');
      if (click === 1) {
        navigate('/');
        setTbHome(1);
        setTbRequest(0);
        setTbUser(0);
      } else if (click === 3) {
        navigate('/waitlist');
        setTbHome(0);
        setTbPin(0);
        setTbRequest(0);
        setTbUser(1);
      } else if (click === 4) {
        navigate('/mypage');
        setTbHome(0);
        setTbPin(0);
        setTbRequest(0);
        setTbUser(1);
      }
    }
  };

  return (
    <TabBarContainer>
      {tbAccountState === null || tbAccountState === '0' ? (
        <>
          <HomeContainer>
            <HomeBox
              onClick={() => {
                onClickTab(1);
              }}
            >
              {tbHome === 0 ? <HomeImg src={imgHomeOFF} /> : <HomeImg src={imgHomeON} />}
              <HomeP tbHome={tbHome}>홈</HomeP>
            </HomeBox>
          </HomeContainer>
          <PinContainer>
            <PinBox onClick={() => onClickTab(2)}>
              <PinImgBox>{tbPin === 0 ? <PinImgOFF src={imgPinOFF} /> : <ImgPinOn fill="#3c6eef" />}</PinImgBox>
              <PinP tbPin={tbPin}>발품기록</PinP>
            </PinBox>
          </PinContainer>
          <RequestContainer>
            <RequestBox
              onClick={() => {
                onClickTab(3);
              }}
            >
              {tbReqeust === 0 ? <RequestImg src={imgRequestOFF} /> : <HomeImg src={imgRequestON} />}
              <RequestP tbReqeust={tbReqeust}>매물상담</RequestP>
            </RequestBox>
          </RequestContainer>
          <UserContainer>
            <UserBox
              onClick={() => {
                onClickTab(4);
              }}
            >
              {tbUser === 0 ? <UserImg src={imgUserOFF} /> : <UserImg src={imgUserON} />}
              <UserP tbUser={tbUser}>마이페이지</UserP>
            </UserBox>
          </UserContainer>
        </>
      ) : (
        <>
          <RealtorHomeContainer>
            <RealtorHomeBox
              onClick={() => {
                onClickTab(1);
              }}
            >
              {tbHome === 0 ? <RealtorHomeImg src={imgHomeOFF} /> : <RealtorHomeImg src={imgHomeON} />}
              <RealtorHomeP tbHome={tbHome}>홈</RealtorHomeP>
            </RealtorHomeBox>
          </RealtorHomeContainer>
          <RealtorRequestContainer>
            <RealtorRequestBox
              onClick={() => {
                onClickTab(3);
              }}
            >
              {tbReqeust === 0 ? <RealtorRequestImg src={imgRequestOFF} /> : <RealtorHomeImg src={imgRequestON} />}
              <RealtorRequestP tbReqeust={tbReqeust}>매물상담</RealtorRequestP>
            </RealtorRequestBox>
          </RealtorRequestContainer>
          <RealtorUserContainer>
            <RealtorUserBox
              onClick={() => {
                onClickTab(4);
              }}
            >
              {tbUser === 0 ? <RealtorUserImg src={imgUserOFF} /> : <RealtorUserImg src={imgUserON} />}
              <RealtorUserP tbUser={tbUser}>마이페이지</RealtorUserP>
            </RealtorUserBox>
          </RealtorUserContainer>
        </>
      )}
    </TabBarContainer>
  );
}

const TabBarContainer = styled.div`
  width: 360px;
  height: 84px;
  background-color: white;
  border-top: 1px solid var(--gray6);
  display: flex;
  flex-direction: row;
  margin-top: auto;
`;

const HomeContainer = styled.div`
  width: 90px;
  height: 84px;
  background: none;
  cursor: pointer;
`;

const PinContainer = styled.div`
  width: 90px;
  height: 84px;
  background: none;
  cursor: pointer;
`;

const RequestContainer = styled.div`
  width: 90px;
  height: 84px;
  background: none;
  cursor: pointer;
`;

const UserContainer = styled.div`
  width: 90px;
  height: 84px;
  background: none;
  cursor: pointer;
`;

const HomeBox = styled.div`
  width: 32px;
  height: 52px;
  display: flex;
  flex-direction: column;
  background: none;
  margin-left: 29px;
  margin-top: 16px;
`;

const HomeImg = styled.img`
  width: 32px;
  height: 32px;
  background: none;
  margin: 0 auto;
`;

const HomeP = styled.p`
  background: none;
  margin: 0 auto;
  font-family: var(--button-font-family);
  font-size: var(--button_Small-font-size);
  font-weight: var(--button_Small-font-weight);
  line-height: var(--button_Small-line-height);
  letter-spacing: var(--button_Small-letter-spacing);
  color: ${({ tbHome }) => `${tbHome === 0 ? 'var(--gray2)' : 'var(--primary2-400)'}`};
`;

const PinBox = styled.div`
  width: 43px;
  height: 52px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
  margin-left: 23.5px;
  margin-top: 16px;
`;

const PinImgBox = styled.div`
  width: 32px;
  height: 32px;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1px;
`;

const PinImgOFF = styled.img`
  background: none;
`;

const PinImgON = styled.img`
  width: 32px;
  height: 32px;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PinP = styled.p`
  width: 44px;
  background: none;
  margin-bottom: 4px;
  font-family: var(--button-font-family);
  font-size: var(--button_Small-font-size);
  font-weight: var(--button_Small-font-weight);
  line-height: var(--button_Small-line-height);
  letter-spacing: var(--button_Small-letter-spacing);
  color: ${({ tbPin }) => `${tbPin === 0 ? 'var(--gray2)' : 'var(--primary2-400)'}`};
`;

const RequestBox = styled.div`
  width: 43px;
  height: 52px;
  display: flex;
  flex-direction: column;
  background: none;
  margin-left: 23.5px;
  margin-top: 16px;
`;

const RequestImg = styled.img`
  width: 32px;
  height: 32px;
  background: none;
  margin: 0 auto;
`;

const RequestP = styled.p`
  width: 44px;
  background: none;
  margin: 0 auto;
  font-family: var(--button-font-family);
  font-size: var(--button_Small-font-size);
  font-weight: var(--button_Small-font-weight);
  line-height: var(--button_Small-line-height);
  letter-spacing: var(--button_Small-letter-spacing);
  color: ${({ tbReqeust }) => `${tbReqeust === 0 ? 'var(--gray2)' : 'var(--primary2-400)'}`};
`;

const UserBox = styled.div`
  width: 54px;
  height: 44px;
  display: flex;
  flex-direction: column;
  background: none;
  margin-left: 18px;
  margin-top: 20px;
`;

const UserImg = styled.img`
  width: 24px;
  height: 24px;
  background: none;
  margin: 0 auto;
`;

const UserP = styled.p`
  width: 55px;
  background: none;
  margin: 0 auto;
  margin-top: 4px;
  font-family: var(--button-font-family);
  font-size: var(--button_Small-font-size);
  font-weight: var(--button_Small-font-weight);
  line-height: var(--button_Small-line-height);
  letter-spacing: var(--button_Small-letter-spacing);
  color: ${({ tbUser }) => `${tbUser === 0 ? 'var(--gray2)' : 'var(--primary2-400)'}`};
`;

const RealtorHomeContainer = styled.div`
  width: 120px;
  height: 84px;
  background: none;
  cursor: pointer;
`;

const RealtorRequestContainer = styled.div`
  width: 120px;
  height: 84px;
  background: none;
  cursor: pointer;
`;

const RealtorUserContainer = styled.div`
  width: 120px;
  height: 84px;
  background: none;
  cursor: pointer;
`;

const RealtorHomeBox = styled.div`
  width: 32px;
  height: 52px;
  display: flex;
  flex-direction: column;
  background: none;
  margin-left: 44px;
  margin-top: 16px;
`;

const RealtorHomeImg = styled.img`
  width: 32px;
  height: 32px;
  background: none;
  margin: 0 auto;
`;

const RealtorHomeP = styled.p`
  background: none;
  margin: 0 auto;
  font-family: var(--button-font-family);
  font-size: var(--button_Small-font-size);
  font-weight: var(--button_Small-font-weight);
  line-height: var(--button_Small-line-height);
  letter-spacing: var(--button_Small-letter-spacing);
  color: ${({ tbHome }) => `${tbHome === 0 ? 'var(--gray2)' : 'var(--primary2-400)'}`};
`;

const RealtorRequestBox = styled.div`
  width: 43px;
  height: 52px;
  display: flex;
  flex-direction: column;
  background: none;
  margin-left: 38.5px;
  margin-top: 16px;
`;

const RealtorRequestImg = styled.img`
  width: 32px;
  height: 32px;
  background: none;
  margin: 0 auto;
`;

const RealtorRequestP = styled.p`
  width: 44px;
  background: none;
  margin: 0 auto;
  font-family: var(--button-font-family);
  font-size: var(--button_Small-font-size);
  font-weight: var(--button_Small-font-weight);
  line-height: var(--button_Small-line-height);
  letter-spacing: var(--button_Small-letter-spacing);
  color: ${({ tbReqeust }) => `${tbReqeust === 0 ? 'var(--gray2)' : 'var(--primary2-400)'}`};
`;

const RealtorUserBox = styled.div`
  width: 54px;
  height: 44px;
  display: flex;
  flex-direction: column;
  background: none;
  margin-left: 33px;
  margin-top: 20px;
`;

const RealtorUserImg = styled.img`
  width: 24px;
  height: 24px;
  background: none;
  margin: 0 auto;
`;

const RealtorUserP = styled.p`
  width: 55px;
  background: none;
  margin: 0 auto;
  margin-top: 4px;
  font-family: var(--button-font-family);
  font-size: var(--button_Small-font-size);
  font-weight: var(--button_Small-font-weight);
  line-height: var(--button_Small-line-height);
  letter-spacing: var(--button_Small-letter-spacing);
  color: ${({ tbUser }) => `${tbUser === 0 ? 'var(--gray2)' : 'var(--primary2-400)'}`};
`;
