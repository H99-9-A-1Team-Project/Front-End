import React from 'react';
import styled from 'styled-components';
import '../../global/global.css';
import imgHomeOFF from '../../global/tabBar/Home_OFF.png';
import imgHomeON from '../../global/tabBar/Home_ON.png';
import imgPinOFF from '../../global/tabBar/Pin_OFF.png';
import imgPinON from '../../global/tabBar/Pin_ON.png';
import imgRequestOFF from '../../global/tabBar/Request_OFF.png';
import imgRequestON from '../../global/tabBar/Request_ON.png';
import imgUserOFF from '../../global/tabBar/User_OFF.png';
import imgUserON from '../../global/tabBar/User_ON.png';
import { tabBarHome, tabBarPin, tabBarRequest, tabBarUser } from '../../store/store';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

export default function MainPageTabBar() {
  const navigate = useNavigate();
  const [tbHome, setTbHome] = useRecoilState(tabBarHome);
  const [tbPin, setTbPin] = useRecoilState(tabBarPin);
  const [tbReqeust, setTbRequest] = useRecoilState(tabBarRequest);
  const [tbUser, setTbUser] = useRecoilState(tabBarUser);

  const onClickTab = (click) => {
    if (click === 1) {
      setTbHome(1);
      setTbPin(0);
      setTbRequest(0);
      setTbUser(0);
    } else if (click === 2) {
      setTbHome(0);
      setTbPin(1);
      setTbRequest(0);
      setTbUser(0);
    } else if (click === 3) {
      setTbHome(0);
      setTbPin(0);
      setTbRequest(1);
      setTbUser(0);
    } else if (click === 4) {
      setTbHome(0);
      setTbPin(0);
      setTbRequest(0);
      setTbUser(1);
    }
  };
  return (
    <TabBarContainer>
      <HomeContainer>
        <HomeBox
          onClick={() => {
            onClickTab(1);
            navigate('/');
          }}
        >
          {tbHome === 0 ? <HomeImg src={imgHomeOFF} /> : <HomeImg src={imgHomeON} />}
          <HomeP tbHome={tbHome}>홈</HomeP>
        </HomeBox>
      </HomeContainer>
      <PinContainer>
        <PinBox onClick={() => onClickTab(2)}>
          <PinImgBox>{tbPin === 0 ? <PinImgOFF src={imgPinOFF} /> : <PinImgON src={imgPinON} />}</PinImgBox>
          <PinP tbPin={tbPin}>발품기록</PinP>
        </PinBox>
      </PinContainer>
      <RequestContainer>
        <RequestBox
          onClick={() => {
            onClickTab(3);
            navigate('/request');
          }}
        >
          {tbReqeust === 0 ? <RequestImg src={imgRequestOFF} /> : <HomeImg src={imgRequestON} />}
          <RequestP tbReqeust={tbReqeust}>매물상담</RequestP>
        </RequestBox>
      </RequestContainer>
      <UserContainer>
        <UserBox onClick={() => onClickTab(4)}>
          {tbUser === 0 ? <UserImg src={imgUserOFF} /> : <UserImg src={imgUserON} />}
          <UserP tbUser={tbUser}>마이페이지</UserP>
        </UserBox>
      </UserContainer>
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
  width: 15px;
  height: 16.9px;
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
