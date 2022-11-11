import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { NextMem, CloseModal } from '../../store/store';
import ProgressBar from './Progress';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { MemberSignUp, RequestEmail, RequestNickName } from '../../api/apiPOST';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function SignUpMember(props) {
  // 모달 다음창으로 넘기는 recoilstate
  const [nextmem, setNextMem] = useRecoilState(NextMem);
  // 모달 닫을때 필요한 recoilstate
  const [modalOpen, setModalOpen] = useRecoilState(CloseModal);

  // 모달 닫는 이벤트 핸들러
  const onCloseModal = (e) => {
    setModalOpen(false);
    setNextMem(0);
  };
  // 모달 뒤로가기 이벤트 핸들러
  const onPrevMemberModal = (e) => {
    setNextMem(nextmem - 2);
    console.log(nextmem);
  };
  // 일반회원 모달 다음으로 넘기는 버튼용 함수
  const onNextMemberModal = () => {
    setNextMem(nextmem + 2);
    console.log(nextmem);
  };

  // 데이터 전송용 initialstate
  const initialState = {
    email: '',
    password: '',
    nickname: '',
  };
  // 데이터 전송을 위한 state
  const [result, setResult] = useState(initialState);

  //회원가입 오류 확인 state
  const [failsignup, setFailSignUp] = useState('');
  //이메일 중복확인을 위한 이메일 전송용 state
  const [checkemail, setCheckEmail] = useState('');
  //중복된 이메일 확인 서버응답용 state
  const [emailapprove, setEmailApprove] = useState('');
  //중복된 이메일에 대한 경고용 state
  const [emailreject, setEmailReject] = useState('');

  //닉네임 중복확인을 위한 닉네임 전송용 state
  const [checknickname, setCheckNickName] = useState('');
  //중복된 닉네임 확인 서버 응답용 state
  const [nicknameapprove, setNickNameApprove] = useState('');
  //중복된 닉네임에 대한 경고용 state
  const [nicknamereject, setNickNameReject] = useState('');
  //회원가입 승인 버튼을 위한 state
  const [admit, setAdmit] = useState(true);

  // 회원가입 승인 후 토스트 메시지용 state
  const [okusername, setOkUserName] = useState();
  console.log(okusername);
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
    setCheckEmail(Email);
    setResult({ ...result, email: Email });
  };

  //비밀번호, 닉네임 입력
  const onChangeContent = (e) => {
    const { name, value } = e.target;
    setResult({ ...result, [name]: value });
    console.log(result);
  };

  //이메일 중복확인
  const { mutate: ConfirmEmail } = useMutation(RequestEmail, {
    onSuccess: (temp) => {
      setEmailApprove('사용할 수 있는 이메일입니다');
      setAdmit(true);
    },
    onError: (temp) => {
      // setNextMem(2);
      setEmailReject('이미 가입된 회원입니다');
    },
  });

  //닉네임 중복확인
  const { mutate: ConfirmNickName } = useMutation(RequestNickName, {
    onSuccess: (temp) => {
      setNickNameApprove('사용할 수 있는 닉네임입니다.');
      setAdmit(false);
    },
    onError: (temp) => {
      setNickNameReject('중복된 닉네임입니다');
    },
  });

  //이메일만 전송
  const onCheckEmail = (e) => {
    ConfirmEmail(checkemail);
  };

  //닉네임만 전송
  const onCheckNickName = (e) => {
    ConfirmNickName(checknickname);
  };
  // 회원가입 데이터 전송
  const { mutate: memberSignup } = useMutation(MemberSignUp, {
    onSuccess: (response) => {
      alert('가입 완료');
      setOkUserName(result.nickname);
    },
    onError: () => {
      setFailSignUp('회원가입에 실패했습니다');
      alert('가입 실패');
      setNextMem(6);
    },
  });

  //일반회원 회원가입 데이터 전송
  const onSubmitHandler = (e) => {
    memberSignup(result);
  };

  // 데이터 전송 후 toast message
  // const start = () => {
  //   toast.success('환영합니다!', {
  //     position: 'bottom-center',
  //     autoClose: 3000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: 'light',
  //   });
  // };

  return (
    <div>
      {nextmem === 2 ? (
        <>
          <PrograssbarContainer>
            <ProgressBar value={33} max={100} />
          </PrograssbarContainer>
          <ModalInnerContainer>
            <HeadButtonsContainer>
              <div onClick={onPrevMemberModal}>뒤로가기</div> <div onClick={onCloseModal}>취소</div>
            </HeadButtonsContainer>
            <QuestionContainer>
              <Questionbox>이메일을 입력해주세요</Questionbox> <QuestionInfo>이메일은 아이디로 사용됩니다</QuestionInfo>
            </QuestionContainer>
            <MailContainer>
              <MailBox>
                <MailInput onChange={onChangeEmail} name="mailid" value={mailid} placeholder="아이디 입력" /> @
                <MailSelect name="domain" className="box" value={domain || ''} id="domain-list" type="password" autocomplete="off" onChange={onChangeEmail}>
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
              </MailBox>
              <MessageBox>{emailapprove === '' ? <Message>{emailreject}</Message> : <Message>{emailapprove}</Message>}</MessageBox>
            </MailContainer>

            <Buttondiv
              onClick={() => {
                admit === false ? onCheckEmail() : onNextMemberModal();
              }}
            >
              다음
            </Buttondiv>
          </ModalInnerContainer>
        </>
      ) : null}
      {nextmem === 4 ? (
        <>
          <PrograssbarContainer>
            <ProgressBar value={66} max={100} />
          </PrograssbarContainer>
          <ModalInnerContainer>
            <HeadButtonsContainer>
              <div onClick={onPrevMemberModal}>뒤로가기</div>
              <div onClick={onCloseModal}>취소</div>
            </HeadButtonsContainer>
            <QuestionContainer>
              <Questionbox>사용하실 비밀번호를 입력해주세요</Questionbox>
            </QuestionContainer>
            <PasswordBox>
              <PasswordInput placeholder="비밀번호를 입력해주세요" name="password" type="password" onChange={onChangeContent} value={result.password} />
            </PasswordBox>
            <Buttondiv onClick={onNextMemberModal}>다음</Buttondiv>
          </ModalInnerContainer>
        </>
      ) : null}
      {nextmem === 6 ? (
        <>
          <PrograssbarContainer>
            <ProgressBar value={100} max={100} />
          </PrograssbarContainer>
          <ModalInnerContainer>
            <HeadButtonsContainer>
              <div onClick={onPrevMemberModal}>뒤로가기</div>
              <div onClick={onCloseModal}>취소</div>
            </HeadButtonsContainer>
            <QuestionContainer>
              <Questionbox>마지막입니다!</Questionbox>
              <Questionbox>닉네임은 무엇으로 하시겠어요?</Questionbox>
            </QuestionContainer>
            <NickNameContainer>
              <NickNameBox>
                <NickNameInput placeholder="닉네임을 입력해주세요 " name="nickname" onChange={onChangeContent} value={result.nickname} />
                <MessageBox>{nicknameapprove === '' ? <Message>{nicknamereject}</Message> : <Message>{nicknameapprove}</Message>}</MessageBox>
              </NickNameBox>
            </NickNameContainer>
            {admit === false ? (
              <Buttondiv
                onClick={() => {
                  onCheckNickName();
                }}
              >
                시작하기
              </Buttondiv>
            ) : (
              <Buttondiv
                onClick={() => {
                  onSubmitHandler();
                  // start();
                }}
              >
                시작하기
              </Buttondiv>
            )}
          </ModalInnerContainer>
        </>
      ) : null}
      {/* <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" /> */}
    </div>
  );
}

