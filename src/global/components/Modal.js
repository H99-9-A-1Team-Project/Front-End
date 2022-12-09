import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import x from '../sources/x.png';

export default function Modal({ className, setModalVisible, maskClosable, closable, visible, children, setImgSave, page }) {
  const onMaskClick = (e) => {
    if (window.location.pathname === 'mypage' && sessionStorage.getItem('accountstate') === '1' && e.target === e.currentTarget) {
      setModalVisible(false);
      setImgSave('');
      return;
    }
    if (e.target === e.currentTarget) {
      setModalVisible(false);
    }
  };
  const onLinkto = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLScBo334v9MmxoFzl_xJ74m51UTAuU_rVoAfheLlNXFZK_iCJA/viewform');
  };
  if (sessionStorage.getItem('accountstate') === '0' && page === 'profile') {
    return (
      <>
        <ModalOverlay visible={visible} />
        <ModalWrapper className={className} onClick={maskClosable ? onMaskClick : null} tabIndex={-1} visible={visible}>
          <ModalInner tabIndex={0} className="modal-inner">
            {closable && (
              <>
                <div className="modal-header">
                  <img
                    src={x}
                    alt="x"
                    onClick={() => {
                      setModalVisible(false);
                    }}
                  />
                </div>
              </>
            )}
            {children}
          </ModalInner>
        </ModalWrapper>
      </>
    );
  }
  if (sessionStorage.getItem('accountstate') === '1' && page === 'profile') {
    return (
      <>
        <ModalOverlay visible={visible} />
        <ModalWrapper className={className} onClick={maskClosable ? onMaskClick : null} tabIndex={-1} visible={visible}>
          <ModalInner2 tabIndex={0} className="modal-inner2">
            {closable && (
              <>
                <div className="modal-header">
                  <img
                    src={x}
                    alt="x"
                    onClick={() => {
                      setModalVisible(false);
                      setImgSave('');
                    }}
                  />
                </div>
              </>
            )}
            {children}
          </ModalInner2>
        </ModalWrapper>
      </>
    );
  }
  if (page === 'consultdetail') {
    return (
      <>
        <ModalOverlay visible={visible} />
        <ModalWrapper className={className} onClick={maskClosable ? onMaskClick : null} tabIndex={-1} visible={visible}>
          <ModalInner3 tabIndex={0}>
            {closable && (
              <>
                <div className="modal-header">
                  <img
                    src={x}
                    alt="x"
                    onClick={() => {
                      setModalVisible(false);
                    }}
                  />
                </div>
              </>
            )}
            {children}
          </ModalInner3>
        </ModalWrapper>
      </>
    );
  }
  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper className={className} onClick={maskClosable ? onMaskClick : null} tabIndex={-1} visible={visible}>
        <ModalInner tabIndex={0} className="modal-inner">
          {closable && (
            <>
              <div className="modal-header">
                <img
                  src={x}
                  alt="x"
                  onClick={() => {
                    setModalVisible(false);
                  }}
                />
              </div>
            </>
          )}
          {children}
          <div className="modal_footer">
            <div
              className="modal_footer_button"
              onClick={() => {
                setModalVisible(false);
                onLinkto();
              }}
            >
              설문 참여하기
            </div>
          </div>
        </ModalInner>
      </ModalWrapper>
    </>
  );
}

Modal.defaultProps = {
  visible: false,
  closable: true,
  maskClosable: true,
};

Modal.propTypes = {
  visible: PropTypes.bool,
};

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  overflow: auto;
  outline: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9;
`;

const ModalInner = styled.div`
  box-sizing: content-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: white;
  border-radius: 10px;
  width: 360px;
  height: 364px;
  transform: translateY(-50%);
  margin: auto;
  margin-top: 380px;
  z-index: 20;
  .modal-header {
    width: 100%;
    height: 56px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 10px;
    background-color: white;
    img {
      margin: 16px 16px 16px auto;
      background-color: white;
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .modal_footer {
    margin-top: auto;
    box-sizing: border-box;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    .modal_footer_button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 320px;
      height: 40px;
      border-radius: 8px;
      color: white;
      background-color: var(--primary2-400);
      font-family: var(--headline-font-family);
      font-size: var(--button_Medium-font-size);
      font-weight: var(--button_Medium-font-weight);
      line-height: var(--button_Medium-line-height);
      letter-spacing: var(--button_Medium-letter-spacing);
      cursor: pointer;
    }
  }
`;
const ModalInner2 = styled.div`
  box-sizing: content-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: white;
  border-radius: 10px;
  width: 328px;
  min-height: 432px;
  max-height: 100%;
  transform: translateY(-50%);
  margin: auto;
  margin-top: 450px;
  .modal-header {
    width: 100%;
    height: 56px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 10px;
    background-color: white;
    img {
      margin: 16px 16px 16px auto;
      background-color: white;
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const ModalInner3 = styled.div`
  box-sizing: content-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: white;
  border-radius: 10px 10px 0 0;
  width: 360px;
  height: auto;
  padding-bottom: 24px;
  margin: auto auto 0 auto;

  .modal-header {
    width: 100%;
    height: 56px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 10px;
    background-color: white;
    img {
      margin: 16px 16px 16px auto;
      background-color: white;
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
