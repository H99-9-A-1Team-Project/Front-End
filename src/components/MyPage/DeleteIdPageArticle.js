import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResetRecoilState, useSetRecoilState, useRecoilState } from 'recoil';
import styled from 'styled-components';
import { DeleteUser } from '../../api/apiPOST';

import { ChangeSignUp, GoLogIn, isLogin, NextMem, NextTor, toastVisible, TextToast } from '../../store/store';
import checked from './sources/checked_button.png';
import unchecked from './sources/unchecked_button.png';

export default function DeleteIdPageArticle() {
  const navigate = useNavigate();
  const setVisible = useSetRecoilState(toastVisible);
  const appLogout = useResetRecoilState(isLogin);
  const changeSignUp = useResetRecoilState(ChangeSignUp);
  const nextMem = useResetRecoilState(NextMem);
  const nextTor = useResetRecoilState(NextTor);
  const goLogIn = useResetRecoilState(GoLogIn);
  const [infoState, setInfoState] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    surveyMessage: '',
  });
  const onChangeInfo = (num) => {
    if (num === 1 && infoState.check1 === false) {
      setInfoState({ ...infoState, check1: true });
    }
    if (num === 1 && infoState.check1 === true) {
      setInfoState({ ...infoState, check1: false });
    }
    if (num === 2 && infoState.check2 === false) {
      setInfoState({ ...infoState, check2: true });
    }
    if (num === 2 && infoState.check2 === true) {
      setInfoState({ ...infoState, check2: false });
    }
    if (num === 3 && infoState.check3 === false) {
      setInfoState({ ...infoState, check3: true });
    }
    if (num === 3 && infoState.check3 === true) {
      setInfoState({ ...infoState, check3: false });
    }
    if (num === 4 && infoState.check4 === false) {
      setInfoState({ ...infoState, check4: true });
    }
    if (num === 4 && infoState.check4 === true) {
      setInfoState({ ...infoState, check4: false });
    }
  };
  const onChangeSurveyMessage = (e) => {
    setInfoState({ ...infoState, surveyMessage: e.target.value });
  };
  // toast 에 들어갈 문구 recoilstate
  const [toasttext, setToastText] = useRecoilState(TextToast);
  const { mutate: deleteUser } = useMutation(() => DeleteUser({ check1: infoState.check1, check2: infoState.check2, check3: infoState.check3, surveyMessage: infoState.surveyMessage }), {
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
      navigate('/');
      setVisible(true);
      setToastText('그동안 함께해서 즐거웠습니다');
    },
  });
  return (
    <StDeleteIdPageLayout>
      <div className="body">
        <div className="body_1">
          <div className="body_1_text">등대지기 탈퇴 전</div>
          <div className="body_1_text">확인해주세요</div>
        </div>
        <div className="body_2">
          <div className="body_2_text">탈퇴 하실 경우 등대지기에 있던</div>
          <div className="body_2_text">모든 기록과 상담 내역이 삭제됩니다.</div>
        </div>
        <div className="body_3">
          <div className="body_3_text">개인정보 노출이 걱정되시나요?</div>
        </div>
        <div className="body_4">
          <div className="body_4_text">고객님의 이메일과 같은 개인정보 및 발품기록, 상담기록은</div>
          <div className="body_4_text">절대 불특정 타인에게 공개되지 않아요.</div>
        </div>
      </div>
      <div className="body_info">
        <div className="body_info_title">무엇이 불편하셨나요?</div>
        <div className="body_info_1" onClick={() => onChangeInfo(1)}>
          <img src={infoState.check1 ? checked : unchecked} alt="check1" />
          <div className="body_info_1_text"> 개인정보 노출이 우려됩니다.</div>
        </div>
        <div className="body_info_2" onClick={() => onChangeInfo(2)}>
          <img src={infoState.check2 ? checked : unchecked} alt="check2" />
          <div className="body_info_2_text"> 매물 계약을 해서 필요가 없습니다.</div>
        </div>
        <div className="body_info_3" onClick={() => onChangeInfo(3)}>
          <img src={infoState.check3 ? checked : unchecked} alt="check3" />
          <div className="body_info_3_text"> UI/UX가 불편합니다.</div>
        </div>
        <div className="body_info_4">
          <div className="body_info_4_inner" onClick={() => onChangeInfo(4)}>
            <img src={infoState.check4 ? checked : unchecked} alt="check4" />
            <div className="body_info_4_text"> 직접 입력</div>
          </div>
          {infoState.check4 ? <textarea className="body_info_4_textarea" onChange={onChangeSurveyMessage} maxLength={120} placeholder="불편하신 점을 입력해주세요"></textarea> : null}
        </div>
      </div>
      <div className="buttons">
        <div className="button1" onClick={() => navigate('/mypage')}>
          더 함께하기
        </div>
        {infoState.check1 || infoState.check2 || infoState.check3 || (infoState.check4 && infoState.surveyMessage) ? (
          <div className="button3" onClick={deleteUser}>
            탈퇴하기
          </div>
        ) : (
          <div className="button2">탈퇴하기</div>
        )}
      </div>
    </StDeleteIdPageLayout>
  );
}

const StDeleteIdPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .body {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 24px 40px 32px 16px;
    border-bottom: 4px solid var(--gray6);
    font-family: var(--button-font-family);
    .body_1 {
      margin-bottom: 16px;
      font-size: var(--headline_Large-font-size);
      font-weight: var(--headline_Large-font-weight);
      line-height: var(--headline_Large-line-height);
      letter-spacing: var(--headline_Large-letter-spacing);
    }
    .body_2 {
      margin-bottom: 16px;
      font-size: var(--body_Medium-font-size);
      font-weight: var(--body_Medium-font-weight);
      line-height: var(--body_Medium-line-height);
      letter-spacing: var(--body_Medium-letter-spacing);
    }
    .body_3 {
      margin-bottom: 8px;
      font-size: var(--button_Small-font-size);
      font-weight: var(--button_Large-font-weight);
      line-height: var(--button_Small-line-height);
      letter-spacing: var(--button_Small-letter-spacing);
      color: var(--gray4);
    }
    .body_4 {
      font-size: var(--body_Small-font-size);
      font-weight: var(--body_Small-font-weight);
      line-height: var(--body_Small-line-height);
      letter-spacing: var(--body_Small-letter-spacing);
      color: var(--gray4);
    }
  }
  .body_info {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    /* padding: 24px 40px 0px 16px; */
    font-family: var(--button-font-family);
    font-size: var(--body_Medium-font-size);
    font-weight: var(--body_Medium-font-weight);
    line-height: var(--body_Medium-line-height);
    letter-spacing: var(--body_Medium-letter-spacing);
    .body_info_title {
      margin-bottom: 8px;
      padding: 24px 40px 0px 16px;
    }
    .body_info_1,
    .body_info_2,
    .body_info_3,
    .body_info_4_inner {
      display: flex;
      flex-direction: row;
      align-items: center;
      box-sizing: border-box;
      height: 56px;
      border-bottom: 1px solid var(--gray6);
      padding: 0 40px 0px 16px;
      cursor: pointer;
      img {
        width: 24px;
        height: 24px;
        margin-right: 12px;
      }
    }
    .body_info_4 {
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid var(--gray6);
    }
    .body_info_4_inner {
      border-bottom: none;
    }
    .body_info_4_textarea {
      margin: 0 16px 16px 16px;
      border: 1px solid var(--gray6);
      border-radius: 8px;
      background-color: white;
      resize: none;
      outline: none;
      padding: 12px;
      height: 102px;
      font-family: var(--headline-font-family);
      font-size: var(--body_Medium-font-size);
      font-weight: var(--body_Medium-font-weight);
      line-height: var(--body_Medium-line-height);
      letter-spacing: var(--body_Medium-letter-spacing);
      ::placeholder {
        font-family: var(--headline-font-family);
        font-size: var(--body_Medium-font-size);
        font-weight: var(--body_Medium-font-weight);
        line-height: var(--body_Medium-line-height);
        letter-spacing: var(--body_Medium-letter-spacing);
        color: #2a224f;
        opacity: 0.4;
      }
    }
  }
  .buttons {
    box-sizing: border-box;
    height: fit-content;
    margin-top: auto;
    margin-bottom: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 16px;
    font-family: var(--button-font-family);
    font-size: var(--button_Large-font-size);
    font-weight: var(--button_Large-font-weight);
    line-height: var(--button_Large-line-height);
    letter-spacing: var(--button_Large-letter-spacing);
    div {
      width: 156px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
    }
    .button1 {
      border: 1px solid var(--gray5);
      cursor: pointer;
    }
    .button2 {
      background-color: var(--gray5);
    }
    .button3 {
      background-color: var(--primary2-400);
      color: white;
      cursor: pointer;
    }
  }
`;

