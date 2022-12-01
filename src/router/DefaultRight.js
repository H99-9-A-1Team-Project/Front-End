import React from 'react';
import styled from 'styled-components';
import Home3 from '../global/defaultmain/Home3.png';
import path_right from '../global/defaultmain/path_right.png';

export default function DefaultRight() {
  return (
    <Backgrounds>
      <ImgBox>
        <RightHome src={Home3} />
        <ResearchBox>
          <ReserchP>베타 서비스 설문 참여하기</ReserchP>
          <ResearchPath src={path_right} />
        </ResearchBox>
        <Footer>
          FE 조병민 김성욱 김하나{'\u00A0'} {'\u00A0'}
          {'\u00A0'}
          BE 장경원 유은정 정규재{'\u00A0'} {'\u00A0'}
          {'\u00A0'} UI/UX 손하영
        </Footer>
      </ImgBox>
    </Backgrounds>
  );
}
const Backgrounds = styled.div`
  position: relative;
  background-color: #edf0f3;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ImgBox = styled.div`
  position: relative;
  height: 506.6px;
  margin-top: 465px;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const RightHome = styled.img`
  position: absolute;
  margin-top: 153.6px;
  margin-left: 198px;
`;

const ResearchBox = styled.div`
  position: absolute;
  background-color: white;
  display: flex;
  flex-direction: row;
  margin-left: 263px;
  margin-top: 367px;
  border-radius: 8px;
  width: 245px;
  height: 56px;
  cursor: pointer;
`;

const ReserchP = styled.div`
  margin-left: 24px;
  margin-top: 18px;
  color: var(--primary2-400);
  font-family: var(--button-font-family);
  font-size: var(--button_Large-font-size);
  font-weight: var(--button_Large-font-weight);
  line-height: var(--button_Large-line-height);
  letter-spacing: var(--button_Large-letter-spacing);
  cursor: pointer;
`;

const ResearchPath = styled.img`
  margin-left: 8px;
  margin-top: 16px;
  width: 24px;
  height: 24px;
`;

const Footer = styled.div`
  position: absolute;
  margin-top: 463px;
  margin-left: 118px;
  color: var(--gray3);
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
  cursor: default;
`;
