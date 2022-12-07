import React, { useState } from 'react';
import styled from 'styled-components';
import '../../global/global.css';
import path_Right from '../../global/sources/Expand_right_gray.svg';
import login_Deco from './sources/main_article_login_deco.png';
import map from './sources/main_article_map.png';
import lighthouse from './sources/main_article_lighthouse.png';
import QueMark from '../../global/sources/Question.svg';
import path_Light_Right from '../../global/sources/Expand_right_light.svg';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ReadAnsweredList, ReadPremisesList, ReadProfile, ReadRequestList, ReadWaitList } from '../../api/apiGET';
import { NextMem, NextTor, GoLogIn, isLogin } from '../../store/store';
import { useQuery } from '@tanstack/react-query';
import Modal from '../../global/components/Modal';

function MainPageArticle() {
  const navigate = useNavigate();
  //일반회원 다음으로 넘어가기 위한 recoilState
  const [nextmem, setNextMem] = useRecoilState(NextMem);
  //공인중개사 회원 다음으로 넘어가기 위한 recoilState
  const [nexttor, setNextTor] = useRecoilState(NextTor);
  //이미 가입된 회원 로그인 창 열때 필요한 recoilstate
  const [goinglogin, setGoingLogin] = useRecoilState(GoLogIn);

  const [info, setInfo] = useState(false);
  const AppLogin = useRecoilValue(isLogin);
  const [consultNum, setConsultNum] = useState(2);
  const [modalVisible, setModalVisible] = useState(false);

  const onStartLogin = () => {
    navigate('/signup');
    setNextMem(0);
    setNextTor(0);
    setGoingLogin(0);
  };
  const onClickRequestConsult = () => {
    if (consultNum <= 0) {
      setModalVisible(true);
    } else {
      navigate('/request1');
    }
  };
  console.log(AppLogin);
  const { data: readProfile } = useQuery(['profile'], ReadProfile, {
    refetchOnWindowFocus: false,
    enabled: !!(sessionStorage.getItem('accountstate') === '0' || sessionStorage.getItem('accountstate') === '1'),
  });
  const { data: requestlist } = useQuery(['requestlist'], ReadRequestList, {
    refetchOnWindowFocus: false,
    enabled: !!(sessionStorage.getItem('accountstate') === '0'),
    onSuccess: (config) => {
      const info = config.findIndex((item) => item.answerState === 'ANSWER');
      if (info !== -1) {
        setInfo(true);
      }
      const allNum = config.length;
      setConsultNum(2 - allNum);
    },
  });
  const { data: premisesData } = useQuery(['premiseslist'], ReadPremisesList, {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    enabled: !!(sessionStorage.getItem('accountstate') === '0'),
  });
  const { data: waitData } = useQuery(['waitlist'], ReadWaitList, {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    enabled: !!(sessionStorage.getItem('accountstate') === '1'),
  });
  const { data: answeredData } = useQuery(['answeredlist'], ReadAnsweredList, {
    enabled: !!(sessionStorage.getItem('accountstate') === '1'),
  });

  return (
    <ArticleContainer>
      {AppLogin ? (
        <TextGuide>
          안녕하세요
          <br />
          {readProfile?.nickname}님!
        </TextGuide>
      ) : (
        <TextGuide>
          로그인 하면
          <br />
          서비스를
          <br />
          이용할 수 있어요
        </TextGuide>
      )}
      {AppLogin ? (
        <div className="article_body_wrap">
          <div className="user_info" style={{ marginBottom: (sessionStorage.getItem('accountstate') === '0' && info) || (sessionStorage.getItem('accountstate') === '1' && waitData?.length) ? '80px' : '136px' }}>
            {sessionStorage.getItem('accountstate') === '0' ? (
              <>
                <div className="user_info_1" onClick={() => navigate('/myconsult')}>
                  상담 {requestlist?.length}건
                </div>
                <div className="user_info_2">발품기록 {premisesData?.length}건</div>
              </>
            ) : null}
            {sessionStorage.getItem('accountstate') === '1' ? (
              <>
                <div className="user_info_3" onClick={() => navigate('/answeredlist ')}>
                  답변한 상담 {answeredData?.length}건
                </div>
              </>
            ) : null}
          </div>
          <div className="article_body">
            {info && sessionStorage.getItem('accountstate') === '0' ? (
              <div className="article_body_notice_wrap" onClick={() => navigate('/myconsult')}>
                <div className="notice_title">알림</div>
                <div className="notice_content">
                  상담에 공인중개사님이 답글을 달았어요
                  <img src={path_Right} alt="path_Right" />
                </div>
              </div>
            ) : null}
            {waitData?.length >= 1 && sessionStorage.getItem('accountstate') === '1' ? (
              <div className="article_body_notice_wrap" onClick={() => navigate('/waitlist')}>
                <div className="notice_title">알림</div>
                <div className="notice_content">
                  대기중인 상담이 있습니다.
                  <img src={path_Right} alt="path_Right" />
                </div>
              </div>
            ) : null}
            {sessionStorage.getItem('accountstate') === '0' ? (
              <div className="article_body_banner_wrap">
                <div className="banner1" onClick={() => navigate('/newfootstep')}>
                  <div className="div_1">
                    <div>발품</div>
                    <div className="div_3">
                      <div>기록하기</div>
                      <img src={path_Right} alt="path_Right" />
                    </div>
                  </div>
                  <div>
                    <img className="deco_1" src={map} alt="map" />
                  </div>
                </div>
                <div className="banner2" onClick={onClickRequestConsult}>
                  <div className="div_1">
                    <div>상담</div>
                    <div className="div_3">
                      <div>신청하기</div>
                      <img src={path_Light_Right} alt="path_Right" />
                    </div>
                  </div>
                  <div>
                    <img className="deco_2" src={lighthouse} alt="map" />
                  </div>
                </div>
              </div>
            ) : null}
            {sessionStorage.getItem('accountstate') === '1' ? (
              <div className="article_body_banner_wrap">
                <div className="banner3" onClick={() => navigate('/waitlist')}>
                  <div className="div_1">
                    <div>대기중인 상담</div>
                    <div className="div_3">
                      <div>답변 달기</div>
                      <img src={path_Light_Right} alt="path_Right" />
                    </div>
                  </div>
                  <div>
                    <img className="deco_3" src={lighthouse} alt="map" />
                  </div>
                </div>
              </div>
            ) : null}
            {sessionStorage.getItem('accountstate') === '2' ? null : (
              <div className="guide_wrap">
                <div className="guide_content" onClick={() => navigate('/introduce')}>
                  <div>어떤서비스인가요?</div>
                  <img src={QueMark} alt="QueMark" />
                </div>
              </div>
            )}
          </div>
          <Modal visible={modalVisible} closable={true} maskClosable={true} setModalVisible={setModalVisible}>
            <div className="modal_div">상담 횟수 2회를 모두 사용하셨습니다.</div>
            <div className="modal_div">추가 상담을 원하시면 </div>
            <div className="modal_div">관리자에게 문의해주세요.</div>
          </Modal>
        </div>
      ) : (
        <ElementContainer>
          <ECPWrap>
            <LoginBtnBox>
              <LoginBtn onClick={onStartLogin}>로그인 하러가기</LoginBtn>
              <ImgPathRight src={path_Right} />
            </LoginBtnBox>
            <ServcieGuideBox>
              <ServiceGuideP onClick={() => navigate('/introduce')}>어떤 서비스인가요?</ServiceGuideP>
              <ServiceQueMark src={QueMark} />
            </ServcieGuideBox>
          </ECPWrap>
          <ECImgWrap>
            <ImgLoginDeco src={login_Deco} />
          </ECImgWrap>
        </ElementContainer>
      )}
    </ArticleContainer>
  );
}
export default React.memo(MainPageArticle);

