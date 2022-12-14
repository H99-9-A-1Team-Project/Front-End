import React, { useState } from 'react';
import styled from 'styled-components';
import pathLeft from '../../global/sources/Expand_left_light.svg';
import { itsNotOK, itsNotOK2, isLogin, toastVisible, TextToast, LoginDatas } from '../../store/store';
import { useSetRecoilState, useRecoilState } from 'recoil';
import ViewPassword from '../../global/sources/View_outlined.svg';
import HidePassword from '../../global/sources/View_hide.svg';
import { useMutation } from '@tanstack/react-query';
import { MemberSignUp, EmailLoginData } from '../../api/apiPOST';
import { useNavigate } from 'react-router-dom';

function SignUpMember() {
  const navigate = useNavigate();
  const welcometext = '사용할 회원 정보를\n 입력해주세요';
  //로그인 유지를 위한 recoilstate
  const setAppLogin = useSetRecoilState(isLogin);

  //이메일 확인할 usestate
  const [checkemail, setCheckemail] = useState('');
  //비밀번호 확인할 usestate
  const [checkpassword, setCheckPassword] = useState('');
  //비밀번호 양식 다시 짚어줄 useState
  const [checkvalid, setCheckValid] = useState('');

  //회원가입 오류 출력 state
  const [reject, setReject] = useState('');

  //이메일 주소만 (409에러 대비)
  const setOnlyEmail = useSetRecoilState(LoginDatas);

  // toast 띄우는 state
  const setVisible = useSetRecoilState(toastVisible);

  // toast 에 들어갈 문구 recoilstate
  const setToastText = useSetRecoilState(TextToast);

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
    navigate('/signup');
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
    const emailData = e.target.value;
    setOnlyEmail(loginData.email);
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

  // 닉네임 생성
  const onblurChange = () => {
    const Nickname = loginData.email.split('@')[0];
    setLoginData({ ...loginData, nickname: Nickname });
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

  const LoginPocket = {
    email: loginData.email,
    password: loginData.password,
  };

  // 비밀번호 onChange
  const onChangePassword = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    setPsValid(true);
    const passwordData = e.target.value;
    const expword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$^&*-]).{8,}$/;
    if (expword.test(passwordData) === true) {
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

  const onSignUpData = () => {
    memberSignUp(loginData);
  };

  const onPasswordValid = () => {
    const expword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$^&*-]).{8,}$/;
    if (expword.test(loginData.password) === false) {
      setCheckPassword('잘못된 비밀번호 형식입니다');
      setTimeout(setCheckPassword, 1000);
      setCheckValid('8-30자리 영대・소문자, 숫자, 특수문자 조합');

      if (loginData.password === '') {
        setCheckPassword('빈칸을 채워주세요');
      }
      setIsPassword(false);
      setPsValid(false);
    } else {
      setCheckPassword('알맞은 형식입니다 :)');
      setCheckValid('');
      setIsPassword(true);
      setPsValid(true);
      onSignUpData();
    }
  };

  const onActiveEnter = (e) => {
    if (e.key === 'Enter') {
      onSubmitSignUpData();
    }
  };
  const { email, password } = loginData;
  const UserName = loginData.nickname;

  const onAutoLoginFunction = () => {
    emailLogin(LoginPocket);
  };

  //회원가입
  const { mutate: memberSignUp } = useMutation(MemberSignUp, {
    onSuccess: (response) => {
      onAutoLoginFunction();
    },
    onError: (err) => {
      setReject(err.response.data.errorMessage);
      setCheckemail(err.response.data.errorMessage);
      setCheckPassword(err.response.data.errorMessage);
      setValid(false);
      setIsEmail(false);
      setPsValid(false);
      setIsPassword(false);
    },
  });

  //동시로그인;
  const { mutate: emailLogin } = useMutation(EmailLoginData, {
    onSuccess: (response) => {
      sessionStorage.setItem('access_token', response.headers.access_token);
      sessionStorage.setItem('refresh_token', response.headers.refresh_token);
      sessionStorage.setItem('accountstate', response.data.accountState);
      sessionStorage.setItem('nickname', response.data.nickname);
      setAppLogin(true);
      setVisible(true);
      setToastText(`환영해요 ${UserName}님`);
      navigate('/');
    },
    onError: (err) => {
      setReject(err.response.data.errorMessage);
      setCheckemail(err.response.data.errorMessage);
      setCheckPassword(err.response.data.errorMessage);
      setValid(false);
      setIsEmail(false);
      setPsValid(false);
      setIsPassword(false);
    },
  });

  //회원가입 데이터 전송
  const onSubmitSignUpData = (e) => {
    // memberSignUp(loginData);
    onPasswordValid();
  };
  return (
    <>
      <ChoiceContainer>
        <SignUpHeader onClick={onPrevMemberPage}>
          <BackpageIconBox src={pathLeft} />
          <SignUpTitle>회원가입</SignUpTitle>
        </SignUpHeader>
        <WelcomeQuestionContainer>
          <WelcomeQuestionbox>{welcometext}</WelcomeQuestionbox>
        </WelcomeQuestionContainer>
        <InputContainer>
          <InputBox>
            <InputName>아이디(이메일)</InputName>

            <>
              <InputTextBox>
                <InputText
                  placeholder="lighthouse@gmail.com"
                  name="email"
                  type="text"
                  value={email}
                  onChange={onChangeEmail}
                  onBlur={onblurChange}
                  autocomplete="on"
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
            <form>
              <InputTextBox>
                <InputText
                  placeholder="8-30자리 영대・소문자, 숫자, 특수문자 조합"
                  autocomplete="new-password"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  onKeyDown={(e) => onActiveEnter(e)}
                  type={secret === false ? 'text' : 'password'}
                  style={{
                    border: isPassword === false ? '1px solid #d14343 ' : '1px solid var(--gray6)',
                  }}
                ></InputText>
              </InputTextBox>
            </form>
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
        <BlankContainer></BlankContainer>
        <ButtonContainer>
          <ButtonStyle type="submit" disabled={isValidLogin} onClick={onSubmitSignUpData}>
            시작하기
          </ButtonStyle>
        </ButtonContainer>
      </ChoiceContainer>
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
  background-color: white;
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
  min-height: 120px;
  background-color: var(--white);
  display: flex;
  align-items: center;
  position: relative;
`;

const WelcomeQuestionbox = styled.div`
  width: 200px;
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

  margin-bottom: 2px;
  background-color: var(--white);
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
  padding-left: 12px;
  border: none;
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
  /* align-items: center; */
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
  margin-top: 4px;
  display: flex;
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
const BlankContainer = styled.div`
  width: 360px;
  height: 100%;
  background-color: var(--white);
`;

const ButtonContainer = styled.div`
  width: 360px;
  min-height: 122px;
  background-color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
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
  cursor: pointer;
  :disabled {
    background-color: var(--gray5);
  }
  :enabled {
    background-color: var(--primary2-400);
    color: var(--white);
  }
`;

