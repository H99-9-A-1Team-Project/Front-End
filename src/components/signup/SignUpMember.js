import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { NextMem, CloseModal } from '../../store/store';
import ProgressBar from './Progress';

function SignUpMember() {
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

  // 데이터 전송용 initialstate
  const initialState = {
    email: '',
    password: '',
    nickName: '',
  };

  // 데이터 전송을 위한 state
  const [result, setResult] = useState(initialState);

  //이메일 입력
  //폼에 맞는 이메일 정보 입력 state
  const [email, setEmail] = useState({ mailid: '', atsign: '@', domain: '' });
  //이메일 input별 id 구조분해할당
  const { mailid, domain } = email;
  //이메일 입력 이벤트 핸들러
  const onChangeEmail = (e) => {
    const { name, value } = e.target;
    setEmail({ ...email, [name]: value });
    console.log(email);
  };

  //비밀번호, 닉네임 입력
  const onChangeContent = (e) => {
    const { name, value } = e.target;
    setResult({ ...result, [name]: value });
    console.log(result);
  };

  console.log(nextmem);
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
              <Questionbox>이메일을 입력해주세요</Questionbox> <Questionbox>이메일은 아이디로 사용됩니다</Questionbox>
            </QuestionContainer>
            <MailBox>
              <input onChange={onChangeEmail} name="mailid" value={mailid} placeholder="이메일 아이디" />@
              <select name="domain" className="box" value={domain} id="domain-list" onChange={onChangeEmail}>
                <option value="naver.com">naver.com</option>
                <option value="gmail.com">gmail.com</option>
                <option value="kakao.com">kakao.com</option>
                <option value="hanmail.net">hanmail.net</option>
                <option value="nate.com">nate.com</option>
                <option value="outlook.com">outlook.com</option>
                <option value="yahoo.com">yahoo.com</option>
                <option value="icloud.com">icloud.com</option>
              </select>
            </MailBox>
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
              <input placeholder="비밀번호를 입력해주세요" name="password" onChange={onChangeContent} />
            </PasswordBox>
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
              <input placeholder="닉네임을 입력해주세요 " name="nickName" onChange={onChangeContent} />
            </NickNameBox>
          </ModalInnerContainer>
        </>
      ) : null}
    </div>
  );
}

export default SignUpMember;

const ModalInnerContainer = styled.div`
  width: 440px;
  height: 330px;
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

const MailBox = styled.div`
  width: 480px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: red; */
`;

const PasswordBox = styled.div`
  width: 480px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: red; */
`;

const NickNameBox = styled.div`
  width: 480px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: red; */
`;
