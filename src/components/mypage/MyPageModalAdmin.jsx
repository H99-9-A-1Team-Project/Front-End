import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function MyPageModalAdmin({ className, setModalVisible, maskClosable, closable, visible }) {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      console.log('eee');
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
              <div className="buttons">
                <button className="modal-close" type="button" onClick={() => setModalVisible(false)}>
                  뒤로
                </button>
              </div>
              <img src="https://yimgf-thinkzon.yesform.com/docimgs/public/1/34/33113/33112952.jpg" alt="img"></img>
              <div className="admin-content">이름</div>
              <div className="admin-content">이메일</div>
              <div className="admin-content">신청일</div>
              <div className="select-buttons">
                <button>거절</button>
                <button>승인</button>
              </div>
            </>
          )}
        </ModalInner>
      </ModalWrapper>
    </>
  );
}

MyPageModalAdmin.defaultProps = {
  visible: false,
  closable: true,
  maskClosable: true,
};

MyPageModalAdmin.propTypes = {
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
  align-items: center;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 480px;
  max-width: 480px;
  height: 600px;
  transform: translateY(-50%);
  margin: auto;
  margin-top: 400px;
  padding: 10px 20px;
  gap: 30px;
  .buttons {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  img {
    width: 80%;
    height: 300px;
  }
  .admin-content {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .select-buttons {
    display: flex;
    flex-direction: row;
    gap: 40px;
  }
`;
