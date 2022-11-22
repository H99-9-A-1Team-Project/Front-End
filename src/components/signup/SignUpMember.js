import React, { useState } from 'react';
import styled from 'styled-components';
import pathLeft from '../signup/sources/article_path_left.png';
import { NextMem, ChangeSignUp, itsNotOK, itsNotOK2, isLogin } from '../../store/store';
import { useRecoilState } from 'recoil';
import ViewPassword from '../signup/sources/View_password.png';
import HidePassword from '../signup/sources/View_hide_password.png';
import { useMutation } from '@tanstack/react-query';
import { MemberSignUp, RequestEmail, EmailLoginData } from '../../api/apiPOST';
import { useNavigate } from 'react-router-dom';

function SignUpMember() {
  const navigate = useNavigate();
  const welcometext = '사용할 회원 정보를\n 입력해주세요';
  //일반회원 이전으로 넘어가기 위한 recoilState
  const [nextmem, setNextMem] = useRecoilState(NextMem);

  //로그인 유지를 위한 recoilstate
  const [AppLogin, setAppLogin] = useRecoilState(isLogin);

  //이메일 비밀번호 담을 usestate
  const [emailpassword, setEmailPassword] = useState('');

  //이메일 확인할 usestate
  const [checkemail, setCheckemail] = useState('');
  //비밀번호 확인할 usestate
  const [checkpassword, setCheckPassword] = useState('');

  //회원가입 오류 출력 state
  const [reject, setReject] = useState('');

  //회원가입창의 시작과 전환을 위한 recoilstate
  const [opensignup, setOpenSignUp] = useRecoilState(ChangeSignUp);

  //데이터 전송용 initialstate
  const initialState = {
    email: '',
    password: '',
    nickname: '',
  };

  //데이터 전송을 위한 state
  const [loginData, setLoginData] = useState(initialState);

  //버튼 활성화 및 오류메시지 색상 활성화를 위한 state
  const [valid, setValid] = useRecoilState(itsNotOK);
  const [psvalid, setPsValid] = useRecoilState(itsNotOK2);
  const isValidLogin = !(valid && psvalid);
  const [isEmail, setIsEmail] = useState();
  const [isPassword, setIsPassword] = useState();

  // 뒤로가기 버튼용
  const onPrevMemberPage = (e) => {
    setNextMem(nextmem - 2);
    setValid(false);
    setPsValid(false);
  };

  //비밀번호 미리보기를 위한 state
  const [secret, setSecret] = useState(true);

  //비밀번호 미리보기 이벤트 핸들러
  const onPreviewPW = (e) => {
    setSecret(!secret);
  };

  // 이메일  onchange
  const onChangeEmail = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    console.log('def', loginData);
    const emailData = loginData.email;
    const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (exptext.test(emailData) == false) {
      setCheckemail('잘못된 이메일 형식입니다.');
      setIsEmail(false);
      setValid(false);
      // emailData.focus();
    } else {
      setCheckemail('알맞은 형식입니다 :) ');
      setIsEmail(true);
      setValid(true);
    }
  };

  // 닉네임 생성
  const onblurChange = () => {
    const Nickname = loginData.email.split('@')[0];
    setLoginData({ ...loginData, nickname: Nickname });
    console.log(loginData);
  };

  const LoginPocket = {
    email: loginData.email,
    password: loginData.password,
  };

  console.log();
  // 비밀번호 onChange
  const onChangePassword = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    console.log('ABC', loginData);
    const passwordData = loginData.password;
    const expword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (expword.test(passwordData) == false) {
      setCheckPassword('잘못된 비밀번호 형식입니다');
      setIsPassword(false);
      setPsValid(false);
      // passwordData.focus();
    } else {
      setCheckPassword('알맞은 형식입니다 :)');
      setIsPassword(true);
      setPsValid(true);
    }
  };

  //회원가입
  const { mutate: memberSignUp } = useMutation(MemberSignUp, {
    onSuccess: () => {
      alert('회원가입완료!');
      navigate('/');
    },
    onError: (err) => {
      setReject(err.response.data.errorMessage);
    },
  });
  //동시로그인
  const { mutate: emailLogin } = useMutation(EmailLoginData, {
    onSuccess: (response) => {
      sessionStorage.setItem('access_token', response.headers.access_token);
      sessionStorage.setItem('refresh_token', response.headers.refresh_token);
      sessionStorage.setItem('accountstate', response.data.accountState);
      setAppLogin(true);
      console.log(response);
      navigate('/');
    },
    onError: (err) => {
      alert(err.response.data.errorMessage);
    },
  });

  //회원가입 데이터 전송
  const onSubmitSignUpData = () => {
    setReject('');
    console.log(loginData.email);
    console.log('asdf', loginData);
    setOpenSignUp(false);
    memberSignUp(loginData);
    setTimeout(() => {
      emailLogin(LoginPocket);
    }, 2000);
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
              <InputBox>
                <InputName>아이디(이메일)</InputName>

                <>
                  <InputText
                    placeholder="lighthouse@gmail.com"
                    name="email"
                    type="text"
                    onChange={onChangeEmail}
                    onBlur={onblurChange}
                    style={{
                      border: isEmail === false ? '1px solid #d14343 ' : 'none',
                    }}
                  ></InputText>
                  <InputErrorMessageBox>{isEmail === false ? <InputErrorMessage>{checkemail === '' ? null : checkemail}</InputErrorMessage> : <InputMessage>{checkemail === '' ? null : checkemail}</InputMessage>}</InputErrorMessageBox>
                </>
              </InputBox>
              <InputBoxPassword>
                <InputName>비밀번호</InputName>

                <InputText
                  placeholder="8-30자리 영대*소문자, 숫자, 특수문자 조합"
                  autocomplete="current-password"
                  name="password"
                  onChange={onChangePassword}
                  type={secret === false ? 'text' : 'password'}
                  style={{
                    border: isPassword === false ? '1px solid #d14343 ' : 'none',
                  }}
                ></InputText>
              </InputBoxPassword>
              <ErrorMsgPreview>
                <InputErrorMessageBoxPassword>
                  <InputErrorMessageBox>{isPassword === false ? <InputErrorMessage>{checkpassword === '' ? null : checkpassword}</InputErrorMessage> : <InputMessage>{checkpassword === '' ? null : checkpassword}</InputMessage>}</InputErrorMessageBox>
                </InputErrorMessageBoxPassword>
                <PasswordViewButtonImg src={secret === false ? ViewPassword : HidePassword} onClick={onPreviewPW} />
              </ErrorMsgPreview>
            </InputContainer>
            <BlankContainer></BlankContainer>
            <ButtonContainer>
              <ButtonStyle
                // onClick={() => {
                //   errormail === '' ? onSubmitSignUpData() : onCheckEmailDouble();
                // }}
                type="submit"
                disabled={isValidLogin}
                onClick={() => {
                  onSubmitSignUpData();
                }}
              >
                시작하기
              </ButtonStyle>
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--white);
`;

const SignUpHeader = styled.div`
  width: 360px;
  min-height: 64px;
  left: 0px;
  top: 0px;
  /* position: absolute; */
  display: flex;
  flex-direction: row;
  align-items: center;
  /* padding: 20px 16px; */
  gap: 8px;
  background-color: var(--white);