const ArticleContainer = styled.div`
  width: 360px;
  height: 448px;
  background-color: var(--primary2-100);
  display: flex;
  flex-direction: column;
  .modal_div {
    font-family: var(--headline-font-family);
    font-size: var(--headline_Medium-font-size);
    font-weight: var(--headline_Medium-font-weight);
    line-height: var(--headline_Medium-line-height);
    letter-spacing: var(--headline_Medium-letter-spacing);
    margin-top: 20px;
  }
  .article_body_wrap {
    width: 328px;
    display: flex;
    flex-direction: column;
    margin: 16px auto 0 auto;
    .user_info {
      display: flex;
      flex-direction: row;
      font-family: var(--headline-font-family);
      font-size: var(--button_Medium-font-size);
      font-weight: var(--button_Medium-font-weight);
      line-height: var(--button_Medium-line-height);
      letter-spacing: var(--button_Medium-letter-spacing);
      color: var(--primary2-400);
      margin-bottom: 80px;
      .user_info_1 {
        padding-right: 14px;
        border-right: 1px solid var(--primary2-400);
        cursor: pointer;
      }
      .user_info_2 {
        padding-left: 14px;
      }
      .user_info_3 {
        cursor: pointer;
      }
    }
    .article_body {
      width: 328px;
      display: flex;
      flex-direction: column;
      margin: 16px auto 0 auto;
      .article_body_notice_wrap {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        padding: 8px 10px 8px 12px;
        background-color: white;
        border-radius: 4px;
        margin-bottom: 16px;
        cursor: pointer;
        .notice_title {
          width: 22px;
          margin-right: 12px;
          font-family: var(--headline-font-family);
          font-size: var(--button_Small-font-size);
          font-weight: var(--button_Small-font-weight);
          line-height: var(--button_Small-line-height);
          letter-spacing: var(--button_Small-letter-spacing);
          color: var(--primary2-400);
        }
        .notice_content {
          width: 272px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          font-family: var(--headline-font-family);
          font-size: var(--body_Medium-font-size);
          font-weight: var(--body_Medium-font-weight);
          line-height: var(--body_Medium-line-height);
          letter-spacing: var(--body_Medium-letter-spacing);
        }
      }
      .article_body_banner_wrap {
        width: 328px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .banner1,
        .banner2 {
          width: 148px;
          height: 92px;
          padding-left: 8px;
          padding-top: 8px;
          box-shadow: var(--Shadow2-box-shadow);
          background-color: var(--primary1-400);
          border-radius: 8px;
          font-family: var(--headline-font-family);
          font-size: var(--button_Large-font-size);
          font-weight: var(--button_Large-font-weight);
          line-height: var(--button_Large-line-height);
          letter-spacing: var(--button_Large-letter-spacing);
          cursor: pointer;
          .deco_1 {
            margin-top: -12px;
            margin-right: 8px;
            float: right;
            width: 50px;
            height: 50px;
          }
        }
        .banner2 {
          background-color: var(--primary2-300);
          color: white;
          .deco_2 {
            margin-top: -17px;
            margin-right: 5px;
            float: right;
            width: 65px;
            height: 65px;
          }
        }
        .div_3 {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .banner3 {
          width: 328px;
          height: 92px;
          padding-left: 8px;
          padding-top: 8px;
          box-shadow: var(--Shadow2-box-shadow);
          background-color: var(--primary2-300);
          color: white;
          border-radius: 8px;
          font-family: var(--headline-font-family);
          font-size: var(--button_Large-font-size);
          font-weight: var(--button_Large-font-weight);
          line-height: var(--button_Large-line-height);
          letter-spacing: var(--button_Large-letter-spacing);
          cursor: pointer;
          .deco_3 {
            margin-top: -17px;
            margin-right: 18px;
            float: right;
            width: 65px;
            height: 65px;
          }
        }
      }
      .guide_wrap {
        width: 328px;
        height: 36px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        font-family: var(--headline-font-family);
        font-size: var(--button_Small-font-size);
        font-weight: var(--button_Small-font-weight);
        line-height: var(--button_Small-line-height);
        letter-spacing: var(--button_Small-letter-spacing);
        margin-bottom: 12px;
        margin-top: 6px;
        .guide_content {
          height: 36px;
          display: flex;
          flex-direction: row;
          align-items: center;
          color: var(--gray4);
          cursor: pointer;
          img {
            width: 20px;
            height: 20px;
            margin-left: 4px;
          }
        }
      }
    }
  }
`;

