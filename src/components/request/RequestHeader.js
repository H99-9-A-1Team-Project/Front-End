import React from 'react';
import styled from 'styled-components';
import Path from './source/rqhPath.png';
import { useNavigate } from 'react-router-dom';

export default function RequestHeader() {
  const navigate = useNavigate();
  const onBack = () => {
    navigate('/request');
  };
  return (
    <HeaderContainer>
      <HeaderPath
        src={Path}
        onClick={() => {
          onBack();
        }}
      />
      <HeaderP
        onClick={() => {
          onBack();
        }}
      >
        상담 신청하기
      </HeaderP>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 360px;
  height: 64px;
  background: none;
  display: flex;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const HeaderPath = styled.img`
  width: 24px;
  height: 24px;
  margin-top: 20px;
  margin-left: 16px;
  background: none;
  cursor: pointer;
`;

const HeaderP = styled.p`
  background: none;
  margin-left: 8px;
  margin: 22px 0 22px 8px;
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
  cursor: pointer;
`;