`;

const BackpageIconBox = styled.img`
  width: 20px;
  height: 20px;
  background-color: white;
  margin-left: 20px;
`;
const SignUpTitle = styled.div`
  background-color: var(--white);
  width: 70px;
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
  min-height: 120px;
  background-color: var(--white);
  display: flex;
  align-items: center;
  position: relative;
`;

const WelcomeQuestionbox = styled.div`
  width: 183px;
  height: 84px;
  background-color: var(--white);
  position: absolute;
  left: 16px;
  top: 24px;
  font-style: normal;
  font-family: var(--headline-font-family);
  font-size: var(--headline_Large-font-size);
  font-weight: var(--headline_Large-font-weight);
  line-height: var(--headline_Large-line-height);
  display: flex;

  white-space: pre-line;
`;

const InputContainer = styled.div`
  width: 360px;
  min-height: 188px;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const InputBox = styled.div`
  width: 328px;
  height: 82px;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 14px;
`;
const InputBoxPassword = styled.div`
  width: 328px;
  height: 64px;
  background-color: var(--white);
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
  background-color: var(--white);
  font-style: normal;
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
`;
const InputText = styled.input`
  width: 328px;
  height: 44px;
  border-radius: 8px;
  border: none;
  background-color: var(--white);
  :focus {
    outline: none;
  }
`;

const InputErrorMessageBox = styled.div`
  width: 328px;
  height: 16px;
  background-color: var(--white);
  display: flex;
  align-items: center;
`;

const InputErrorMessageBoxPassword = styled.div`
  width: 304px;
  height: 16px;
  background-color: var(--white);
  display: flex;
  align-items: flex-end;
`;

const InputMessage = styled.div`
  width: 328px;
  height: 12px;
  font-style: normal;
  font-family: var(--body-font-family);
  font-size: var(--body_Small-font-size);
  font-weight: var(--body_Small-font-weight);
  line-height: var(--body_Small-line-height);
  letter-spacing: var(--body_Small-letter-spacing);
  color: var(--gray5);
  background-color: var(--white);
`;
const InputErrorMessage = styled.div`
  width: 328px;
  height: 12px;
  font-style: normal;
  font-family: var(--body-font-family);
  font-size: var(--body_Small-font-size);
  font-weight: var(--body_Small-font-weight);
  line-height: var(--body_Small-line-height);
  letter-spacing: var(--body_Small-letter-spacing);
  color: #d14343;
  background-color: var(--white);
`;

const PasswordViewButtonImg = styled.img`
  width: 24px;
  height: 24px;
  background-color: var(--white);
`;

const ErrorMsgPreview = styled.div`
  width: 328px;
  height: 24px;
  background-color: var(--white);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const BlankContainer = styled.div`
  width: 360px;
  height: 100%;
  background-color: var(--white);
`;

const ButtonContainer = styled.div`
  width: 360px;
  min-height: 92px;
  background-color: var(--white);
  display: flex;
  justify-content: center;
`;

const ButtonStyle = styled.button`
  width: 328px;
  height: 60px;
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-family: var(--button-font-family);
  font-size: var(--button_Large-font-size);
  font-weight: var(--button_Large-font-weight);
  line-height: var(--button_Large-line-height);
  letter-spacing: var(--button_Large-letter-spacing);
  :disabled {
    background-color: var(--gray5);
  }
  :enabled {
    background-color: var(--primary2-400);
    color: var(--white);
  }
`;
