import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MyPageModalAdmin from './MyPageModalAdmin';

export default function MyPageBodyAdmin() {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  console.log(modalVisible);
  return (
    <StMyPageBodyWrap>
      <div className="body-header">
        <div className="user-container">
          <div className="user-inner-container">
            <div className="user-name-box">
              <div>Username</div>
            </div>
            <div>email</div>
          </div>
        </div>
      </div>
      <div className="body-body">
        <div className="body-name">유저 관리</div>
        <div className="body-content-wrap">
          <>
            <div className="body-content-container" onClick={() => setModalVisible(true)}>
              <div>1</div>
              <div>김성욱</div>
              <div>2022-11-10 13:43</div>
              <div>승인여부</div>
            </div>
            {modalVisible ? (
              <MyPageModalAdmin
                visible={modalVisible}
                closable={true}
                maskClosable={true}
                setModalVisible={setModalVisible}
              ></MyPageModalAdmin>
            ) : null}
          </>
        </div>
      </div>
    </StMyPageBodyWrap>
  );
}

const StMyPageBodyWrap = styled.div`
  width: 600px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 50px auto;
  gap: 30px;
  border: 1px solid black;
  .body-header {
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-bottom: 1px solid gray;
  }
  .user-container {
    display: flex;
    flex-direction: row;
  }
  .user-inner-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
  }
  .user-name-box {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
  .body-body {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .body-name {
    font-weight: bold;
  }

  .body-content-wrap {
    display: flex;
    width: 100%;
    flex-direction: column;
  }
  .body-content-container {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
  }
`;
