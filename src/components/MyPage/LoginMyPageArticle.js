import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import userProfile1 from './sources/userProfile1.png';
import userProfile2 from './sources/userProfile2.png';
import userProfile3 from './sources/userProfile3.png';
import userProfile4 from './sources/userProfile4.png';
import userProfile5 from './sources/userProfile5.png';
import userProfile6 from './sources/userProfile6.png';
import arrow from './sources/arrow.png';
import User_cicrle from './sources/User_cicrle.png';
import userDefault from './sources/userDefault.png';
import { useResetRecoilState } from 'recoil';
import { ChangeSignUp, GoLogIn, isLogin, NextMem, NextTor } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ReadProfile, ReadWaitList } from '../../api/apiGET';
import { DeleteUser } from '../../api/apiDELETE';
import MyPageModal from './MyPageModal';
import { UpdateRealtorProfile, UpdateUserProfile } from '../../api/apiUPDATE';
import imageCompression from 'browser-image-compression';

export default function LoginMyPageArticle() {
  const queryClient = useQueryClient();
  const textRef = useRef(null);
  const navigate = useNavigate();
  const appLogout = useResetRecoilState(isLogin);
  const changeSignUp = useResetRecoilState(ChangeSignUp);
  const nextMem = useResetRecoilState(NextMem);
  const nextTor = useResetRecoilState(NextTor);
  const goLogIn = useResetRecoilState(GoLogIn);
  const [userInfo, setUserInfo] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [imgSave, setImgSave] = useState('');
  const [userProfile, setUserProfile] = useState({});
  const [newProfile, setNewProfile] = useState({
    nickname: '',
    introMessage: '',
  });

  const onLogoutHandler = () => {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('accountstate');
    sessionStorage.removeItem('nickname');
    changeSignUp();
    nextMem();
    nextTor();
    goLogIn();
    appLogout();
  };
  const onSubmitUpdateUserProfileHandler = (e) => {
    e.preventDefault();
    updateUserProfile({ nickname: newProfile.nickname, profileImg: userProfile.state });
  };
  const onSubmitUpdateRealtorProfileHandler = async (e) => {
    e.preventDefault();
    const postimage = document.getElementById('img_file');
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 360,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(postimage.files[0], options);
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        const base64data = reader.result;
        onHandlingDataForm(base64data);
      };
    } catch (error) {
      console.log(error);
    }
    const onHandlingDataForm = (dataURI) => {
      const byteString = atob(dataURI.split(',')[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ia], {
        type: 'image/jpeg',
      });

      const file = new File([blob], 'image.jpg');
      let formData = new FormData();
      formData.append('content', new Blob([JSON.stringify(newProfile)], { type: 'application/json' }));
      formData.append('profile', file);
      updateRealtorProfile(formData);
    };
  };
  const onChangeProfileHandler = (e) => {
    const { name, value } = e.target;
    setNewProfile({
      ...newProfile,
      [name]: value,
    });
  };
  const onResizeHandler = useCallback(() => {
    textRef.current.style.height = 'auto';
    textRef.current.style.height = textRef.current.scrollHeight - 38 + 'px';
  }, []);
  useEffect(() => {
    if (textRef.current !== null) {
      textRef.current.focus();
    }
  }, [modalVisible]);
  const onChangeHandler = (e) => {
    onChangeProfileHandler(e);
    onResizeHandler(e);
  };
  const onSaveFileImage = (e) => {
    setImgSave(URL.createObjectURL(e.target.files[0]));
  };
  const getProfile = useQuery(['profile'], ReadProfile, {
    refetchOnWindowFocus: false,
    onSuccess: (config) => {
      setUserInfo(config.data);
      if (config.data.profileImg === 1 || config.data.profileImg === 0) {
        setUserProfile({ state: 1, userProfile: userProfile1 });
      }
      if (config.data.profileImg === 2) {
        setUserProfile({ state: 2, userProfile: userProfile2 });
      }
      if (config.data.profileImg === 3) {
        setUserProfile({ state: 3, userProfile: userProfile3 });
      }
      if (config.data.profileImg === 4) {
        setUserProfile({ state: 4, userProfile: userProfile4 });
      }
      if (config.data.profileImg === 5) {
        setUserProfile({ state: 5, userProfile: userProfile5 });
      }
      if (config.data.profileImg === 6) {
        setUserProfile({ state: 6, userProfile: userProfile6 });
      }
      if (config.data.introMessage === null) {
        config.data.introMessage = '소개 메세지가 없습니다.';
      }
      setNewProfile({
        nickname: config.data.nickname,
        introMessage: config.data.introMessage,
      });
    },
  });
  const { data } = useQuery(['waitlist'], ReadWaitList, {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    enabled: sessionStorage.getItem('accountstate') !== '0',
  });
  const { mutate: deleteUser } = useMutation(DeleteUser, {
    onSuccess: () => {
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('refresh_token');
      sessionStorage.removeItem('accountstate');
      sessionStorage.removeItem('nickname');
      changeSignUp();
      nextMem();
      nextTor();
      goLogIn();
      appLogout();
    },
  });
  const { mutate: updateRealtorProfile } = useMutation((arg) => UpdateRealtorProfile(arg), {
    onSuccess: () => {
      queryClient.invalidateQueries(['profile']);
      setModalVisible(false);
    },
  });
  const { mutate: updateUserProfile } = useMutation((arg) => UpdateUserProfile(arg), {
    onSuccess: () => {
      queryClient.invalidateQueries(['profile']);
      setModalVisible(false);
    },
  });

  return (
    <Container>
      <div className="head-article-container">
        <div className="head-article-inner-container">
          {sessionStorage.getItem('accountstate') === '1' ? (
            <div className="div1">{userInfo.profile ? <img src={`${userInfo.profile}`} alt="userProfile" /> : <img src={userDefault} alt="userDefault" />}</div>
          ) : (
            <div className="div1">
              <img src={userProfile.userProfile} alt="userProfile2" />
            </div>
          )}

          <div className="div2">
            <div className="div3">
              <span className="span1">{userInfo.nickname}님</span>
              <span className="span2" onClick={() => setModalVisible(true)}>
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
            <div className="info-2" onClick={() => navigate('/waitlist')}>
              <div className="box">
                대기중인 상담
                {data?.length > 0 ? <div className="newIcon">N</div> : null}
              </div>
              <img src={arrow} alt="arrow" />
            </div>
            <div className="info-2" onClick={() => navigate('/answeredlist')}>
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
        {modalVisible ? (
          <MyPageModal visible={modalVisible} closable={true} maskClosable={true} setModalVisible={setModalVisible} setImgSave={setImgSave}>
            {sessionStorage.getItem('accountstate') === '1' ? (
              <form className="profileform" onSubmit={onSubmitUpdateRealtorProfileHandler}>
                <label className="img-input-label" htmlFor="img_file">
                  <img className="prev-img" alt="" src={userInfo.profile ? (imgSave === '' ? `${userInfo.profile}` : imgSave) : imgSave === '' ? User_cicrle : imgSave} />
                </label>
                <input className="img-input" type="file" id="img_file" accept="image/*" onChange={onSaveFileImage} />
                <input className="nickname-input" type="text" maxLength={30} onChange={onChangeProfileHandler} name="nickname" value={newProfile.nickname} />
                <div className="intromessage-container">
                  <div className="intromessage-title">소개 메세지</div>
                  <textarea className="intromessage2" id="textarea" maxLength={500} ref={textRef} name="introMessage" value={newProfile.introMessage} onChange={onChangeHandler} onFocus={onResizeHandler}></textarea>
                </div>
                <div className="button-container">
                  <button>수정 완료</button>
                </div>
              </form>
            ) : (
              <div className="profile_edit_wrap">
                <img className="represent_img" src={userProfile.userProfile} alt="profile_img" />
                <div className="select_imgs">
                  <img className="select_img" src={userProfile1} alt="profile_img" onClick={() => setUserProfile({ state: 1, userProfile: userProfile1 })} />
                  <img className="select_img" src={userProfile2} alt="profile_img" onClick={() => setUserProfile({ state: 2, userProfile: userProfile2 })} />
                  <img className="select_img" src={userProfile3} alt="profile_img" onClick={() => setUserProfile({ state: 3, userProfile: userProfile3 })} />
                  <img className="select_img" src={userProfile4} alt="profile_img" onClick={() => setUserProfile({ state: 4, userProfile: userProfile4 })} />
                  <img className="select_img" src={userProfile5} alt="profile_img" onClick={() => setUserProfile({ state: 5, userProfile: userProfile5 })} />
                  <img className="select_img" src={userProfile6} alt="profile_img" onClick={() => setUserProfile({ state: 6, userProfile: userProfile6 })} />
                </div>
                <form className="profileform2" onSubmit={onSubmitUpdateUserProfileHandler}>
                  <input className="nickname-input2" type="text" maxLength={30} onChange={onChangeProfileHandler} name="nickname" value={newProfile.nickname} />
                  <div className="button-container">
                    <button>수정 완료</button>
                  </div>
                </form>
              </div>
            )}
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
      border-radius: 50%;
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
      cursor: pointer;
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
  .intromessage {
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
      cursor: pointer;
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
      cursor: pointer;
    }
  }
  .profileform {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
  }
  .profile_edit_wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .represent_img {
      width: 80px;
      height: 80px;
    }
    .select_imgs {
      display: flex;
      flex-direction: row;
      gap: 8px;
      margin-top: 16px;
      margin-bottom: 32px;
    }
    .select_img {
      width: 40px;
      height: 40px;
    }
  }
  .profileform2 {
    height: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    .nickname-input2 {
      width: 264px;
      height: 44px;
      border: 1px solid var(--gray6);
      border-radius: 8px;
      background-color: white;
      padding-left: 12px;
      padding-right: 12px;
      margin-bottom: 40px;
      ::placeholder {
        font-family: var(--headline-font-family);
        font-size: var(--body_Medium-font-size);
        font-weight: var(--body_Medium-font-weight);
        line-height: var(--body_Medium-line-height);
        letter-spacing: var(--body_Medium-letter-spacing);
        color: var(--gray1);
      }
    }
  }
  .img-input-label {
    background-color: white;
    cursor: pointer;
    img {
      width: 80px;
      height: 80px;
      background-color: white;
      border-radius: 50%;
    }
  }
  .img-input {
    display: none;
  }
  .nickname-input {
    width: 220px;
    height: 44px;
    border: 1px solid var(--gray6);
    border-radius: 8px;
    background-color: white;
    padding-left: 12px;
    padding-right: 12px;
    ::placeholder {
      font-family: var(--headline-font-family);
      font-size: var(--body_Medium-font-size);
      font-weight: var(--body_Medium-font-weight);
      line-height: var(--body_Medium-line-height);
      letter-spacing: var(--body_Medium-letter-spacing);
      color: var(--gray1);
    }
  }
  .intromessage-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
    margin-top: 16px;
  }
  .intromessage-title {
    float: left;
    font-family: var(--headline-font-family);
    font-size: var(--body_Medium-font-size);
    font-weight: var(--body_Medium-font-weight);
    line-height: var(--body_Medium-line-height);
    letter-spacing: var(--body_Medium-letter-spacing);
    color: var(--gray4);
    background-color: white;
  }
  .intromessage2 {
    padding: 16px 12px;
    border: 1px solid var(--gray6);
    border-radius: 8px;
    background-color: white;
    resize: none;
    overflow-y: hidden;
    outline: none;
    margin-bottom: 24px;
    font-family: var(--headline-font-family);
    font-size: var(--body_Medium-font-size);
    font-weight: var(--body_Medium-font-weight);
    line-height: var(--body_Medium-line-height);
    letter-spacing: var(--body_Medium-letter-spacing);
    color: var(--gray1);
  }
  .button-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
    button {
      border-radius: 8px;
      background-color: var(--primary2-400);
      box-shadow: var(--Shadow2-box-shadow);
      border: none;
      color: white;
      width: 288px;
      height: 40px;
      font-family: var(--headline-font-family);
      font-size: var(--button_Medium-font-size);
      font-weight: var(--button_Medium-font-weight);
      line-height: var(--button_Medium-line-height);
      letter-spacing: var(--button_Medium-letter-spacing);
    }
  }
`;
