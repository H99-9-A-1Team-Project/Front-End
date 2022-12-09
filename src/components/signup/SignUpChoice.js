import React, { useState } from 'react';
import styled from 'styled-components';
import pathLeft from '../../global/sources/Expand_left_light.svg';
import { ChoiceMem, ChangeSignUp } from '../../store/store';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

function SignUpChoice() {
  //줄바꿈을 위한 질문 타이틀
  const welcometext = '반가워요!\n 어떤 목적으로\n 가입하시나요?';

  //회원가입창의 시작과 전환을 위한 recoilstate
  const setOpenSignUp = useSetRecoilState(ChangeSignUp);

  //로그인 페이지 열때 필요한 state, 삼항연산자용
  const [alreadysignin, setAlreadySignIn] = useState(false);

  //마지막 페이지에서 버튼 바꾸기 위한 recoilstate
  const setChoiceBool = useSetRecoilState(ChoiceMem);

  // 메인페이지로 회귀
  const navigate = useNavigate();
  const onNextMemberPage = () => {
    navigate('/signup/member');
    // setNextMem(nextmem + 2);
    setOpenSignUp(true);
    setChoiceBool(true);
  };
  const onNextRealtorPage = () => {
    navigate('/signup/realtor');
    // setNextTor(nexttor + 1);
    setChoiceBool(false);
    setOpenSignUp(true);
  };
  const onGoingLogIn = () => {
    navigate('/login');
    setOpenSignUp(true);
    setAlreadySignIn(true);
  };

  const onGoingMainPage = () => {
    navigate('/');
  };

  return (
    <ChoiceContainer>
      <SignUpHeader>
        <BackpageIconBox src={pathLeft} onClick={onGoingMainPage} />
        <SignUpTitle>회원가입</SignUpTitle>
      </SignUpHeader>
      <WelcomeQuestionContainer>
        <WelcomeQuestionbox>{welcometext}</WelcomeQuestionbox>
      </WelcomeQuestionContainer>
      <ButtonContainer>
        <ButtonStyle onClick={onNextMemberPage}>일반 사용자입니다.</ButtonStyle>
      </ButtonContainer>
      <ButtonContainer>
        <ButtonStyle onClick={onNextRealtorPage}>공인중개사입니다.</ButtonStyle>
      </ButtonContainer>
      <BlankContainer></BlankContainer>
      <AlreadyIdContainer>
        <AlreadyIdBox onClick={onGoingLogIn}>이미 아이디가 있습니다</AlreadyIdBox>
      </AlreadyIdContainer>
    </ChoiceContainer>
  );
}

export default SignUpChoice;
const ChoiceContainer = styled.div`
  width: 360px;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const SignUpHeader = styled.div`
  width: 360px;
  min-height: 64px;
  left: 0px;
  top: 0px;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* padding: 20px 16px; */
  gap: 8px;
  background-color: white;
  border-bottom: 1px solid var(--gray6);
  cursor: pointer;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const BackpageIconBox = styled.img`
  width: 24px;
  height: 24px;
  background-color: white;
  margin-left: 16px;
`;
const SignUpTitle = styled.div`
  background-color: white;
  width: 296px;
  height: 20px;
  font-style: normal;
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
`;

const WelcomeQuestionContainer = styled.div`
  width: 360px;
  min-height: 140px;
  background-color: white;
  display: flex;
  position: relative;
`;

const WelcomeQuestionbox = styled.div`
  width: 183px;
  height: 84px;
  background-color: white;
  position: absolute;
  left: 16px;
  top: 24px;
  font-style: normal;
  font-family: var(--headline-font-family);
  font-size: var(--headline_Large-font-size);
  font-weight: var(--headline_Large-font-weight);
  line-height: var(--headline_Large-line-height);
  display: flex;
  align-items: center;
  white-space: pre-line;
`;

const ButtonContainer = styled.div`
  width: 360px;
  min-height: 80px;
  background-color: white;
  display: flex;
  justify-content: center;
  position: relative;
`;

const ButtonStyle = styled.div`
  width: 328px;
  height: 60px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: var(--button-font-family);
  font-size: var(--button_Large-font-size);
  font-weight: var(--button_Large-font-weight);
  line-height: var(--button_Large-line-height);
  letter-spacing: var(--button_Large-letter-spacing);
  border: 1px solid var(--primary2-400);
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  :hover {
    background-color: #3c6eef;
    color: white;
  }
`;
const BlankContainer = styled.div`
  width: 360px;
  height: 100%;
  background-color: white;
  position: relative;
`;
const AlreadyIdContainer = styled.div`
  width: 360px;
  min-height: 52px;
  display: flex;
  justify-content: center;
  background-color: white;
  position: relative;
`;
const AlreadyIdBox = styled.div`
  width: 160px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-style: normal;
  font-family: var(--button-font-family);
  font-size: 15px;
  font-weight: var(--button_Large-font-weight);
  line-height: var(--button_Large-line-height);
  letter-spacing: var(--button_Large-letter-spacing);
  text-decoration-line: underline;
  color: var(--gray4);
  background-color: white;
  cursor: pointer;
`;
