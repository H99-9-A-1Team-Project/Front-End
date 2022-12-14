import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function CompleteModal(props) {
  const { className, onClose, maskCloseable, closeable, visible } = props;

  const onMaskClicks = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper className={className} onClick={maskCloseable ? onMaskClicks : null} tabIndex="-1" visible={visible}>
        <ModalInner tabIndex="0" className="modal-inner" onClick={(e) => e.stopPropagation()}>
          {closeable && (
            <>
              <>{props.children}</>
            </>
          )}
        </ModalInner>
      </ModalWrapper>
    </>
  );
}

export default CompleteModal;

CompleteModal.propTypes = {
  visibles: PropTypes.bool,
};

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: auto;
  bottom: 0;
  left: auto;
  z-index: 1000;
  /* overflow:auto; */
  outline: 0;
  background-color: rgba(0, 0, 0, 0);
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: white;
  border-radius: 8px;
  width: 100%;
  max-width: 328px;
  max-height: 428px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translateY(-50%);
  margin: 0 auto;
  margin-top: 450px;
  padding: 40px 40px;
`;

