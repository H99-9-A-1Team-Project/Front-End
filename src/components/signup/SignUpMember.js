import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { NextMem, CloseModal } from '../../store/store';
import ProgressBar from './Progress';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { MemberSignUp, RequestEmail, RequestNickName } from '../../api/apiPOST';

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

  //중복된 닉네임 확인 state
  const [doublenickname, setDoubleNickName] = useState('');
  //이메일 중복확인을 위한 이메일 전송용 state
  const [checkemail, setCheckEmail] = useState('');
  //중복된 이메일 확인 서버응답용 state
  const [emailapprove, setEmailApprove] = useState('');

  //닉네임 중복확인을 위한 닉네임 전송용 state
  const [checknickname, setCheckNickName] = useState('');

  //중복된 닉네임 확인 서버 응답용 state
  const [nicknameapprove, setNickNameApprove] = useState('');

  //회원가입 승인을 위한 state
  const [admit, setAdmit] = useState('');

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
    console.log(mail);
    console.log(Email);
    setCheckEmail(Email);
    setResult({ ...result, email: Email });
    console.log(result);
    // console.log('이메일 중복확인을 위한 체크', checkemail);
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
      setNextMem(2);
      setEmailApprove();
      setAdmit('');
    },
    onError: (temp) => {},
  });
  // 회원가입 데이터 전송
  const { mutate: memberSignup } = useMutation(MemberSignUp, {
    onSuccess: (response) => {
      setNextMem(6);
      alert('가입 완료');
    },
    onError: () => {
      setDoubleNickName('message');
    },
  });

  //이메일만 전송
  const onCheckEmail = (e) => {
    ConfirmEmail(checkemail);
  };

  //전체 데이터 전송
  const onSubmitHandler = (e) => {};

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
            <MailBox>
              <MailInput onChange={onChangeEmail} name="mailid" value={mailid} placeholder="아이디 입력" /> @
              <MailSelect name="domain" className="box" value={domain || ''} id="domain-list" type="password" autocomplete ="off" onChange={onChangeEmail}>
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
            <p>{emailapprove.error}</p>
            <Buttondiv
              onClick={() => {
                onNextMemberModal();
                onCheckEmail();
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
              <PasswordInput
                placeholder="비밀번호를 입력해주세요"
                name="password"
                type = "password"
                onChange={onChangeContent}
                value={result.password}
              />
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
            <NickNameBox>
              <NickNameInput
                placeholder="닉네임을 입력해주세요 "
                name="nickname"
                onChange={onChangeContent}
                value={result.nickname}
              />
            </NickNameBox>
            <p></p>
            {admit === true ? (
              <Buttondiv
                onClick={() => {
                  onNextMemberModal();
                  onCheckEmail();
                }}
              >
                시작하기
              </Buttondiv>
            ) : (
              <Buttondiv onClick={() => onSubmitHandler()}>시작하기</Buttondiv>
            )}
          </ModalInnerContainer>
        </>
      ) : null}
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
  width: 480px;
  height: 80px;
  display: flex;
  flex-direction: column;
  font-size: x-large;
`;

const Questionbox = styled.div`
  width: 480px;
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

const MailBox = styled.div`
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
const NickNameBox = styled.div`
  width: 480px;
  height: 120px;
  display: flex;
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
