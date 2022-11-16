import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import userProfile2 from './sources/userProfile2.png';
import arrow from './sources/arrow.png';
import { useRecoilState } from 'recoil';
import { isLogin } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { ReadProfile } from '../../api/apiGET';
import { DeleteUser } from '../../api/apiDELETE';

export default function LoginMyPageArticle() {
  const navigate = useNavigate();
  const [AppLogin, setAppLogin] = useRecoilState(isLogin);
  const [userInfo, setUserInfo] = useState({});

  const onLogoutHandler = () => {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('accountstate');
    setAppLogin(false);
  };

  const { mutate: getProfile } = useMutation(ReadProfile, {
    onSuccess: (config) => {
      setUserInfo(config.data);
    },
  });

  const { mutate: deleteUser } = useMutation(DeleteUser);

  useEffect(() => {
    if (AppLogin !== false) {
      getProfile();
    }
  }, []);

  return (
    <Container>
      <div className="head-article-container">
        <div className="div1">
          <img src={userProfile2} alt="userProfile" />
        </div>
        <div className="div2">
          <div className="div3">
            <span className="span1">{userInfo.nickname}님</span>
            <span className="span2">수정</span>
          </div>
          <span className="span3">{userInfo.email}</span>
        </div>
      </div>
      <div className="body-article-container">
        <div className="info-1">상담</div>
        <div className="info-2" onClick={() => navigate('/myconsult')}>
          내상담
          <img src={arrow} alt="arrow" />
        </div>
        <div className="info-3">발품기록</div>
        <div className="info-2">
          내기록
          <img src={arrow} alt="arrow" />
        </div>
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
    flex-direction: row;
    align-items: center;
    border-bottom: 4px solid var(--gray6);
    border-top: 1px solid var(--gray6);
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
    }
    .info-3 {
      border-top: 1px solid var(--gray6);
      margin-top: 16px;
      padding-top: 16px;
    }
  }
`;
