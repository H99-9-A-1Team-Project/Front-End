import React from 'react';
import styled from 'styled-components';
import '../../global/global.css';
import RqAt_Path_Right from './sources/rqm_article_right_light2.png';
import RqAt_Question from './sources/rqmAt_Question.png';

export default function requestArticle() {
  return (
    <RqArticleContainer>
      <LikeText>
        발품판 매물이 마음에 든다면
        <br />
        안전성을 확인해보세요
      </LikeText>
      <InfoContainer>
        <InfoBox>
          <InfoWrap1>
            <InfoHead1>1회</InfoHead1>
            <InfoNav1>미사용</InfoNav1>
          </InfoWrap1>
          <VerticalBar />
          <InfoWrap2>
            <InfoHead1>1건</InfoHead1>
            <InfoNav1>대기중</InfoNav1>
          </InfoWrap2>
          <VerticalBar />
          <InfoWrap3>
            <InfoHead2>1건</InfoHead2>
            <InfoNav2>완료</InfoNav2>
          </InfoWrap3>
        </InfoBox>
        <RequestBtn>
          매물 상담 신청하기
          <RequestBtnPath src={RqAt_Path_Right} />
        </RequestBtn>
      </InfoContainer>
      <HelpBox>
        <HelpP>미사용은 무엇인가요?</HelpP>
        <HelpImg src={RqAt_Question} />
      </HelpBox>
    </RqArticleContainer>
  );
}

const RqArticleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 324px;
  background-color: var(--primary2-100);
`;

const LikeText = styled.div`
  margin-left: 17px;
  margin-top: 24px;
  background: none;
  font-family: var(--headline-font-family);
  font-size: var(--headline_Medium-font-size);
  font-weight: var(--headline_Medium-font-weight);
  line-height: var(--headline_Medium-line-height);
  letter-spacing: var(--headline_Medium-letter-spacing);
  cursor: default;
`;

const InfoContainer = styled.div`
  position: absolute;
  width: 328px;
  height: 176px;
  margin-top: 96px;
  margin-left: 17px;
  border-radius: 8px;
  background-color: white;
`;

const InfoBox = styled.div`
  width: 279px;
  height: 40px;
  display: flex;
  flex-direction: row;
  margin-top: 28px;
  margin-left: 25px;
  background: none;
`;

const InfoWrap1 = styled.div`
  width: 32px;
  height: 40px;
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  background: none;
`;

const InfoWrap2 = styled.div`
  width: 32px;
  height: 40px;
  display: flex;
  flex-direction: column;
  margin-left: 39px;
  background: none;
`;

const InfoWrap3 = styled.div`
  width: 25px;
  height: 40px;
  display: flex;
  flex-direction: column;
  margin-left: 39px;
  background: none;
`;

const InfoHead1 = styled.p`
  color: black;
  background: none;
  font-family: var(--headline-font-family);
  font-size: var(--headline_Small-font-size);
  font-weight: var(--headline_Small-font-weight);
  line-height: var(--headline_Small-line-height);
  letter-spacing: var(--headline_Small-letter-spacing);
  margin-left: 3.5px;
  cursor: default;
`;

const InfoHead2 = styled.p`
  color: black;
  background: none;
  font-family: var(--headline-font-family);
  font-size: var(--headline_Small-font-size);
  font-weight: var(--headline_Small-font-weight);
  line-height: var(--headline_Small-line-height);
  letter-spacing: var(--headline_Small-letter-spacing);
  cursor: default;
`;

const InfoNav1 = styled.p`
  width: 33px;
  background: none;
  color: var(--gray4);
  margin-top: 4px;
  font-family: var(--body-font-family);
  font-size: var(--body_Small-font-size);
  font-weight: var(--body_Small-font-weight);
  line-height: var(--body_Small-line-height);
  letter-spacing: var(--body_Small-letter-spacing);
  cursor: default;
`;

const InfoNav2 = styled.p`
  width: 33px;
  background: none;
  color: var(--gray4);
  margin-top: 4px;
  margin-left: 1.5px;
  font-family: var(--body-font-family);
  font-size: var(--body_Small-font-size);
  font-weight: var(--body_Small-font-weight);
  line-height: var(--body_Small-line-height);
  letter-spacing: var(--body_Small-letter-spacing);
  cursor: default;
`;

const VerticalBar = styled.div`
  width: 1px;
  height: 25px;
  color: var(gray5);
  margin-left: 39px;
  margin-top: 7.5px;
`;

const RequestBtn = styled.button`
  position: absolute;
  width: 280px;
  height: 48px;
  border: none;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: var(--button-font-family);
  font-size: var(--button_Medium-font-size);
  font-weight: var(--button_Medium-font-weight);
  line-height: var(--button_Medium-line-height);
  letter-spacing: var(--button_Medium-letter-spacing);
  background-color: var(--primary2-400);
  box-shadow: var(--Shadow2-box-shadow);
  margin-top: 32px;
  margin-left: 24px;
  cursor: pointer;
`;

const RequestBtnPath = styled.img`
  width: 24px;
  height: 24px;
  background: none;
`;

const HelpBox = styled.div`
  width: 132px;
  height: 36px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: none;
  margin-top: 208px;
  margin-left: 214px;
  cursor: pointer;
`;

const HelpP = styled.div`
  color: var(--gray4);
  font-family: var(--button-font-family);
  font-size: var(--button_Small-font-size);
  font-weight: var(--button_Small-font-weight);
  line-height: var(--button_Small-line-height);
  letter-spacing: var(--button_Small-letter-spacing);
  background: none;
`;

const HelpImg = styled.img`
  width: 20px;
  height: 20px;
  background: none;
  margin-left: 4px;
`;
