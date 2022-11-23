import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReadAnsweredList, ReadWaitList } from '../../api/apiGET';
import MyConsultBodyContainer from './MyConsultBodyContainer';

export default function RealtorConsult() {
  const navigate = useNavigate();
  const [realtorListState, setRealtorListState] = useState(0);
  const onClickListAll = () => {
    setRealtorListState(0);
    navigate('/waitlist');
  };
  const onClickListWait = () => {
    setRealtorListState(1);
    navigate('/answeredlist');
  };
  useEffect(() => {
    if (window.location.pathname === '/answeredlist') {
      setRealtorListState(1);
    }
    if (window.location.pathname === '/waitlist') {
      setRealtorListState(0);
    }
  }, [window.location.pathname]);

  const { data: waitData } = useQuery(['waitlist'], ReadWaitList, {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    enabled: !!(window.location.pathname === '/waitlist'),
  });
  const { data: answeredData } = useQuery(['answeredlist'], ReadAnsweredList, {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    enabled: !!(window.location.pathname === '/answeredlist'),
  });
  return (
    <StMyPageBodyWrap>
      <ul>
        <li onClick={onClickListAll} className={realtorListState === 0 ? 'button-large' : 'button-medium'}>
          대기중
        </li>
        <li onClick={onClickListWait} className={realtorListState === 1 ? 'button-large' : 'button-medium'}>
          답변한 상담
        </li>
      </ul>
      <div className="consulting-wrap">
        {window.location.pathname === '/waitlist'
          ? waitData?.map((item) => {
              return <MyConsultBodyContainer key={item.id} realtorListState={realtorListState} item={item} />;
            })
          : null}
        {window.location.pathname === '/answeredlist'
          ? answeredData?.map((item) => {
              return <MyConsultBodyContainer key={item.id} realtorListState={realtorListState} item={item} />;
            })
          : null}
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
    li {
      cursor: pointer;
    }
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
  .consulting-container-0,
  .consulting-container-1,
  .consulting-container-2 {
    width: 328px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--primary2-100);
    padding: 16px;
    border-bottom: 1px solid var(--gray6);
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
    .answer-icon-0,
    .answer-icon-1,
    .answer-icon-2 {
      width: 42px;
      height: 24px;
      border-radius: 4px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
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
  .consulting-container-0,
  .consulting-container-2 {
    background-color: white;
    .container-header {
      background-color: white;
    }
    .title-box {
      background-color: white;
    }
    .time {
      background-color: white;
    }
    .consulting-message {
      background-color: white;
    }
  }
  .answer-icon-0 {
    background-color: var(--primary2-100);
    color: var(--primary2-300);
  }
  .answer-icon-1 {
    background-color: var(--primary2-400);
    color: white;
  }
  .answer-icon-2 {
    background-color: var(--gray6);
    color: var(--gray4);
  }
`;
