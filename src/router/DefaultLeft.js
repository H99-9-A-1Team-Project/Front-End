import React from 'react';
import styled from 'styled-components';
import Logo from '../global/defaultmain/logo.svg';
import Home1 from '../global/defaultmain/Home1.png';
import Home2 from '../global/defaultmain/Home2.png';

export default function DefaultLeft() {
  return (
    <Backgrounds>
      <LeftHeadline>부동산 안전 거래 지킴이</LeftHeadline>
      <LogoImg src={Logo} />
      <ImgBox>
        <LeftHome1 src={Home1} />
        <LeftHome2 src={Home2} />
      </ImgBox>
    </Backgrounds>
  );
}

const Backgrounds = styled.div`
  background-color: #edf0f3;
  width: 100%;
  height: 100%;
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

const ImgBox = styled.div`
  position: relative;
  height: 537px;
  overflow-x: hidden;
  overflow-y: hidden;
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