export default SignUpMember;

const ModalInnerContainer = styled.form`
  width: 440px;
  height: 380px;
  /* background-color: pink; */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  /* background-color: red; */
  margin-left: auto;
  margin-right: auto;
`;
const PrograssbarContainer = styled.div`
  width: 480px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  progress {
    width: 100%;
    height: 20px;
    border: none;
    color: beige;
    -webkit-appearance: none;
    appearance: none;
    ::-webkit-progress-bar {
      background-color: lightgray;
    }
    ::-webkit-progress-value {
      background-color: beige;
    }
  }
`;

const HeadButtonsContainer = styled.div`
  width: 440px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const QuestionContainer = styled.div`
  width: 440px;
  height: 80px;
  display: flex;
  flex-direction: column;
  font-size: x-large;
`;

const Questionbox = styled.div`
  width: 440px;
  height: 50px;
  display: flex;
  justify-content: left;
  align-items: left;
  margin-left: 30px;
`;
const QuestionInfo = styled.div`
  font-size: medium;
  margin-left: 30px;
  margin-right: 30px;
`;

const MailContainer = styled.div`
  width: 480px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MailBox = styled.div`
  width: 480px;
  height: 40px;
  display: flex;
  flex-direction: row;
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

const PasswordBox = styled.div`
  width: 480px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: red; */
`;

const PasswordInput = styled.input`
  width: 440px;
  height: 40px;
  background-color: beige;
  border: none;
`;

const NickNameContainer = styled.div`
  width: 480px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const NickNameBox = styled.div`
  width: 480px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: red; */
`;

const NickNameInput = styled.input`
  width: 440px;
  height: 40px;
  background-color: beige;
  border: none;
`;

const Buttondiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  border-radius: 10px;
  background-color: lightgray;
  margin-top: 70px;
  margin-left: 300px;
`;
