import React from 'react';
import styled from 'styled-components';
import Logo from '../../global/sources/logo.svg';
import Menu from '../../global/sources/Menu.svg';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { sideTabBar } from '../../store/store';

function MainPageHeader() {
  const navigate = useNavigate();
  const setVisible = useSetRecoilState(sideTabBar);

  return (
    <HeaderContainer>
      <StLogo src={Logo} onClick={() => navigate('/')} />
      <StMenu src={Menu} onClick={() => setVisible(true)} />
    </HeaderContainer>
  );
}
export default React.memo(MainPageHeader);

const HeaderContainer = styled.div`
  width: 100%;
  height: 64px;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
`;

const StLogo = styled.img`
  width: 97.5px;
  height: 24px;
  background-color: #ffffff;
  margin: 20px 0 20px 16px;
  cursor: pointer;
`;

const StMenu = styled.img`
  position: absolute;
  width: 24px;
  height: 24px;
  background-color: #ffffff;
  margin-left: 320px;
  margin-top: 20px;
  cursor: pointer;
`;
