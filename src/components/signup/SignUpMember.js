import React, { useState } from 'react';
import styled from 'styled-components';
import pathLeft from '../signup/sources/article_path_left.png';
import { NextMem } from '../../store/store';
import { useRecoilState } from 'recoil';
import ViewPassword from '../signup/sources/View_password.png';
import HidePassword from '../signup/sources/View_hide_password.png';

function SignUpMember() {
  const welcometext = '사용할 회원 정보를\n 입력해주세요';
  //일반회원 이전으로 넘어가기 위한 recoilState
  const [nextmem, setNextMem] = useRecoilState(NextMem);

  //이메일 잘못 입력 에러 출력 state
  const [errormail, setErrorMail] = useState('');
  //비밀번호 잘못 입력 에러 출력 state
  const [errorpassword, setErrorPassWord] = useState('');

  const onPrevMemberPage = (e) => {
    setNextMem(nextmem - 2);
  };

  //비밀번호 미리보기를 위한 state
  const [secret, setSecret] = useState(true);

  //비밀번호 미리보기 이벤트 핸들러
  const onPreviewPW = (e) => {
    setSecret(!secret);
  };

  return (
    <>
      {nextmem === 2 ? (
        <>
          <ChoiceContainer>
            <SignUpHeader>
              <BackpageIconBox src={pathLeft} onClick={onPrevMemberPage} />
              <SignUpTitle>회원가입</SignUpTitle>
            </SignUpHeader>
            <WelcomeQuestionContainer>
              <WelcomeQuestionbox>{welcometext}</WelcomeQuestionbox>
            </WelcomeQuestionContainer>
            <InputContainer>
              <InputName>아이디(이메일)</InputName>
              {errormail === '' ? (
                <>
                  <InputText placeholder="lighthouse@gmail.com"></InputText>
                  <InputErrorMessageBox>
                    <InputErrorMessage></InputErrorMessage>
                  </InputErrorMessageBox>
                </>
              ) : (
                <>
                  <InputTextError placeholder="lighthouse@gmail.com"></InputTextError>
                  <InputErrorMessageBox>
                    <InputErrorMessage>잘못된 이메일 형식입니다 </InputErrorMessage>
                  </InputErrorMessageBox>
                </>
              )}
              <InputName>비밀번호</InputName>
              {errorpassword === '' ? (
                <>
                  <InputText placeholder="8-30자리 영대*소문자, 숫자, 특수문자 조합" type={secret === false ? 'text' : 'password'}></InputText>
                  <InputErrorMessageBox>
                    <InputErrorMessage></InputErrorMessage>
                  </InputErrorMessageBox>
                  <PasswordViewButtonContainer>
                    <PasswordViewButtonImg src={secret === false ? ViewPassword : HidePassword} onClick={onPreviewPW} />
                  </PasswordViewButtonContainer>
                </>
              ) : (
                <>
                  <InputTextError placeholder="8-30자리 영대*소문자, 숫자, 특수문자 조합" type={secret === false ? 'text' : 'password'}></InputTextError>
                  <InputErrorMessageBox>
                    <InputErrorMessage>잘못된 비밀번호 형식입니다 </InputErrorMessage>
                  </InputErrorMessageBox>
                  <PasswordViewButtonContainer>
                    <PasswordViewButtonImg src={secret === false ? ViewPassword : HidePassword} onClick={onPreviewPW} />
                  </PasswordViewButtonContainer>
                </>
              )}
            </InputContainer>
            <BlankContainer></BlankContainer>
            <ButtonContainer>
              <ButtonStyle>시작하기</ButtonStyle>
            </ButtonContainer>
          </ChoiceContainer>
        </>
      ) : null}
    </>
  );
}

export default SignUpMember;

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
  width: 183px;
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

const InputContainer = styled.div`
  width: 360px;
  height: 188px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const InputName = styled.div`
  width: 328px;
  height: 20px;
  display: flex;
  justify-content: left;
  background-color: white;
  font-size: 14px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.25px;
`;
const InputText = styled.input`
  width: 328px;
  height: 44px;
  border-radius: 8px;
  border: none;
  background-color: white;
`;

const InputTextError = styled.input`
  width: 328px;
  height: 44px;
  border-radius: 8px;
  background-color: white;
  border: 1px solid #d14343;
`;
const InputErrorMessageBox = styled.div`
  width: 328px;
  height: 16px;
  background-color: white;
  display: flex;
  align-items: center;
`;
const InputErrorMessage = styled.div`
  width: 328px;
  height: 12px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #d14343;
  background-color: white;
`;

const PasswordViewButtonContainer = styled.div`
  width: 328px;
  height: 24px;
  background-color: white;
  display: flex;
  justify-content: right;
`;

const PasswordViewButtonImg = styled.img`
  width: 24px;
  height: 24px;
  background-color: white;
`;

const BlankContainer = styled.div`
  width: 360px;
  height: 328px;
  background-color: white;
`;

const ButtonContainer = styled.div`
  width: 360px;
  height: 92px;
  background-color: white;
  display: flex;
  justify-content: center;
  /* background-color: green; */
`;

const ButtonStyle = styled.div`
  width: 328px;

  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: #c5c8cb;
  :hover {
    background-color: #3c6eef;
    color: white;
  }
`;
