import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { NextTor, NextMem, ChoiceMem, GoLogIn, CloseModal } from '../../store/store';
import SignUpMember from './SignUpMember';
import SignUpRealtor from './SignUpRealtor';
import LogIn from './LogIn';

function SignUp() {
  // 모달 닫을때 필요한 recoilstate
  const [modalOpen, setModalOpen] = useRecoilState(CloseModal);
  // 초기로그인 모달 화면 열기 위한 state
  const [early, setEarly] = useState(false);

  //로그인 모달 열때 필요한 state, 삼항연산자용
  const [alreadysignin, setAlreadySignIn] = useState(false);
  //일반회원 모달 다음으로 넘기기 위한 recoilstate
  const [nextmem, setNextMem] = useRecoilState(NextMem);
  //공인중개사 회원 모달 다음으로 넘기기 위한 recoilstate
  const [nexttor, setNextTor] = useRecoilState(NextTor);

  //모달 마지막 페이지에서 버튼 바꾸기 위한 recoilstate
  const [choiceBool, setChoiceBool] = useRecoilState(ChoiceMem);

  //이미 가입된 회원 로그인 모달 열때 필요한 recoilstate
  const [goinglogin, setGoingLogin] = useRecoilState(GoLogIn);

  // 모달 닫는 이벤트 핸들러
  const onCloseModal = (e) => {
    setModalOpen(false);
    setNextMem(0);
    setNextTor(0);
    setGoingLogin(0);
  };

  // 일반회원 모달 다음으로 넘기는 버튼용 함수
  const onNextMemberModal = () => {
    setNextMem(nextmem + 2);
    setChoiceBool(true);
    setEarly(true);
    console.log(Boolean(nextmem));
    console.log(nextmem);
  };

  // 공인중개사회원 모달 다음으로 넘기는 버튼용 함수
  const onNextRealtorModal = () => {
    setNextTor(nexttor + 1);
    setChoiceBool(false);
    setEarly(true);
    console.log(Boolean(nexttor));
    console.log(nexttor);
  };

  // 이미 가입된 회원 모달 다음으로 넘기는 버튼용 함수
  const onGoingLogIn = () => {
    setGoingLogin(goinglogin + 1);
    setAlreadySignIn(true);
    setEarly(true);
    console.log(goinglogin);
  };

  return (
    <div>
      <ModalContainer>
        {early === false || (nextmem === 0 && nexttor === 0 && goinglogin === 0) ? (
          <>
            <PrograssbarContainer></PrograssbarContainer>
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

const PrograssbarContainer = styled.div`
  width: 480px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
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
