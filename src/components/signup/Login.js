import React, { useState } from 'react';
import styled from 'styled-components';
import pathLeft from '../signup/sources/article_path_left.png';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { GoLogIn, isLogin, NextTor, NextMem, itsNotOK, itsNotOK2, toastVisible, TextToast } from '../../store/store';
import Title from '../signup/sources/Title.png';
import ViewPassword from '../signup/sources/View_password.png';
import HidePassword from '../signup/sources/View_hide_password.png';
import { useMutation } from '@tanstack/react-query';
import { EmailLoginData } from '../../api/apiPOST';
import { useNavigate } from 'react-router-dom';
import Check from '../signup/sources/Check.png';
import Check2 from '../signup/sources/Check2.png';

function Login() {
  const navigate = useNavigate();
  //이미 가입된 회원 로그인 창 열때 필요한 recoilstate
  const [goinglogin, setGoingLogin] = useRecoilState(GoLogIn);
  // const [nexttor, setNextTor] = useRecoilState(NextTor);
  // const [nextmem, setNextMem] = useRecoilState(NextMem);

  //이메일 확인할 usestate
  const [checkemail, setCheckemail] = useState('');
  //비밀번호 확인할 usestate
  const [checkpassword, setCheckPassword] = useState('');

  //비밀번호 미리보기를 위한 state
  const [secret, setSecret] = useState(true);

  //로그인 유지를 위한 recoilstate
  const [AppLogin, setAppLogin] = useRecoilState(isLogin);

  //자동로그인 체크박스용 state
  const [checkAuto, setCheckAuto] = useState(false);

  //토큰용 state
  const [accessToken, setAccessToken] = useState('');

  //회원가입 오류 출력 state
  const [reject, setReject] = useState('');

  // toast 띄우는 state
  const setVisible = useSetRecoilState(toastVisible);

  // toast 에 들어갈 문구 recoilstate
  const [toasttext, setToastText] = useRecoilState(TextToast);

  //버튼 활성화 및 오류메시지 색상 활성화를 위한 state
  const [valid, setValid] = useRecoilState(itsNotOK);
  const [psvalid, setPsValid] = useRecoilState(itsNotOK2);
  const isValidLogin = !(valid && psvalid);
  const [isEmail, setIsEmail] = useState();
  const [isPassword, setIsPassword] = useState();

  //비밀번호 미리보기 이벤트 핸들러
  const onPreviewPW = (e) => {
    setSecret(!secret);
  };

  // 자동로그인용 이벤트 핸들러
  const onAutoLogin = (e) => {
    setCheckAuto(!checkAuto);
  };
  // 이미 가입된 회원 모달 이전으로 넘기는 버튼용 함수
  const onGoingLogIn = () => {
    setGoingLogin(0);
    // navigate('/');
    window.location.reload();
  };

  // 데이터 전송을 위한 initialState

  const initialState = {
    email: '',
    password: '',
  };

  // 데이터 전송을 위한 state
  const [loginData, setLoginData] = useState(initialState);

  //이메일 및 비밀번호 입력
  const onChangeEmail = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    console.log('def', loginData);

    const emailData = e.target.value;
    const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (exptext.test(emailData) == false) {
      setCheckemail('잘못된 이메일 형식입니다.');
      if (e.target.value === '') {
        setCheckemail('빈칸을 채워주세요');
      }
      setIsEmail(false);
      setValid(false);
    } else {
      setCheckemail('알맞은 형식입니다 :) ');
      setIsEmail(true);
      setValid(true);
    }
  };
  const onChangePassword = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    console.log('ABC', loginData);
    const passwordData = e.target.value;
    const expword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$^&*-]).{8,}$/;
    if (expword.test(passwordData) == false) {
      setCheckPassword('잘못된 비밀번호 형식입니다');
      if (e.target.value === '') {
        setCheckPassword('빈칸을 채워주세요');
      }
      setIsPassword(false);
      setPsValid(false);
    } else {
      setCheckPassword('알맞은 형식입니다 :)');
      setIsPassword(true);
      setPsValid(true);
    }
  };
  console.log(loginData);
  const onActiveEnter = (e) => {
    if (e.key === 'Enter') {
      onSubmitLoginData();
    }
  };
  const UserName = loginData.email.split('@')[0];
  const { mutate: emailLogin } = useMutation(EmailLoginData, {
    onSuccess: (response) => {
      sessionStorage.setItem('access_token', response.headers.access_token);
      sessionStorage.setItem('refresh_token', response.headers.refresh_token);
      sessionStorage.setItem('accountstate', response.data.accountState);
      sessionStorage.setItem('nickname', response.data.nickname);
      setAppLogin(true);
      console.log(response);
      navigate('/');
      setToastText(`환영해요 ${UserName}님`);
      setVisible(true);
    },
    onError: (err) => {
      setReject(err.response.data.errorMessage);
      setToastText(err.response.data.errorMessage);
      setVisible(true);
    },
  });

  // const JWT_EXPIRY_TIME = 24 * 3600 * 1000;

  // const { mutate: AutoLogin } = useMutation(AutoLoginData, {
  //   onSuccess: (response) => {
  //     sessionStorage.setItem('access_token', response.headers.access_token);
  //     sessionStorage.setItem('refresh_token', response.headers.refresh_token);
  //     sessionStorage.setItem('accountstate', response.data.accountState);
  //     sessionStorage.setItem('nickname', response.data.nickname);
  //     // localStorage.setItem('access_token', response.headers.access_token);
  //     setTimeout(AutoLoginData, JWT_EXPIRY_TIME - 60000);
  //     // setAccessToken(response.headers.access_token);
  //     // window.localStorage.setItem('jwt', '자동로그인');
  //     setAppLogin(true);
  //     console.log(response);
  //     navigate('/');
  //     setToastText(`환영해요 ${UserName}님`);
  //     setVisible(true);
  //   },
  //   onError: (err) => {
  //     setReject(err.response.data.errorMessage);
  //     setToastText(err.response.data.errorMessage);
  //     setVisible(true);
  //   },
  // });

  const onSubmitLoginData = () => {
    if (checkAuto === false) {
      console.log(checkAuto);
      setCheckPassword('');
      emailLogin(loginData);
    } else {
      setCheckPassword('');
      // AutoLogin(loginData);
    }
  };

  return (
    <>
      {goinglogin === 1 ? (
        <ChoiceContainer>
          <SignUpHeader onClick={onGoingLogIn}>
            <BackpageIconBox src={pathLeft} />
            <SignUpTitle>로그인</SignUpTitle>
          </SignUpHeader>
          <WelcomeQuestionContainer>
            <WelcomeQuestionbox>
              <SmallFont>등본 대신 해석해주는</SmallFont>
              <BigFontImage src={Title} />
            </WelcomeQuestionbox>
          </WelcomeQuestionContainer>
          <InputContainer>
            <InputBox>
              <InputName>아이디</InputName>
              <>
                <InputText
                  placeholder="아이디를 입력해주세요"
                  type="text"
                  name="email"
                  onChange={onChangeEmail}
                  index="1"
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
                placeholder="비밀번호를 입력해주세요"
                name="password"
                type={secret === false ? 'text' : 'password'}
                autocomplete="current-password"
                onChange={onChangePassword}
                index="2"
                onKeyDown={(e) => onActiveEnter(e)}
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
          <AutoLoginContainer>
            <AutoLoginCheckImg src={checkAuto === false ? Check : Check2} onClick={onAutoLogin} />
            <AutoLoginText>자동 로그인</AutoLoginText>
          </AutoLoginContainer>
          <BlankContainer2></BlankContainer2>
          <GoingSignUp onClick={onGoingLogIn}>회원가입 하기</GoingSignUp>
          <ButtonContainer>
            <ButtonStyle type="submit" onClick={onSubmitLoginData}>
              시작하기
            </ButtonStyle>
          </ButtonContainer>
        </ChoiceContainer>
      ) : null}
    </>
  );
}

