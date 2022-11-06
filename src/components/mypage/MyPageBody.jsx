import { useState } from 'react';
import styled from 'styled-components';
import default_profile from '../../sources/images/default_profile.png';
import MyPageModal from './MyPageModal';

export default function MyPageBody() {
  const [showMessage, setShowMessage] = useState(false);
  const [showNicknameChange, setShowNicknameChange] = useState(false);
  const [showProfileImgChange, setShowProfileImgChange] = useState(false);
  const [showIntroMessageChange, setShowIntroMessageChange] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <StMyPageBodyWrap>
      <div className="body-header">
        <div className="user-container">
          <img src={default_profile} alt="profile-img" />
          {/* 이미지 true/false */}
          <div className="user-inner-container">
            <div className="user-name-box">
              <div>Username</div>
              <button onClick={() => setShowNicknameChange(true)}>편집버튼</button>
            </div>
            <div>email</div>
          </div>
        </div>
        <div className="intro-message-container">
          <div className="intro-message-container-header">
            <div>소개메세지</div>
            <button>편집버튼</button>
          </div>
          {showMessage ? (
            <div className="intro-message-show">
              프로필 텍스트입니다 프로필 텍스트입니다프로필 텍스트입니다프로필 텍스트입니다프로필 텍스트입니다프로필
              텍스트입니다 프로필 텍스트입니다 프로필 텍스트입니다프로필 텍스트입니다프로필 텍스트입니다프로필
              텍스트입니다프로필 텍스트입니다 프로필 텍스트입니다 프로필 텍스트입니다프로필 텍스트입니다프로필
              텍스트입니다프로필 텍스트입니다프로필 텍스트입니다 프로필 텍스트입니다 프로필 텍스트입니다프로필
              텍스트입니다프로필 텍스트입니다프로필 텍스트입니다프로필 텍스트입니다 프로필 텍스트입니다 프로필
              텍스트입니다프로필 텍스트입니다프로필 텍스트입니다프로필 텍스트입니다프로필 텍스트입니다
              <div className="button-box">
                <button
                  onClick={() => {
                    setShowMessage(false);
                  }}
                >
                  닫기
                </button>
              </div>
            </div>
          ) : (
            <div className="intro-message-hide">
              <div className="intro-message-hide-container">
                프로필 텍스트입니다 프로필 텍스트입니다프로필 텍스트입니다프로필 텍스트입니다프로필 텍스트입니다프로필
                텍스트입니다 프로필 텍스트입니다 프로필 텍스트입니다프로필 텍스트입니다프로필 텍스트입니다프로필
                텍스트입니다프로필 텍스트입니다 프로필 텍스트입니다 프로필 텍스트입니다프로필 텍스트입니다프로필
                텍스트입니다프로필 텍스트입니다프로필 텍스트입니다 프로필 텍스트입니다 프로필 텍스트입니다프로필
                텍스트입니다프로필 텍스트입니다프로필 텍스트입니다프로필 텍스트입니다 프로필 텍스트입니다 프로필
                텍스트입니다프로필 텍스트입니다프로필 텍스트입니다프로필 텍스트입니다프로필 텍스트입니다
              </div>
              <div className="button-box">
                <button
                  onClick={() => {
                    setShowMessage(true);
                  }}
                >
                  더보기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="body-body">
        <div className="body-name">상담</div>
        <div className="body-content">
          진행중인 상담
          {true ? <div className="body-content-num">+23</div> : null}
          {/* 진행중인상담 true/false */}
        </div>
        <div className="body-name">계정</div>
        <div className="body-content">로그아웃</div>
        <div className="body-content">회원탈퇴</div>
      </div>

      {showNicknameChange ? (
        <div className="update-profile">
          <div className="update-buttons">
            <button className="update-button-back" onClick={() => setShowNicknameChange(false)}>
              취소
            </button>
            <button className="update-buttons-complete">수정완료</button>
          </div>
          <div className="update-nickname-header">닉네임</div>
          <input className="update-nickname-input" type="text" name="nickname" />
        </div>
      ) : null}

      <>
        <button onClick={openModal}>Open Modal</button>
        {modalVisible && (
          <MyPageModal visible={modalVisible} closable={true} maskClosable={true} onClose={closeModal}>
            Hello
          </MyPageModal>
        )}
      </>
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
    img {
      border-radius: 100%;
      width: 80px;
      height: 80px;
    }
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
  .body-content {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 90%;
    border: 1px solid gray;
    margin: auto;
  }
  .body-content-num {
    border: 1px solid gray;
    border-radius: 10px;
  }
  .intro-message-container {
    display: flex;
    flex-direction: column;
  }
  .intro-message-container-header {
    display: flex;
    flex-direction: row;
  }
  .intro-message-hide {
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: column;
    button {
      float: right;
    }
  }
  .intro-message-hide-container {
    width: 100%;
    height: 48px;
    white-space: nomal;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .intro-message-show {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    button {
      margin-top: -20px;
      float: right;
    }
  }
  .update-profile {
    width: 300px;
    height: 300px;
    margin: auto;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 1;
    left: 960px;
    top: 470px;
    background-color: white;
  }
`;
