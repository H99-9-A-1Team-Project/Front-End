import React from 'react';
import styled from 'styled-components';
import '../../global/global.css';
import path_Right from './sources/article_path_right.png';
import login_Deco from './sources/article_login_deco.png';
import QueMark from './sources/article_question.png';

export default function MainPageArticle() {
  return (
    <ArticleContainer>
      <TextGuide>
        로그인 하면
        <br />
        서비스를
        <br />
        이용할 수 있어요
      </TextGuide>
      <LoginBtnBox>
        <LoginBtn>로그인 하러가기</LoginBtn>
        <ImgPathRight src={path_Right} />
      </LoginBtnBox>
      <ImgLoginDeco src={login_Deco} />
      <ServcieGuideBox>
        <ServiceGuideP>어떤 서비스인가요?</ServiceGuideP>
        <ServiceQueMark src={QueMark} />
      </ServcieGuideBox>
    </ArticleContainer>
  );
}

const ArticleContainer = styled.div`
  width: 360px;
  height: 448px;
  background-color: var(--primary2-100);
  display: flex;
  flex-direction: column;
`;

const TextGuide = styled.div`
  margin-top: 60px;
  margin-left: 16px;
  width: 200px;
  font-family: var(--headline-font-family);
  font-size: var(--headline_Large-font-size);
  font-weight: var(--headline_Large-font-weight);
  line-height: var(--headline_Large-line-height);
  letter-spacing: var(--headline_Large-letter-spacing);
  background: none;
  cursor: default;
`;

const LoginBtnBox = styled.div`
  width: 120px;
  height: 48px;
  margin-left: 16px;
  margin-top: 8px;
  background: none;
  cursor: pointer;
`;

const LoginBtn = styled.button`
  margin-top: 16px;
  font-family: var(--button-font-family);
  font-size: var(--button_Medium-font-size);
  font-weight: var(--button_Medium-font-weight);
  line-height: var(--button_Medium-line-height);
  letter-spacing: var(--button_Medium-letter-spacing);
  color: var(--primary2-400);
  border: none;
  background: none;
  cursor: pointer;
`;

const ImgPathRight = styled.img`
  position: absolute;
  margin-top: 12px;
  width: 24px;
  height: 24px;
  background: none;
`;

const ImgLoginDeco = styled.img`
  position: absolute;
  width: 230px;
  height: 254px;
  background: none;
  margin-left: 130px;
  margin-top: 161px;
`;

const ServcieGuideBox = styled.div`
  position: absolute;
  margin-left: 16px;
  margin-top: 396px;
  width: 121px;
  height: 36px;
  background: none;
  display: flex;
  flex-direction: row;
`;

const ServiceGuideP = styled.p`
  margin-top: 10px;
  font-family: var(--button-font-family);
  font-size: var(--body_Small-font-size);
  font-weight: var(--body_Small-font-weight);
  line-height: var(--body_Small-line-height);
  letter-spacing: var(--body_Small-letter-spacing);
  background: none;
`;

const ServiceQueMark = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 4px;
  margin-top: 8px;
  background: none;
`;
