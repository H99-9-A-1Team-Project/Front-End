import React, { useState } from 'react';
import styled from 'styled-components';
import pathLeft from '../signup/sources/article_path_left.png';
import { useRecoilState } from 'recoil';
import { GoLogIn, isLogin } from '../../store/store';
import Title from '../signup/sources/Title.png';
import ViewPassword from '../signup/sources/View_password.png';
import HidePassword from '../signup/sources/View_hide_password.png';
import { useMutation } from '@tanstack/react-query';
import { EmailLoginData } from '../../api/apiPOST';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  //이미 가입된 회원 로그인 창 열때 필요한 recoilstate
  const [goinglogin, setGoingLogin] = useRecoilState(GoLogIn);

  //이메일 잘못 입력 에러 출력 state
  const [errormail, setErrorMail] = useState('');
  //비밀번호 잘못 입력 에러 출력 state
  const [errorpassword, setErrorPassWord] = useState('');

  //비밀번호 미리보기를 위한 state
  const [secret, setSecret] = useState(true);

  const [AppLogin, setAppLogin] = useRecoilState(isLogin);

  //비밀번호 미리보기 이벤트 핸들러
  const onPreviewPW = (e) => {
    setSecret(!secret);
  };

  // 이미 가입된 회원 모달 이전으로 넘기는 버튼용 함수
  const onGoingLogIn = () => {
    setGoingLogin(goinglogin - 1);
  };

  // 데이터 전송을 위한 initialState

  const initialState = {
    email: '',
    password: '',
  };

  // 데이터 전송을 위한 state
  const [result, setResult] = useState(initialState);

  //이메일 및 비밀번호 입력

  const onChangeLoginInput = (e) => {
    const { name, value } = e.target;
    setResult({ ...result, [name]: value });
    console.log(result);
  };

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
      alert('로그인 실패');
    },
  });

  const onSubmitLoginData = () => {
    setErrorMail('');
    emailLogin(result);

    // const EmailAddress = result.email;
    // if (EmailAddress.includes('@') === true) {
    //   setErrorMail('');
    //   emailLogin(result);
    // } else {
    //   setErrorMail('잘못된 이메일 형식입니다');
    // }
  };

  return (
    <>
      {goinglogin === 1 ? (
        <ChoiceContainer>
          <SignUpHeader>
            <BackpageIconBox src={pathLeft} onClick={onGoingLogIn} />
            <SignUpTitle>로그인</SignUpTitle>
          </SignUpHeader>
          <WelcomeQuestionContainer>
            <WelcomeQuestionbox>
              <SmallFont>등본 대신 해석해주는</SmallFont>
              <BigFontImage src={Title} />
            </WelcomeQuestionbox>
          </WelcomeQuestionContainer>
          <InputContainer>
            <InputName>아이디</InputName>
            {errormail === '' ? (
              <>
                <InputText placeholder="아이디를 입력해주세요" name="email" onChange={onChangeLoginInput}></InputText>
                <InputErrorMessageBox>
                  <InputErrorMessage></InputErrorMessage>
                </InputErrorMessageBox>
              </>
            ) : (
              <>
                <InputTextError placeholder="아이디를 입력해주세요" name="email" onChange={onChangeLoginInput}></InputTextError>
                <InputErrorMessageBox>
                  <InputErrorMessage>{errormail} </InputErrorMessage>
                </InputErrorMessageBox>
              </>
            )}
            <InputName>비밀번호</InputName>
            {errorpassword === '' ? (
              <>
                <form>
                  <InputText placeholder="비밀번호를 입력해주세요" name="password" type={secret === false ? 'text' : 'password'} autocomplete="on" onChange={onChangeLoginInput}></InputText>
                </form>
                <InputErrorMessageBox>
                  <InputErrorMessage></InputErrorMessage>
                </InputErrorMessageBox>
                <PasswordViewButtonContainer>
                  <PasswordViewButtonImg src={secret === false ? ViewPassword : HidePassword} onClick={onPreviewPW} />
                </PasswordViewButtonContainer>
              </>
            ) : (
              <>
                <form>
                  <InputTextError placeholder="비밀번호를 입력해주세요" name="password" type={secret === false ? 'text' : 'password'} autocomplete="on" onChange={onChangeLoginInput}></InputTextError>
                </form>
                <InputErrorMessageBox>
                  <InputErrorMessage>잘못된 비밀번호 형식입니다 </InputErrorMessage>
                </InputErrorMessageBox>
                <PasswordViewButtonContainer>
                  <PasswordViewButtonImg src={secret === false ? ViewPassword : HidePassword} onClick={onPreviewPW} />
                </PasswordViewButtonContainer>
              </>
            )}
          </InputContainer>
          <BlankContainer2></BlankContainer2>
          <ButtonContainer>
            <ButtonStyle onClick={onSubmitLoginData}>시작하기</ButtonStyle>
          </ButtonContainer>
        </ChoiceContainer>
      ) : null}
    </>
  );
}

export default Login;

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
  height: 187px;
  background-color: white;
  display: flex;
  position: relative;
  justify-content: center;
`;

const WelcomeQuestionbox = styled.div`
  width: 147px;
  height: 71px;
  background-color: white;
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
  background-color: white;
  font-family: 'Leferi Point Type';
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 28px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #25282b;
`;

const BigFontImage = styled.img`
  width: 147px;
  height: 36px;
  background-color: white;
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
  margin-bottom: 4px;
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
  height: 293px;
  background-color: white;
`;
const BlankContainer2 = styled.div`
  width: 360px;
  height: 269px;
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
