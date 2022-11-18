import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import x from './sources/x.png';

export default function MyPageModal({ className, setModalVisible, maskClosable, closable, visible, children, onSubmitHandler }) {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      setModalVisible(false);
    }
  };

  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper className={className} onClick={maskClosable ? onMaskClick : null} tabIndex={-1} visible={visible}>
        <ModalInner tabIndex={0} className="modal-inner">
          {closable && (
            <>
              <div className="modal-header">
                <img src={x} alt="x" onClick={() => setModalVisible(false)} />
              </div>
            </>
          )}
          {children}
        </ModalInner>
      </ModalWrapper>
    </>
  );
}

MyPageModal.defaultProps = {
  visible: false,
  closable: true,
  maskClosable: true,
};

MyPageModal.propTypes = {
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
  z-index: 1000;
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
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: white;
  border-radius: 10px;
  width: 328px;
  height: 432px;
  max-height: 100%;
  transform: translateY(-50%);
  margin: auto;
  margin-top: 350px;
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
    }
  }
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
