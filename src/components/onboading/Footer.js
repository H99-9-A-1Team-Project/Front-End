import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  return (
    <Container>
      <SignUpBtn
        onClick={() => {
          navigate('/signup');
        }}
      >
        빠르게 회원가입하고 시작하기
      </SignUpBtn>
      <LoginBtn
        onClick={() => {
          navigate('/login');
        }}
      >
        이미 아이디가 있습니다
      </LoginBtn>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 360px;
  margin-bottom: 32px;
  @media (max-width: 500px) {
    width: 100%;
    align-items: center;
  }
`;

const SignUpBtn = styled.div`
  width: 328px;
  height: 52px;
  background: var(--primary2-400);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--Shadow2-box-shadow);
  color: white;
  border-radius: 8px;
  margin-left: 18px;
  font-family: var(--button-font-family);
  font-size: var(--button_Large-font-size);
  font-weight: var(--button_Large-font-weight);
  line-height: var(--button_Large-line-height);
  letter-spacing: var(--button_Large-letter-spacing);
  cursor: pointer;
  @media (max-width: 500px) {
    margin-left: 0;
  }
`;

const LoginBtn = styled.div`
  margin-left: 111px;
  margin-top: 24px;
  width: 140px;
  height: 20px;
  font-family: var(--button-font-family);
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.1px;
  text-decoration-line: underline;
  color: var(--gray4);
  cursor: pointer;
  @media (max-width: 500px) {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 0;
    width: 160px;
  }
`;
