import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CompleteM from '../signup/sources/completemodal.png';
import ModalClose from '../signup/sources/x.png';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { ChangeSignUp, NextTor, LoginDatas } from '../../store/store';

function CompleteModal(props) {
  const { className, onClose, maskCloseable, closeable, visible } = props;
  const navigate = useNavigate();
  //회원가입창의 시작과 전환을 위한 recoilstate
  const [opensignup, setOpenSignUp] = useRecoilState(ChangeSignUp);
  //공인중개사 회원 이전과 다음으로 넘어가기 위한 recoilState
  const [nexttor, setNextTor] = useRecoilState(NextTor);
  //데이터 전송을 위한 state
  const [loginData, setLoginData] = useRecoilState(LoginDatas);

  const onMaskClicks = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };
  const onCloseModal = (e) => {
    if (onClose) {
      onClose(e);
      setOpenSignUp(false);
      setNextTor(0);
      navigate('/');
    }
  };

  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper className={className} onClick={maskCloseable ? onMaskClicks : null} tabIndex="-1" visible={visible}>
        <ModalInner tabIndex="0" className="modal-inner" onClick={(e) => e.stopPropagation()}>
          {closeable && (
            <>
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
                      <SmallText>완료 메일 주소:{loginData.email}</SmallText>
                    </TextContainer>
                  </ContentContainer>
                  <ModalButtonContainer>
                    <ButtonStyle onClick={onCloseModal}>닫기</ButtonStyle>
                  </ModalButtonContainer>
                </ModalContainer>
              </>
            </>
          )}
        </ModalInner>
      </ModalWrapper>
    </>
  );
}

export default CompleteModal;

CompleteModal.propTypes = {
  visibles: PropTypes.func,
};

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  /* box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5); */
  background-color: white;
  border-radius: 8px;
  width: 100%;
  max-width: 328px;
  max-height: 428px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 40px;
`;
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
  text-align: center;
  justify-content: center;
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
