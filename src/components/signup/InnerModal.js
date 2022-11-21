import React from 'react';
import styled from 'styled-components';
import CompleteM from '../signup/sources/completemodal.png';
import ModalClose from '../signup/sources/x.png';
import { CloseModal } from '../../store/store';
import { useSetRecoilState } from 'recoil';

function InnerModal() {
  //모달 닫기 버튼용 recoilstate
  const [setModalOpen] = useSetRecoilState(CloseModal);
  const onCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <ModalContainer>
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
            <SmallText>완료 메일 주소: userID</SmallText>
          </TextContainer>
        </ContentContainer>
        <ModalButtonContainer>
          <ButtonStyle onClick={onCloseModal}>닫기</ButtonStyle>
        </ModalButtonContainer>
      </ModalContainer>
    </>
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
  background-color: white;
  border-radius: 8px;
  display: flex;
  justify-content: right;
  align-items: center;
`;
const CloseButton = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 16px;
  background-color: white;
`;

const ContentContainer = styled.div`
  width: 328px;
  height: 300px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const IconContainer = styled.div`
  width: 217px;
  height: 224px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconBox = styled.img`
  width: 168px;
  height: 140px;
  background-color: white;
`;

const TextContainer = styled.div`
  width: 217px;
  height: 112px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;
const BigText = styled.div`
  width: 162px;
  height: 24px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.15px;
  color: black;
  flex: none;
  order: 0;
  flex-grow: 0;
  background-color: white;
`;
const MediumText = styled.div`
  width: 217px;
  height: 24px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.15px;

  color: black;
  background-color: white;
  flex: none;
  order: 1;
  flex-grow: 0;
`;
const SmallText = styled.div`
  width: 135px;
  height: 20px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.25px;
  color: #c5c8cb;
  flex: none;
  order: 2;
  flex-grow: 0;
  background-color: white;
`;
const ModalButtonContainer = styled.div`
  width: 328px;
  height: 72px;
  background-color: white;
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
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3c6eef;
`;
