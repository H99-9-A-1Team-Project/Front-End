import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { GoLogIn } from '../../store/store';

function LogIn() {
  const [modalOpen, setModalOpen] = useState(false);
  const [goinglogin, setGoingLogin] = useRecoilState(GoLogIn);
  const [secret, setSecret] = useState(true);
  const onCloseModal = () => {
    setModalOpen(false);
    window.location.reload();
  };

  //미리보기
  const onPreviewPW = () => {
    setSecret(!secret);
  };

  return (
    <div>
      {goinglogin === 1 ? (
        <ModalInnerContainer>
          <HeadButtonsContainer>
            <div onClick={onCloseModal}>취소</div>
          </HeadButtonsContainer>
          <LogInContainer>
            <Loginbox>로그인 후</Loginbox> <Loginbox>서비스 이용이 가능해요</Loginbox>
          </LogInContainer>
          <LoginInputBox>
            <LoginMailInput>
              <EmailInput name="email" placeholder="이메일을 입력해주세요" />@
              <EmailInput name="email" />
            </LoginMailInput>
            {secret === true ? (
              <PasswordInput name="password" type="password" placeholder="비밀번호를 입력해주세요" />
            ) : (
              <PasswordInput name="password" type="text" placeholder="비밀번호를 입력해주세요" />
            )}
          </LoginInputBox>
          <PreviewPassword>
            <p onClick={onPreviewPW}>미리보기</p>
          </PreviewPassword>

          <LoginButtonBox>
            <LoginButton>로그인</LoginButton>
          </LoginButtonBox>
        </ModalInnerContainer>
      ) : null}
    </div>
  );
}

export default LogIn;

const ModalInnerContainer = styled.div`
  width: 440px;
  height: 330px;
  /* background-color: pink; */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
`;

const HeadButtonsContainer = styled.div`
  width: 440px;
  height: 10px;
  display: flex;
  flex-direction: row;
  justify-content: right;
  margin-top: 10px;
`;

const LogInContainer = styled.div`
  width: 440px;
  height: 80px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  font-size: x-large;
  justify-content: center;
`;

const Loginbox = styled.div`
  width: 480px;
  height: 50px;
  display: flex;
  justify-content: left;
  align-items: left;
  margin-left: 30px;
`;

const LoginInputBox = styled.div`
  width: 480px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: yellow; */
`;

const LoginMailInput = styled.div`
  width: 480px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: red; */
`;

const EmailInput = styled.input`
  width: 150px;
  height: 30px;
  border-radius: 10px;
`;

const PasswordInput = styled.input`
  width: 330px;
  height: 40px;
  border-radius: 10px;
`;

const PreviewPassword = styled.div`
  width: 440px;
  height: 40px;
  display: flex;
  align-items: center;
  margin-top: 50px;
`;

const LoginButtonBox = styled.div`
  width: 440px;
  height: 70px;
  display: flex;
  justify-content: right;
`;

const LoginButton = styled.div`
  width: 130px;
  height: 50px;
  border-radius: 10px;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: large;
`;
