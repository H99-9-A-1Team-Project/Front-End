import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { NextTor, NextMem, ChoiceMem, GoLogIn } from '../../store/store';
import SignUpModalLayout from '../signup/SignUpModalLayout';
import SignUpMember from './SignUpMember';
import SignUpRealtor from './SignUpRealtor';
import LogIn from './LogIn';

function SignUp() {
  const [modalOpen, setModalOpen] = useState(false);
  const [early, setEarly] = useState(false);
  const [alreadysignin, setAlreadySignIn] = useState(false);

  const [nextmem, setNextMem] = useRecoilState(NextMem);
  const [nexttor, setNextTor] = useRecoilState(NextTor);
  const [choiceBool, setChoiceBool] = useRecoilState(ChoiceMem);
  const [goinglogin, setGoingLogin] = useRecoilState(GoLogIn);

  const onOpenModal = () => {
    setModalOpen(true);
  };
  const onCloseModal = () => {
    setModalOpen(false);
    window.location.reload();
  };

  const onNextMemberModal = () => {
    setNextMem(nextmem + 2);
    setChoiceBool(true);
    setEarly(true);
    console.log(Boolean(nextmem));
    console.log(nextmem);
  };

  const onNextRealtorModal = () => {
    setNextTor(nexttor + 1);
    setChoiceBool(false);
    setEarly(true);
    console.log(Boolean(nexttor));
    console.log(nexttor);
  };

  // const onAlreadySignIn = () => {
  //   setAlreadySignIn(false);
  //   console.log(alreadysignin);
  // };

  const onGoingLogIn = () => {
    setGoingLogin(goinglogin + 1);
    setAlreadySignIn(true);
    setEarly(true);
    console.log(goinglogin);
  };

  //이미지 등록

  //이메일 입력

  //비밀번호 입력

  //닉네임 입력

  //전화번호 입력

  return (
    <div>
      {/* <button
        type="button"
        onClick={() => {
          setModalOpen(!modalOpen);
        }}
      >
        모달팝업버튼
        {modalOpen && (
          <SignUpModalLayout visible={onOpenModal} closeable={true} maskCloseable={true} onClose={onCloseModal}> */}
      <ModalContainer>
        {early === false || (nextmem === 0 && nexttor === 0 && goinglogin === 0) ? (
          <>
            <ModalInnerContainer>
              <HeadButtonsContainer>
                <div onClick={onCloseModal}>닫기</div>
              </HeadButtonsContainer>
              <QuestionContainer>
                <Questionbox>반가워요!</Questionbox>
                <Questionbox>어느 회원이신가요!</Questionbox>
              </QuestionContainer>
              <ChoiceButtonsContainer>
                <div>
                  <ButtonBox onClick={onNextMemberModal}>일반 회원입니다</ButtonBox>
                </div>
                <div>
                  <ButtonBox onClick={onNextRealtorModal}>공인중개사 입니다</ButtonBox>
                </div>
              </ChoiceButtonsContainer>
              <AlreadyJoinBox>
                <div onClick={onGoingLogIn}>이미 가입되어있습니다 </div>
              </AlreadyJoinBox>
            </ModalInnerContainer>
          </>
        ) : (
          <>
            {alreadysignin === false ? (
              <>
                {choiceBool === true ? (
                  <>
                    <ModalContainer>
                      <SignUpMember />
                      {nextmem < 5 ? <div onClick={onNextMemberModal}>다음</div> : <div>시작하기</div>}
                    </ModalContainer>
                  </>
                ) : (
                  <>
                    <ModalContainer>
                      <SignUpRealtor />
                      {nexttor < 5 ? <div onClick={onNextRealtorModal}>다음</div> : <div>인증신청</div>}
                    </ModalContainer>
                  </>
                )}
              </>
            ) : (
              <ModalContainer>
                <LogIn />
              </ModalContainer>
            )}
          </>
        )}
      </ModalContainer>
      {/* </SignUpModalLayout>
        )}
      </button> */}
    </div>
  );
}
export default SignUp;
const ModalContainer = styled.div`
  width: 480px;
  height: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
`;

const ModalInnerContainer = styled.div`
  width: 440px;
  height: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const HeadButtonsContainer = styled.div`
  width: 440px;
  height: 40px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
`;
const QuestionContainer = styled.div`
  width: 440px;
  height: 80px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
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
const ChoiceButtonsContainer = styled.div`
  width: 440px;
  height: 200px;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const ButtonBox = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 20px;
  border: 2px solid gray;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const AlreadyJoinBox = styled.div`
  width: 440px;
  height: 40px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
