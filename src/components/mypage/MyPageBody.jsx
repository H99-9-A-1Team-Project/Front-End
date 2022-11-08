import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import default_profile from '../../sources/images/default_profile.png';
import MyPageModal from './MyPageModal';

export default function MyPageBody() {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [modalVisibleNickname, setModalVisibleNickname] = useState(false);
  const [modalVisibleProfileImg, setModalVisibleProfileImg] = useState(false);
  const [modalVisibleIntroMessage, setModalVisibleIntroMessage] = useState(false);
  const [newNickname, setNewNickname] = useState({
    nickname: 'nickname',
  });
  const [newIntroMessage, setNewIntroMessage] = useState({
    intromessage: 'intromessage',
  });
  // const [newProfileImg, setNewProfileImg] = useState({
  //   profile:"수정 필요"
  // })
  // const [newNickname, setNewNickname] = useState({
  //   nickname:"수정 필요"
  // })

  const onChangeNicknameHandler = (e) => {
    const { name, value } = e.target;
    setNewNickname({
      [name]: value,
    });
  };
  console.log(newNickname);
  const onChangeIntroMessageHandler = (e) => {
    const { name, value } = e.target;
    setNewIntroMessage({
      [name]: value,
    });
  };
  console.log(newIntroMessage);

  const onSubmitNicknameHandler = () => {
    console.log('닉네임제출');
  };
  const onSubmitIntroMessageHandler = () => {
    console.log('인트로메세지제출');
  };

  return (
    <StMyPageBodyWrap>
      <div className="body-header">
        {false ? (
          // 유저에따라서 true/false
          <>
            <div className="user-container">
              <img src={default_profile} alt="profile-img" />
              {/* 이미지 true/false */}
              <div className="user-inner-container">
                <div className="user-name-box">
                  <div>Username</div>
                  <button onClick={() => setModalVisibleNickname(true)}>편집버튼</button>
                </div>
                <div>email</div>
              </div>
            </div>
            <div className="intro-message-container">
              <div className="intro-message-container-header">
                <div>소개메세지</div>
                <button onClick={() => setModalVisibleIntroMessage(true)}>편집버튼</button>
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
                    프로필 텍스트입니다 프로필 텍스트입니다프로필 텍스트입니다프로필 텍스트입니다프로필
                    텍스트입니다프로필 텍스트입니다 프로필 텍스트입니다 프로필 텍스트입니다프로필 텍스트입니다프로필
                    텍스트입니다프로필 텍스트입니다프로필 텍스트입니다 프로필 텍스트입니다 프로필 텍스트입니다프로필
                    텍스트입니다프로필 텍스트입니다프로필 텍스트입니다프로필 텍스트입니다 프로필 텍스트입니다 프로필
                    텍스트입니다프로필 텍스트입니다프로필 텍스트입니다프로필 텍스트입니다프로필 텍스트입니다 프로필
                    텍스트입니다 프로필 텍스트입니다프로필 텍스트입니다프로필 텍스트입니다프로필 텍스트입니다프로필
                    텍스트입니다
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
          </>
        ) : (
          <div className="user-container">
            <div className="user-inner-container">
              <div className="user-name-box">
                <div>Username</div>
                <button onClick={() => setModalVisibleNickname(true)}>편집버튼</button>
              </div>
              <div>email</div>
            </div>
          </div>
        )}
      </div>
      <div className="body-body">
        <div className="body-name">상담</div>
        {false ? (
          <div className="body-content">
            대기중인 상담
            {true ? <div className="body-content-num">+23</div> : null}
            {/* 진행중인상담 true/false */}
          </div>
        ) : null}
        {/* 유저에따라서 true/false */}
        <div className="body-content" onClick={() => navigate('/consultinglist')}>
          진행한 상담
          {true ? <div className="body-content-num">N</div> : null}
          {/* 진행중인상담 true/false */}
        </div>
        <div className="body-name">발품 기록</div>
        <div className="body-content">내 기록</div>
        <div className="body-name">계정</div>
        <div className="body-content">로그아웃</div>
        <div className="body-content">회원탈퇴</div>
      </div>

      <>
        {modalVisibleNickname ? (
          <MyPageModal
            visible={modalVisibleNickname}
            closable={true}
            maskClosable={true}
            setModalVisible={setModalVisibleNickname}
            onSubmitHandler={onSubmitNicknameHandler}
          >
            <div className="update-title">닉네임 수정</div>
            <input type="text" name="nickname" onChange={onChangeNicknameHandler} value={newNickname.nickname} />
          </MyPageModal>
        ) : null}
      </>

      <>
        {modalVisibleIntroMessage ? (
          <MyPageModal
            visible={modalVisibleIntroMessage}
            closable={true}
            maskClosable={true}
            setModalVisible={setModalVisibleIntroMessage}
            onSubmitHandler={onSubmitIntroMessageHandler}
          >
            <div className="update-title">텍스트수정</div>
            <textarea
              type="text"
              name="intromessage"
              onChange={onChangeIntroMessageHandler}
              value={newIntroMessage.intromessage}
            />
          </MyPageModal>
        ) : null}
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
    left: 45%;
    top: 20%;
    background-color: white;
  }
`;
