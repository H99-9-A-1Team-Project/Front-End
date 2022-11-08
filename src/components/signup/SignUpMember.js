import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { ChoiceMem, NextMem } from '../../store/store';

function SignUpMember() {
  const [nextmem, setNextMem] = useRecoilState(NextMem);
  const [modalOpen, setModalOpen] = useState(false);
  const [choiceBool, setChoiceBool] = useRecoilState(ChoiceMem);
  const [early, setEarly] = useState(false);

  const onCloseModal = () => {
    setModalOpen(false);
    window.location.reload();
  };

  const onPrevMemberModal = () => {
    setNextMem(nextmem - 2);
    setChoiceBool(true);
    setEarly(false);
    console.log(nextmem);
    console.log(choiceBool);
  };

  const initialState = {
    email: '',
    password: '',
    nickname: '',
  };

  //이메일 입력
  const [email, setEmail] = useState(initialState);
  const onChangeContent = (e) => {
    const { name, value } = e.target;
    setEmail({ ...email, [name]: value });
    console.log(email);
  };

  //비밀번호 입력

  //닉네임 입력

  console.log(nextmem);
  return (
    <div>
      {nextmem === 2 ? (
        <ModalInnerContainer>
          <PrograssbarContainer>프로그래스바 부분</PrograssbarContainer>
          <HeadButtonsContainer>
            <div onClick={onPrevMemberModal}>뒤로가기</div> <div onClick={onCloseModal}>취소</div>
          </HeadButtonsContainer>
          <QuestionContainer>
            <Questionbox>이메일을 입력해주세요</Questionbox> <Questionbox>이메일은 아이디로 사용됩니다</Questionbox>
          </QuestionContainer>
          <MailBox>
            <input onChange={onChangeContent} name="email" placeholder="이메일을 입력해주세요" />@
            <input name="email" onChange={onChangeContent} />
          </MailBox>
        </ModalInnerContainer>
      ) : null}
      {nextmem === 4 ? (
        <ModalInnerContainer>
          <PrograssbarContainer>프로그래스바 부분</PrograssbarContainer>
          <HeadButtonsContainer>
            <div onClick={onPrevMemberModal}>뒤로가기</div>
            <div onClick={onCloseModal}>취소</div>
          </HeadButtonsContainer>
          <QuestionContainer>
            <Questionbox>사용하실 비밀번호를 입력해주세요</Questionbox>
          </QuestionContainer>
          <PasswordBox>
            <input placeholder="비밀번호를 입력해주세요" />
          </PasswordBox>
        </ModalInnerContainer>
      ) : null}
      {nextmem === 6 ? (
        <ModalInnerContainer>
          <PrograssbarContainer>프로그래스바 부분</PrograssbarContainer>
          <HeadButtonsContainer>
            <div onClick={onPrevMemberModal}>뒤로가기</div>
            <div onClick={onCloseModal}>취소</div>
          </HeadButtonsContainer>
          <QuestionContainer>
            <Questionbox>마지막입니다!</Questionbox>
            <Questionbox>닉네임은 무엇으로 하시겠어요?</Questionbox>
          </QuestionContainer>
          <NickNameBox>
            <input placeholder="닉네임을 입력해주세요 " />
          </NickNameBox>
        </ModalInnerContainer>
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
  margin-top: 10px;
`;
const PrograssbarContainer = styled.div`
  width: 440px;
  height: 30px;
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
