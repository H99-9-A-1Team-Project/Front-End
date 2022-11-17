import React, { useState } from 'react';
import styled from 'styled-components';
import MyConsultBodyContainer from './MyConsultBodyContainer';

export default function MyConsultBody() {
  const [listState, setListState] = useState(0);
  const [ansState, setAnsState] = useState(0, 1, 2);
  const onClickListAll = () => {
    setAnsState(0, 1, 2);
    setListState(0);
  };
  const onClickListWait = () => {
    setAnsState(0);
    setListState(1);
  };
  const onClickListComplete = () => {
    setAnsState(1, 2);
    setListState(2);
  };

  return (
    <StMyPageBodyWrap>
      <ul>
        <li onClick={onClickListAll} className={listState === 0 ? 'button-large' : 'button-medium'}>
          전체
        </li>
        <li onClick={onClickListWait} className={listState === 1 ? 'button-large' : 'button-medium'}>
          대기중
        </li>
        <li onClick={onClickListComplete} className={listState === 2 ? 'button-large' : 'button-medium'}>
          완료
        </li>
      </ul>
      <div className="consulting-wrap">
        <MyConsultBodyContainer listState={listState} ansState={ansState} />
      </div>
    </StMyPageBodyWrap>
  );
}

const StMyPageBodyWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  ul {
    display: flex;
    flex-direction: row;
    padding: 0 0 0 16px;
    background-color: white;
    border-bottom: 4px solid var(--gray6);
  }
  .button-large {
    background-color: white;
    font-family: var(--button-font-family);
    font-size: var(--button_Large-font-size);
    font-weight: var(--button_Large-font-weight);
    line-height: var(--button_Large-line-height);
    letter-spacing: var(--button_Large-letter-spacing);
    color: var(--primary2-400);
    border-bottom: 2px solid var(--primary2-400);
    padding: 8px 12px;
  }
  .button-medium {
    background-color: white;
    font-family: var(--button-font-family);
    font-size: var(--button_Medium-font-size);
    font-weight: var(--button_Medium-font-weight);
    line-height: var(--button_Medium-line-height);
    letter-spacing: var(--button_Medium-letter-spacing);
    color: var(--gray3);
    padding: 10px 12px;
  }
  .consulting-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .consulting-container-blue {
    width: 328px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--primary2-100);
    padding: 16px;
    .container-header {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background-color: var(--primary2-100);
      margin-bottom: 0;
    }
    .title-box {
      display: flex;
      align-items: center;
      width: 246px;
      background-color: var(--primary2-100);
      font-family: var(--button-font-family);
      font-size: var(--button_Large-font-size);
      font-weight: var(--button_Large-font-weight);
      line-height: var(--button_Large-line-height);
      letter-spacing: var(--button_Large-letter-spacing);
    }
    .answer-icon {
      width: 42px;
      height: 24px;
      border-radius: 4px;
      color: white;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background-color: var(--primary2-400);
      font-family: var(--button-font-family);
      font-size: var(--button_Small-font-size);
      font-weight: var(--button_Small-font-weight);
      line-height: var(--button_Small-line-height);
      letter-spacing: var(--button_Small-letter-spacing);
    }
    .time {
      margin-top: 8px;
      background-color: var(--primary2-100);
      color: var(--gray3);
      font-family: var(--button-font-family);
      font-size: var(--body_Small-font-size);
      font-weight: var(--body_Small-font-weight);
      line-height: var(--body_Small-line-height);
      letter-spacing: var(--body_Small-letter-spacing);
    }
    .consulting-message {
      width: 100%;
      margin-top: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      background-color: var(--primary2-100);
      font-family: var(--button-font-family);
      font-size: var(--button_Medium-font-size);
      font-weight: var(--button_Medium-font-weight);
      line-height: var(--button_Medium-line-height);
      letter-spacing: var(--button_Medium-letter-spacing);
    }
  }
  .consulting-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    padding: 16px;
  }
  .container-header {
    display: flex;
    flex-direction: row;
    img {
      border-radius: 100%;
      width: 40px;
      height: 40px;
    }
  }
  .consulting-inner-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .consulting-box {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  .consulting-box-bottom {
    display: flex;
    flex-direction: row;
    gap: 10px;
    font-size: 14px;
    color: gray;
  }
  .type-second {
    border-left: 1px solid gray;
    padding-left: 10px;
  }
`;