const TextGuide = styled.div`
  margin-top: 60px;
  margin-left: 16px;
  width: 200px;
  font-family: var(--headline-font-family);
  font-size: var(--headline_Large-font-size);
  font-weight: var(--headline_Large-font-weight);
  line-height: var(--headline_Large-line-height);
  letter-spacing: var(--headline_Large-letter-spacing);
  background: none;
  cursor: default;
`;

const LoginBtnBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 124px;
  height: 48px;
  margin-left: 16px;
  margin-top: 8px;
  background: none;
  cursor: pointer;
`;

const LoginBtn = styled.button`
  padding: 0;
  font-family: var(--button-font-family);
  font-size: var(--button_Medium-font-size);
  font-weight: var(--button_Medium-font-weight);
  line-height: var(--button_Medium-line-height);
  letter-spacing: var(--button_Medium-letter-spacing);
  color: var(--primary2-400);
  border: none;
  background: none;
  cursor: pointer;
`;

const ImgPathRight = styled.img`
  margin-top: 12px;
  width: 24px;
  height: 24px;
  background: none;
  cursor: pointer;
`;

const ImgLoginDeco = styled.img``;

const ServcieGuideBox = styled.div`
  margin-left: 16px;
  margin-top: 196px;
  width: 121px;
  height: 36px;
  background: none;
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;

const ServiceGuideP = styled.p`
  margin-top: 10px;
  font-family: var(--button-font-family);
  font-size: var(--body_Small-font-size);
  font-weight: var(--body_Small-font-weight);
  line-height: var(--body_Small-line-height);
  letter-spacing: var(--body_Small-letter-spacing);
  background: none;
`;

const ServiceQueMark = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 4px;
  margin-top: 8px;
  background: none;
`;

const ElementContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ECPWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const ECImgWrap = styled.div``;
