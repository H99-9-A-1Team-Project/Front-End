import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { CloseModal, GoLogIn } from '../../store/store';
import { useMutation } from '@tanstack/react-query';
import { EmailLoginData } from '../../api/apiPOST';

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

  // 데이터 전송용 initialstate
  const initialState = {
    email: '',
    password: '',
  };

  // 데이터 전송을 위한 state
  const [result, setResult] = useState(initialState);

  // 이메일 오류용 state
  const [erroremail, setErrorEmail] = useState('');
  // 비밀번호 오류용 state
  const [errorpassword, setErrorPassWord] = useState('');
  // 관리자 승인 대기중 state
  const [waitpermit, setWaitPermit] = useState('');
  // 관리자 승인 거부 state
  const [rejectpermit, setRejectPermit] = useState('');

  //이메일 입력
  //폼에 맞는 이메일 정보 입력 state
  const [emailinput, setEmailInput] = useState({ mailid: '', atsign: '@', domain: '' });
  //이메일 input별 id 구조분해할당
  const { mailid, domain } = emailinput;
  //이메일 입력 이벤트 핸들러
  const onChangeEmail = (e) => {
    const { name, value } = e.target;
    setEmailInput({ ...emailinput, [name]: value });
    const mail = Object.values(emailinput);
    const Email = mail.join('');
    setResult({ ...result, email: Email });
  };
  //비밀번호 입력
  const onChangeContent = (e) => {
    const { name, value } = e.target;
    setResult({ ...result, [name]: value });
  };

  // 데이터 전송 후 toast message
  // const start = ()=>{
  //   toast("username님 환영해요")
  // }

  //로그인 데이터 전송
  const { mutate: emailLogin } = useMutation(EmailLoginData, {
    onSuccess: (response) => {
      sessionStorage.setItem('Access_Token', response.headers.Access_Token);
    },
    onError: (err) => {
      alert('로그인에 실패했습니다');
      setErrorEmail('존재하지 않는 이메일입니다');
      setErrorPassWord('비밀번호가 올바르지 않습니다');
      if (err.data.data.accountstate == 0) {
        alert('로그인에 실패했습니다');
        setErrorEmail('존재하지 않는 이메일입니다');
        setErrorPassWord('비밀번호가 올바르지 않습니다');
      }
      if (err.data.data.accountstate == 1) {
        alert('로그인에 실패했습니다');
        setWaitPermit(err.data.error.message, '관리자 승인 대기중입니다');
        setRejectPermit(err.data.error.message, '관리자 승인이 거부되었습니다');
        setErrorEmail('존재하지 않는 이메일입니다');
        setErrorPassWord('비밀번호가 올바르지 않습니다');
      }
    },
  });
  const onSubmitLoginData = () => {
    emailLogin(result);
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
              <MailInput onChange={onChangeEmail} name="mailid" value={mailid} placeholder="이메일 아이디" />@
              <MailSelect name="domain" className="box" value={domain || ''} id="domain-list" onChange={onChangeEmail}>
                <option value="" disabled>
                  선택해주세요
                </option>
                <option value="naver.com">naver.com</option>
                <option value="gmail.com">gmail.com</option>
                <option value="kakao.com">kakao.com</option>
                <option value="hanmail.net">hanmail.net</option>
                <option value="nate.com">nate.com</option>
                <option value="outlook.com">outlook.com</option>
                <option value="yahoo.com">yahoo.com</option>
                <option value="icloud.com">icloud.com</option>
              </MailSelect>
            </LoginMailInput>
            <MessageBox>{erroremail === '' ? <Message></Message> : <Message>{erroremail}</Message>}</MessageBox>

            {secret === true ? (
              <form>
                <PasswordInput name="password" type="password" placeholder="비밀번호를 입력해주세요" autoComplete="on" onChange={onChangeContent} />
                <MessageBox>{errorpassword === '' ? <Message></Message> : <Message>{errorpassword}</Message>}</MessageBox>
              </form>
            ) : (
              <form>
                <PasswordInput name="password" type="text" placeholder="비밀번호를 입력해주세요" onChange={onChangeContent} />
                <MessageBox>{errorpassword === '' ? <Message></Message> : <Message>{errorpassword}</Message>}</MessageBox>
              </form>
            )}
          </LoginInputBox>
          <PreviewPassword>
            <p onClick={onPreviewPW}>미리보기</p>
          </PreviewPassword>

          <LoginButtonBox>
            <LoginButton
              type="button"
              onClick={() => {
                onSubmitLoginData();
              }}
            >
              로그인
            </LoginButton>
          </LoginButtonBox>
        </ModalInnerContainer>
      ) : null}
    </div>
  );
}

export default LogIn;

const ModalInnerContainer = styled.div`
  width: 440px;
  height: 400px;
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

const MailInput = styled.input`
  width: 180px;
  height: 40px;
  border: none;
  background-color: beige;
`;

const MailSelect = styled.select`
  width: 180px;
  height: 40px;
  background-color: beige;
  border: none;
`;

const PasswordInput = styled.input`
  width: 380px;
  height: 40px;
  background-color: beige;
  border: none;
`;

const MessageBox = styled.div`
  width: 400px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Message = styled.div`
  width: 400px;
  height: 20px;
  display: flex;
  align-items: center;
  font-size: small;
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
  height: 90px;
  display: flex;
  justify-content: right;
  /* background-color: pink; */
`;

const LoginButton = styled.div`
  width: 100px;
  height: 50px;
  border-radius: 10px;
  margin-top: 20px;
  background-color: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: large;
`;
