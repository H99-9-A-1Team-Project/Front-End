import React from 'react';
import styled from 'styled-components';
import path_left from '../../global/sources/Expand_left_light.svg';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <BackBtn
        src={path_left}
        onClick={() => {
          navigate('/');
        }}
      />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  position: relative;
  width: 360px;
  height: 64px;
  border-bottom: 1px solid var(--gray6);
  margin-bottom: 0;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const BackBtn = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 16px;
  margin-top: 20px;
  margin-bottom: 20px;
  cursor: pointer;
`;