export default Login;

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
  cursor: pointer;
`;

const BackpageIconBox = styled.img`
  width: 20px;
  height: 20px;
  background-color: var(--white);
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
  min-height: 187px;
  background-color: var(--white);
  display: flex;
  position: relative;
  justify-content: center;
`;

const WelcomeQuestionbox = styled.div`
  width: 147px;
  height: 71px;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
  gap: 7px;
`;

const SmallFont = styled.div`
  width: 147px;
  height: 28px;
  left: 106px;
  top: 96px;
  background-color: var(--white);
  font-family: var(--login_headline-font-family);
  font-style: normal;
  font-weight: var(--login_headline_Small-font-weight);
  font-size: var(--login_headline_Small-font-size);
  line-height: var(--login_headline_Small-line-heigh);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--gray1);
`;

const BigFontImage = styled.img`
  width: 147px;
  height: 36px;
  background-color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
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
  color: #2a224f;
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
  color: #c5c8cb;
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

const AutoLoginContainer = styled.div`
  width: 328px;
  height: 32px;
  background-color: var(--white);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;
const AutoLoginCheckImg = styled.img`
  width: 24px;
  height: 24px;
  background-color: var(--white);
`;
const AutoLoginText = styled.div`
  width: 68px;
  height: 16px;
  font-style: normal;
  font-family: var(--button-font-family);
  font-size: var(--button_Medium-font-size);
  font-weight: var(--button_Medium-font-weight);
  line-height: var(--button_Medium-line-height);
  letter-spacing: var(--button_Medium-letter-spacing);
  color: var(--gray1);
  display: flex;
  align-items: center;
  text-align: center;
  background-color: var(--white);
`;

const BlankContainer2 = styled.div`
  width: 360px;
  height: 100%;
  background-color: var(--white);
`;

const GoingSignUp = styled.div`
  width: 360px;
  min-height: 42px;
  background-color: var(--white);
  display: flex;
  justify-content: center;
  font-style: normal;
  font-family: var(--button-font-family);
  font-size: var(--button_Large-font-size);
  font-weight: var(--button_Large-font-weight);
  line-height: var(--button_Large-line-height);
  letter-spacing: var(--button_Large-letter-spacing);
  text-decoration-line: underline;
  color: var(--gray4);
  background-color: white;
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
    color: white;
  }
`;

