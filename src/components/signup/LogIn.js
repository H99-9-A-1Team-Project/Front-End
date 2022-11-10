import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { CloseModal, GoLogIn } from '../../store/store';

function LogIn() {
  //모달 닫을 때 필요한 recoilstate
  const [modalOpen, setModalOpen] = useRecoilState(CloseModal);
  //로그인 모달 열때 필요한 recoilstate
  const [goinglogin, setGoingLogin] = useRecoilState(GoLogIn);
  //비밀번호 미리보기를 위한 state
  const [secret, setSecret] = useState(true);

  // 모달 닫는 이벤트 핸들러
  const onCloseModal = (e) => {
    setModalOpen(false);
    setGoingLogin(0);
  };

  //비밀번호 미리보기 이벤트 핸들러
  const onPreviewPW = (e) => {
    setSecret(!secret);
  };

  //이메일 입력
  //폼에 맞는 이메일 정보 입력 state
  const [email, setEmail] = useState({ mailid: '', atsign: '@', domain: '' });
  // 이메일 input별 id 구조분해 할당
  const { mailid, domain } = email;

  //이메일 입력 이벤트 핸들러
  const onChangeContent = (e) => {
    const { name, value } = e.target;
    setEmail({ ...email, [name]: value });
    console.log(email);
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
              <select name="domain" className="box" value={domain} id="domain-list" onChange={onChangeContent}>
                <option value="naver.com">naver.com</option>
                <option value="gmail.com">gmail.com</option>
                <option value="kakao.com">kakao.com</option>
                <option value="hanmail.net">hanmail.net</option>
                <option value="nate.com">nate.com</option>
                <option value="outlook.com">outlook.com</option>
                <option value="yahoo.com">yahoo.com</option>
                <option value="icloud.com">icloud.com</option>
              </select>
            </LoginMailInput>
            {secret === true ? (
              <form>
                <PasswordInput
                  name="password"
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  autoComplete="on"
                />
              </form>
            ) : (
              <form>
                <PasswordInput name="password" type="text" placeholder="비밀번호를 입력해주세요" />
              </form>
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
