import styled from 'styled-components';
import { useState } from 'react';
import SignUp from '../signup/SignUp';
import SignUpModalLayout from '../signup/SignUpModalLayout';

export default function MainPageHeader() {
  const [modalOpen, setModalOpen] = useState(false);
  const onOpenModal = () => {
    setModalOpen(true);
  };
  const onCloseModal = () => {
    setModalOpen(false);
    window.location.reload();
  };
  return (
    <>
      <HeaderContainer>
        <HeaderLogo>등대지기</HeaderLogo>
        <HeaderMenuMyPage>마이페이지</HeaderMenuMyPage>
        <HeaderMenuChatting>채팅</HeaderMenuChatting>
        <HeaderMenuSignUp
          type="button"
          onClick={() => {
            setModalOpen(!modalOpen);
          }}
        >
          회원가입
          {modalOpen && (
            <SignUpModalLayout visible={onOpenModal} closeable={true} maskCloseable={true} onClose={onCloseModal}>
              <SignUp />
            </SignUpModalLayout>
          )}
        </HeaderMenuSignUp>
      </HeaderContainer>
    </>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  height: 113px;
  background-color: aqua;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HeaderLogo = styled.div`
  margin-left: 50px;
  font-size: 50px;
  cursor: default;
`;

const HeaderMenuMyPage = styled.span`
  margin-left: 20px;
  font-size: 17px;
  cursor: pointer;
`;

const HeaderMenuChatting = styled.span`
  margin-left: 20px;
  font-size: 17px;
  cursor: pointer;
`;

const HeaderMenuSignUp = styled.span`
  margin-left: 20px;
  font-size: 17px;
  cursor: pointer;
`;
