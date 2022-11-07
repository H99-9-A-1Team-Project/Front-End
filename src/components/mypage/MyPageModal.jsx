import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function MyPageModal({
  className,
  setModalVisible,
  maskClosable,
  closable,
  visible,
  children,
  onSubmitHandler,
}) {
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
            <div className="buttons">
              <button className="modal-close" onClick={() => setModalVisible(false)} type="button">
                취소
              </button>
              <button className="modal-subit" type="button" onClick={onSubmitHandler}>
                완료
              </button>
            </div>
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
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 480px;
  max-width: 480px;
  height: 300px;
  transform: translateY(-50%);
  margin: auto;
  margin-top: 400px;
  padding: 10px 20px;
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
