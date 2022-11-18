import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import userProfile2 from './sources/userProfile2.png';
import arrow from './sources/arrow.png';
import { useRecoilState } from 'recoil';
import { isLogin } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ReadProfile } from '../../api/apiGET';
import { DeleteUser } from '../../api/apiDELETE';
import MyPageModal from './MyPageModal';

export default function LoginMyPageArticle() {
  const navigate = useNavigate();
  const [AppLogin, setAppLogin] = useRecoilState(isLogin);
  const [userInfo, setUserInfo] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  const [modalVisibleNickname, setModalVisibleNickname] = useState(false);
  const [newNickname, setNewNickname] = useState({
    nickname: 'nickname',
  });

  const onLogoutHandler = () => {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('accountstate');
    setAppLogin(false);
  };

  const onSubmitNicknameHandler = () => {
    console.log('닉네임제출');
  };

  const onChangeNicknameHandler = (e) => {
    const { name, value } = e.target;
    setNewNickname({
      [name]: value,
    });
  };

  const getProfile = useQuery(['profile'], ReadProfile, {
    refetchOnWindowFocus: false,
    onSuccess: (config) => {
      setUserInfo(config.data);
    },
  });

  const { mutate: deleteUser } = useMutation(DeleteUser);

  return (
    <Container>
      <div className="head-article-container">
        <div className="head-article-inner-container">
          <div className="div1">{userInfo.profile ? <img src={`${userInfo.profle}`} alt="userProfile" /> : <img src={userProfile2} alt="userProfile" />}</div>
          <div className="div2">
            <div className="div3">
              <span className="span1">{userInfo.nickname}님</span>
              <span className="span2" onClick={() => setModalVisibleNickname(true)}>
                수정
              </span>
            </div>
            <span className="span3">{userInfo.email}</span>
          </div>
        </div>
        {sessionStorage.getItem('accountstate') === '1' ? (
          showMessage ? (
            <div className="intro-message">
              <div className="intro-message-show">
                {userInfo.introMessage}
                <div className="button-box">
                  <button
                    className="show-button"
                    onClick={() => {
                      setShowMessage(false);
                    }}
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="intro-message">
              <div className="intro-message-hide">
                <div className="intro-message-hide-container">{userInfo.introMessage || '소개메세지가 없습니다.'}</div>
                {userInfo.introMessage?.length > 82 ? (
                  <div className="button-box">
                    <button
                      className="hide-button"
                      onClick={() => {
                        setShowMessage(true);
                      }}
                    >
                      더보기
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          )
        ) : null}
      </div>
      <div className="body-article-container">
        <div className="info-1">상담</div>
        {sessionStorage.getItem('accountstate') === '1' ? (
          <>
            <div className="info-2" onClick={() => navigate('/myconsult')}>
              <div className="box">
                대기중인 상담
                {/* {대기중인 게시글의 length가 1 이상일때} */}
                {true ? <div className="newIcon">N</div> : null}
              </div>
              <img src={arrow} alt="arrow" />
            </div>
            <div className="info-2">
              답변한 상담
              <img src={arrow} alt="arrow" />
            </div>
          </>
        ) : (
          <>
            <div className="info-2" onClick={() => navigate('/myconsult')}>
              내상담
              <img src={arrow} alt="arrow" />
            </div>
            <div className="info-3">발품기록</div>
            <div className="info-2">
              내기록
              <img src={arrow} alt="arrow" />
            </div>
          </>
        )}

        <div className="info-3">계정</div>
        <div
          className="info-2"
          onClick={() => {
            onLogoutHandler();
            navigate('/');
          }}
        >
          로그아웃
          <img src={arrow} alt="arrow" />
        </div>
        <div
          className="info-2"
          onClick={() => {
            deleteUser();
            navigate('/');
          }}
        >
          회원탈퇴
          <img src={arrow} alt="arrow" />
        </div>
      </div>

      <>
        {modalVisibleNickname ? (
          <MyPageModal visible={modalVisibleNickname} closable={true} maskClosable={true} setModalVisible={setModalVisibleNickname} onSubmitHandler={onSubmitNicknameHandler}>
            <div className="update-title">닉네임 수정</div>
            <input type="text" name="nickname" onChange={onChangeNicknameHandler} value={newNickname.nickname} />
          </MyPageModal>
        ) : null}
      </>
    </Container>
  );
}

const Container = styled.div`
  .head-article-container {
    margin: 0;
    padding: 0;
    width: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    border-bottom: 4px solid var(--gray6);
    border-top: 1px solid var(--gray6);
    .head-article-inner-container {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    img {
      background-color: white;
      width: 60px;
      height: 60px;
    }
    div {
      background-color: white;
    }
    .div1 {
      margin: 24px 16px;
    }
    .div2 {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: flex-start;
      margin: 24px 0 32px 0;
      gap: 8px;
    }
    .div3 {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    span {
      background-color: white;
      font-family: var(--headline-font-family);
    }
    .span1 {
      font-size: var(--headline_Medium-font-size);
      font-weight: var(--headline_Medium-font-weight);
      line-height: var(--headline_Medium-line-height);
      letter-spacing: var(--headline_Medium-letter-spacing);
    }
    .span2 {
      margin-left: 4px;
      padding: 4px 12px;
      font-size: var(--button_Small-font-size);
      font-weight: var(--button_Large-font-weight);
      line-height: var(--button_Small-line-height);
      letter-spacing: var(--button_Small-letter-spacing);
      color: var(--primary2-400);
    }
    .span3 {
      font-size: var(--body_Medium-font-size);
      font-weight: var(--body_Medium-font-weight);
      line-height: var(--body_Medium-line-height);
      letter-spacing: var(--body_Medium-letter-spacing);
      color: var(--gray4);
      padding-left: 0px;
    }
  }
  .body-article-container {
    display: flex;
    flex-direction: column;
    background-color: white;
    .info-1,
    .info-3 {
      color: var(--gray4);
      background-color: white;
      margin-left: 16px;
      margin-top: 24px;
      margin-bottom: 8px;
      font-family: var(--headline-font-family);
      font-size: var(--body_Medium-font-size);
      font-weight: var(--body_Medium-font-weight);
      line-height: var(--body_Medium-line-height);
      letter-spacing: var(--body_Medium-letter-spacing);
    }
    .info-2 {
      color: var(--gray2);
      background-color: white;
      padding: 12px 0 12px 0;
      width: 328px;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      font-family: var(--headline-font-family);
      font-size: var(--button_Medium-font-size);
      font-weight: var(--button_Medium-font-weight);
      line-height: var(--button_Medium-line-height);
      letter-spacing: var(--button_Medium-letter-spacing);
      cursor: pointer;
      img {
        background-color: white;
        width: 7.59px;
        height: 13.06px;
      }
      .box {
        background-color: white;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        div {
          background-color: var(--primary1-400);
          color: white;
          border-radius: 21px;
          width: 20px;
          height: 20px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          margin-left: 4px;
        }
      }
    }
    .info-3 {
      border-top: 1px solid var(--gray6);
      margin-top: 16px;
      padding-top: 16px;
    }
  }
  .intro-message {
    width: 100%;
  }
  .intro-message-hide {
    margin: 0 16px 8px 16px;
    display: flex;
    flex-direction: column;
    font-family: var(--body-font-family);
    font-size: var(--body_Medium-font-size);
    font-weight: var(--body_Medium-font-weight);
    line-height: var(--body_Medium-line-height);
    letter-spacing: var(--body_Medium-letter-spacing);
    button {
      border: none;
      background-color: white;
      float: right;
      color: var(--gray5);
      font-family: var(--body-font-family);
      font-size: var(--body_Small-font-size);
      font-weight: var(--body_Small-font-weight);
      line-height: var(--body_Small-line-height);
      letter-spacing: var(--body_Small-letter-spacing);
    }
  }
  .intro-message-hide-container {
    height: 60px;
    white-space: nomal;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .intro-message-show {
    margin: 0 16px 8px 16px;
    height: 100%;
    display: flex;
    flex-direction: column;
    font-family: var(--body-font-family);
    font-size: var(--body_Medium-font-size);
    font-weight: var(--body_Medium-font-weight);
    line-height: var(--body_Medium-line-height);
    letter-spacing: var(--body_Medium-letter-spacing);
    button {
      border: none;
      background-color: white;
      float: right;
      color: var(--gray5);
      font-family: var(--body-font-family);
      font-size: var(--body_Small-font-size);
      font-weight: var(--body_Small-font-weight);
      line-height: var(--body_Small-line-height);
      letter-spacing: var(--body_Small-letter-spacing);
    }
  }
`;
