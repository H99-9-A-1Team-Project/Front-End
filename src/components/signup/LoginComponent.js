import React, { useState } from 'react';
import styled from 'styled-components';
import pathLeft from '../../global/sources/Expand_left_light.svg';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isLogin, itsNotOK, itsNotOK2, toastVisible, TextToast, AutoLoginState } from '../../store/store';
import Title from '../../global/sources/logo.svg';
import ViewPassword from '../../global/sources/View_outlined.svg';
import HidePassword from '../../global/sources/View_hide.svg';
import { useMutation } from '@tanstack/react-query';
import { EmailLoginData } from '../../api/apiPOST';
import { useNavigate } from 'react-router-dom';
import Check from '../../global/sources/Check_outlined.svg';
import Check2 from '../../global/sources/Check_fill.svg';

function LoginComponent() {
  const navigate = useNavigate();
  //이메일 확인할 usestate
  const [checkemail, setCheckemail] = useState('');
  //비밀번호 확인할 usestate
  const [checkpassword, setCheckPassword] = useState('');

  //비밀번호 미리보기를 위한 state
  const [secret, setSecret] = useState(true);
  //비밀번호 양식 다시 짚어줄 useState
  const [checkvalid, setCheckValid] = useState('');

  //로그인 유지를 위한 recoilstate
  const [AppLogin, setAppLogin] = useRecoilState(isLogin);

  //자동로그인 체크박스용 state
  const [checkAuto, setCheckAuto] = useRecoilState(AutoLoginState);

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
  const [isEmail, setIsEmail] = useState('');
  const [isPassword, setIsPassword] = useState('');

  //비밀번호 미리보기 이벤트 핸들러
  const onPreviewPW = (e) => {
    setSecret(!secret);
  };

  // 자동로그인용 이벤트 핸들러
  const onAutoLogin = (e) => {
    setCheckAuto(!checkAuto);
  };
  // 이전화면으로 이동
  const onGoingHome = () => {
    // setGoingLogin(0);
    navigate('/');
  };

  //회원가입 화면으로 이동
  const onGoingSignUp = () => {
    navigate('/signup');
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
    const emailData = e.target.value;
    const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (exptext.test(emailData) === true) {
      setCheckemail('알맞은 형식입니다 :) ');
      setIsEmail(true);
      setValid(true);
    }
    if (e.target.value === '') {
      setCheckemail('');
      setIsEmail('');
    }
  };
  const onblurChange = () => {
    const emailData = loginData.email;
    const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (exptext.test(emailData) === false) {
      setCheckemail('잘못된 이메일 형식입니다.');
      if (emailData === '') {
        setCheckemail('이메일을 입력하세요');
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
    setPsValid(true);
    const expword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$^&*-]).{8,}$/;
    if (expword.test(e.target.value) === true) {
      setCheckPassword('알맞은 형식입니다 :)');
      setCheckValid('');
      setIsPassword(true);
      setPsValid(true);
    } else if (e.target.value === '') {
      setCheckPassword('비밀번호를 입력하세요');
      setIsPassword(false);
      setPsValid(false);
      setCheckValid('');
    } else if (e.target.value !== '') {
      setCheckPassword('');
      setIsPassword(true);
      setPsValid(true);
      setCheckValid('8-30자리 영대・소문자, 숫자, 특수문자 조합');
    }
  };
  const onEmailLoginData = () => {
    emailLogin(loginData);
  };

  const onValidLoginData = () => {
    const expword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$^&*-]).{8,}$/;
    if (expword.test(loginData.password) === false) {
      setCheckPassword('잘못된 비밀번호 형식입니다');
      setTimeout(setCheckPassword, 1000);
      setCheckValid('8-30자리 영대・소문자, 숫자, 특수문자 조합');
      if (loginData.password === '') {
        setCheckPassword('비밀번호를 입력하세요');
      }
      setIsPassword(false);
      setPsValid(false);
    } else {
      setCheckPassword('알맞은 형식입니다 :)');
      setCheckValid('');
      setIsPassword(true);
      setPsValid(true);
      onEmailLoginData();
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
      navigate('/');
      setToastText(`환영해요 ${UserName}님`);
      setVisible(true);
      // if (checkAuto === true) {
      //   document.cookie = `access_token=${response.headers.access_token}`;
      //   document.cookie = `refresh_token=${response.headers.refresh_token}`;
      //   document.cookie = `accountstate=${response.data.accountState}`;
      //   document.cookie = `nickname=${response.data.nickname}`;
      // }
    },
    onError: (err) => {
      setReject(err.response.data.errorMessage);
      setIsEmail(false);
      setIsPassword(false);
      setCheckemail(err.response.data.errorMessage);
      setCheckPassword(err.response.data.errorMessage);
    },
  });

  const onActiveEnter = (e) => {
    if (e.key === 'Enter') {
      onValidLoginData();
    }
  };
  const onSubmitLoginData = (e) => {
    e.preventDefault();
    onValidLoginData();
  };

  return (
    <>
      <ChoiceContainer onSubmit={onSubmitLoginData}>
        <SignUpHeader onClick={onGoingHome}>
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
              <InputTextBox>
                <InputText
                  placeholder="아이디를 입력해주세요"
                  type="text"
                  name="email"
                  onChange={onChangeEmail}
                  onBlur={onblurChange}
                  index="1"
                  style={{
                    border: isEmail === false ? '1px solid #d14343 ' : '1px solid var(--gray6)',
                  }}
                ></InputText>
              </InputTextBox>
              <InputErrorMessageBox>{isEmail === false ? <InputErrorMessage>{checkemail === '' ? null : checkemail}</InputErrorMessage> : <InputMessage>{checkemail === '' ? null : checkemail}</InputMessage>}</InputErrorMessageBox>
            </>
          </InputBox>
          <InputBoxPassword>
            <InputName>비밀번호</InputName>
            <InputTextBox>
              <InputText
                placeholder="비밀번호를 입력해주세요"
                name="password"
                type={secret === false ? 'text' : 'password'}
                autocomplete="current-password"
                onblur={onValidLoginData}
                onChange={onChangePassword}
                index="2"
                onKeyDown={(e) => onActiveEnter(e)}
                style={{
                  border: isPassword === false ? '1px solid #d14343 ' : '1px solid var(--gray6)',
                }}
              ></InputText>
            </InputTextBox>
          </InputBoxPassword>
          <PasswordContainer>
            <ErrorMsgPreview>
              <InputErrorMessageBoxPassword>
                <InputErrorMessageBox>{isPassword === false ? <InputErrorMessage>{checkpassword === '' ? null : checkpassword}</InputErrorMessage> : <InputMessage>{checkpassword === '' ? null : checkpassword}</InputMessage>}</InputErrorMessageBox>
              </InputErrorMessageBoxPassword>
              <InputErrorMessageBoxPassword>
                <InputErrorMessageValid>{isPassword === false ? <InputErrorMessage>{checkvalid === '' ? null : checkvalid}</InputErrorMessage> : <InputMessage>{checkvalid === '' ? null : checkvalid}</InputMessage>}</InputErrorMessageValid>
              </InputErrorMessageBoxPassword>
            </ErrorMsgPreview>
            <PasswordViewButtonImg src={secret === false ? ViewPassword : HidePassword} onClick={onPreviewPW} />
          </PasswordContainer>
        </InputContainer>
        {/* <AutoLoginContainer onClick={onAutoLogin}>
          <AutoLoginCheckImg src={checkAuto === false ? Check : Check2} />
          <AutoLoginText>자동 로그인</AutoLoginText>
        </AutoLoginContainer> */}
        <BlankContainer2></BlankContainer2>
        <GoingSignUp onClick={onGoingSignUp}>회원가입 하기</GoingSignUp>
        <ButtonContainer>
          <ButtonStyle type="submit" disabled={isValidLogin}>
            로그인
          </ButtonStyle>
        </ButtonContainer>
      </ChoiceContainer>
    </>
  );
}

