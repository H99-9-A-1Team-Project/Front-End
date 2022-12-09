import React from 'react';
import styled from 'styled-components';
import CompleteM from '../../global/sources/sign_in_modal_img.png';
import ModalClose from '../../global/sources/Close.svg';
import { CloseModal, LoginDatas } from '../../store/store';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

function InnerModal() {
  const navigate = useNavigate();
  //데이터 전송을 위한 state
  const loginData = useRecoilValue(LoginDatas);
  //모달 닫기 버튼용 recoilstate
  const setModalOpen = useSetRecoilState(CloseModal);
  const onCloseModal = () => {
    setModalOpen(false);
    navigate('/');
    window.location.reload();
  };
  return (
    <div>
      <ModalContainer>
        <>
          <ModalHeader>
            <CloseButton src={ModalClose} onClick={onCloseModal} />
          </ModalHeader>
          <ContentContainer>
            <IconContainer>
              <IconBox src={CompleteM} />
            </IconContainer>
            <TextContainer>
              <BigText>신청이 완료되었어요</BigText>
              <MediumText>인증 후 완료 메일을 보내드릴게요.</MediumText>
              <SmallText>완료메일주소:{loginData.email}</SmallText>
            </TextContainer>
          </ContentContainer>
          <ModalButtonContainer>
            <ButtonStyle onClick={onCloseModal}>닫기</ButtonStyle>
          </ModalButtonContainer>
        </>
      </ModalContainer>
    </div>
  );
}

export default InnerModal;

const ModalContainer = styled.div`
  width: 328px;
  height: 428px;
  border-radius: 8px;
`;

const ModalHeader = styled.div`
  width: 328px;
  height: 56px;
  background-color: var(--white);
  border-radius: 8px;
  display: flex;
  justify-content: right;
  align-items: center;
`;
const CloseButton = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 16px;
  background-color: var(--white);
`;

const ContentContainer = styled.div`
  width: 328px;
  height: 300px;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const IconContainer = styled.div`
  width: 217px;
  height: 224px;
  background-color: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconBox = styled.img`
  width: 168px;
  height: 140px;
  background-color: var(--white);
`;

const TextContainer = styled.div`
  width: 217px;
  height: 112px;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;
const BigText = styled.div`
  width: 163px;
  height: 24px;

  font-style: normal;
  font-family: var(--headline-font-family);
  font-size: var(--headline_Medium-font-size);
  font-weight: var(--headline_Medium-font-weight);
  line-height: var(--headline_Medium-line-height);
  letter-spacing: var(--headline_Medium-letter-spacing);
  display: flex;
  align-items: center;
  text-align: center;

  color: black;
  flex: none;
  order: 0;
  flex-grow: 0;
  background-color: var(--white);
`;
const MediumText = styled.div`
  width: 217px;
  height: 24px;

  font-style: normal;
  font-family: var(--body-font-family);
  font-size: var(--body_Large-font-size);
  font-weight: var(--body_Large-font-weight);
  line-height: var(--body_Large-line-height);
  letter-spacing: var(--body_Large-letter-spacing);
  display: flex;
  align-items: center;
  text-align: center;

  color: black;
  background-color: var(--white);
  flex: none;
  order: 1;
  flex-grow: 0;
`;
const SmallText = styled.div`
  width: 328px;
  height: 20px;

  font-style: normal;
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  color: var(--gray5);
  flex: none;
  order: 2;
  flex-grow: 0;
  background-color: var(--white);
`;
const ModalButtonContainer = styled.div`
  width: 328px;
  height: 72px;
  background-color: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

const ButtonStyle = styled.div`
  width: 288px;
  height: 40px;
  border: none;
  border-radius: 8px;
  color: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary2-400);
`;
