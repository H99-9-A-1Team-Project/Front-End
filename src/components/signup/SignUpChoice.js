import React, { useState } from 'react';
import styled from 'styled-components';
import pathLeft from '../signup/sources/article_path_left.png';
import { NextMem, NextTor, ChoiceMem, GoLogIn, ChangeSignUp } from '../../store/store';
import { useRecoilState } from 'recoil';
import Login from './Login';
import SignUpMember from './SignUpMember';
import SignUpRealtor from './SignUpRealtor';
import { useNavigate } from 'react-router-dom';

function SignUpChoice() {
  //줄바꿈을 위한 질문 타이틀
  const welcometext = '반가워요!\n 어떤 목적으로\n 가입하시나요?';

  //회원가입창의 시작과 전환을 위한 recoilstate
  const [opensignup, setOpenSignUp] = useRecoilState(ChangeSignUp);

  //로그인 페이지 열때 필요한 state, 삼항연산자용
  const [alreadysignin, setAlreadySignIn] = useState(false);

  //일반회원 다음으로 넘어가기 위한 recoilState
  const [nextmem, setNextMem] = useRecoilState(NextMem);

  //공인중개사 회원 다음으로 넘어가기 위한 recoilState
  const [nexttor, setNextTor] = useRecoilState(NextTor);

  //마지막 페이지에서 버튼 바꾸기 위한 recoilstate
  const [choiceBool, setChoiceBool] = useRecoilState(ChoiceMem);

  //이미 가입된 회원 로그인 창 열때 필요한 recoilstate
  const [goinglogin, setGoingLogin] = useRecoilState(GoLogIn);

  // 메인페이지로 회귀
  const navigate = useNavigate();
  const onNextMemberPage = () => {
    setNextMem(nextmem + 2);
    setOpenSignUp(true);
    setChoiceBool(true);

    console.log(nextmem);
  };
  const onNextRealtorPage = () => {
    setNextTor(nexttor + 1);
    setChoiceBool(false);
    setOpenSignUp(true);

    console.log(nexttor);
  };
  const onGoingLogIn = () => {
    setGoingLogin(goinglogin + 1);
    setOpenSignUp(true);
    setAlreadySignIn(true);
    console.log(goinglogin);
  };

  const onGoingMainPage = () => {
    setGoingLogin(0);
    setNextMem(0);
    setNextTor(0);
    navigate('/');
  };

  return (
    <>
      <ChoiceContainer>
        {opensignup === false || (nextmem === 0 && nexttor === 0 && goinglogin === 0) ? (
          <>
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
          </>
        ) : (
          <>
            {alreadysignin === false ? (
              <>
                {choiceBool === true ? (
                  <>
                    <ChoiceContainer>
                      <SignUpMember />
                    </ChoiceContainer>
                  </>
                ) : (
                  <>
                    <ChoiceContainer>
                      <SignUpRealtor />
                    </ChoiceContainer>
                  </>
                )}
              </>
            ) : (
              <Login />
            )}
          </>
        )}
      </ChoiceContainer>
    </>
  );
}

export default SignUpChoice;
const ChoiceContainer = styled.div`
  width: 360px;
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: pink;
`;

const SignUpHeader = styled.div`
  width: 360px;
  height: 64px;
  left: 0px;
  top: 0px;
  /* position: absolute; */
  display: flex;
  flex-direction: row;
  align-items: center;
  /* padding: 20px 16px; */
  gap: 8px;
  background-color: white;
`;

const BackpageIconBox = styled.img`
  width: 20px;
  height: 20px;
  background-color: white;
  margin-left: 20px;
`;
const SignUpTitle = styled.div`
  background-color: white;
  width: 50px;
  height: 20px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.25px;
`;

const WelcomeQuestionContainer = styled.div`
  width: 360px;
  height: 140px;
  background-color: white;
  display: flex;
  position: relative;
`;

const WelcomeQuestionbox = styled.div`
  width: 138px;
  height: 84px;
  background-color: white;
  position: absolute;
  left: 16px;
  top: 24px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  white-space: pre-line;
`;

const ButtonContainer = styled.div`
  width: 360px;
  height: 80px;
  background-color: white;
  display: flex;
  justify-content: center;
`;

const ButtonStyle = styled.div`
  width: 328px;

  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid #3c6eef;
  border-radius: 8px;
  background-color: white;
  :hover {
    background-color: #3c6eef;
    color: white;
  }
`;
const BlankContainer = styled.div`
  width: 360px;
  height: 384px;
  background-color: white;
`;
const AlreadyIdContainer = styled.div`
  width: 360px;
  height: 52px;
  display: flex;
  justify-content: center;
  background-color: white;
`;
const AlreadyIdBox = styled.div`
  width: 147px;
  height: 20px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.1px;
  text-decoration-line: underline;
  color: #9da043;
  background-color: white;
`;