export default LoginComponent;

const ChoiceContainer = styled.form`
  width: 360px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--white);
  @media (max-width: 500px) {
    width: 100%;
  }
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
  border-bottom: 1px solid var(--gray6);
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const BackpageIconBox = styled.img`
  width: 24px;
  height: 24px;
  background-color: var(--white);
  margin-left: 16px;
  cursor: pointer;
`;
const SignUpTitle = styled.div`
  background-color: var(--white);
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
  /* background-color: var(--white); */
  font-style: normal;
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
`;
const InputTextBox = styled.div`
  width: 328px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const InputText = styled.input`
  width: 328px;
  height: 44px;
  border-radius: 8px;
  padding-left: 8px;
  border: 1px solid var(--gray6);
  background-color: var(--white);
  :focus {
    outline: none;
  }
`;

const InputErrorMessageBox = styled.div`
  width: 328px;
  height: 16px;
  margin-top: 4px;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  background-color: transparent;
`;

const InputErrorMessageValid = styled.div`
  width: 265px;
  height: 16px;
  margin-top: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: transparent;
`;

const InputErrorMessageBoxPassword = styled.div`
  width: 265px;
  height: 16px;
  display: flex;
  margin-top: 4px;
  flex-direction: column;
  justify-content: center;
  background-color: transparent;
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
  background-color: transparent;
`;

const PasswordViewButtonImg = styled.img`
  width: 24px;
  height: 24px;
  background-color: var(--white);
  margin-right: 2px;
  margin-top: 8px;
`;
const ErrorMsgPreview = styled.div`
  width: 328px;
  height: 24px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const PasswordContainer = styled.div`
  width: 328px;
  height: 40px;
  display: flex;
  flex-direction: row;
`;

const AutoLoginContainer = styled.div`
  width: 280px;
  height: 32px;
  background-color: var(--white);
  display: none;
  flex-direction: row;
  align-items: center;
  margin-top: -12px;
  margin-right: 56px;
  gap: 4px;
  cursor: pointer;
`;
const AutoLoginCheckImg = styled.img`
  width: 24px;
  height: 24px;
  background-color: var(--white);
  position: relative;
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
  cursor: pointer;
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
    cursor: pointer;
  }
`;

