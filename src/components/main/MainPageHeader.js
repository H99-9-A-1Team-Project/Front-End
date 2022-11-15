import React from 'react';
import styled from 'styled-components';
import Logo from './sources/main_header_name.png';
import Menu from './sources/main_header_menu.png';
import { Navigate, useNavigate } from 'react-router-dom';

export default function MainPageHeader() {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <StLogo src={Logo} onClick={() => navigate('/')} />
      <StMenu src={Menu} />
    </HeaderContainer>
  );
}

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
  margin-left: 16px;
  margin-top: 20px;
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
