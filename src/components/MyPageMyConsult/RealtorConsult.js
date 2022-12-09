import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { ReadAnsweredList, ReadWaitList } from '../../api/apiGET';
import { searchAnswered, searchState, searchWait } from '../../store/store';
import MyConsultBodyContainer from './MyConsultBodyContainer';

export default function RealtorConsult() {
  const navigate = useNavigate();
  const [searchStateData, setSearchState] = useRecoilState(searchState);
  const serchDataWait = useRecoilValue(searchWait);
  const serchDataAnswered = useRecoilValue(searchAnswered);
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
    enabled: !!(window.location.pathname === '/waitlist'),
    onSuccess: (config) => {
      return config.reverse();
    },
  });
  const { data: answeredData } = useQuery(['answeredlist'], ReadAnsweredList, {
    enabled: !!(window.location.pathname === '/answeredlist'),
    onSuccess: (config) => {
      return config.reverse();
    },
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
      {searchStateData ? (
        <div className="consulting-wrap">
          {window.location.pathname === '/waitlist' ? (
            serchDataWait?.length !== 0 ? (
              serchDataWait?.map((item) => {
                return <MyConsultBodyContainer key={item.id} realtorListState={realtorListState} item={item} setSearchState={setSearchState} />;
              })
            ) : (
              <div className="consulting-wrap2">검색하신 단어와 일치하는 정보가 없습니다.</div>
            )
          ) : null}
          {window.location.pathname === '/answeredlist' ? (
            serchDataAnswered?.length !== 0 ? (
              serchDataAnswered?.map((item) => {
                return <MyConsultBodyContainer key={item.id} realtorListState={realtorListState} item={item} setSearchState={setSearchState} />;
              })
            ) : (
              <div className="consulting-wrap2">검색하신 단어와 일치하는 정보가 없습니다.</div>
            )
          ) : null}
        </div>
      ) : (
        <div className="consulting-wrap">
          {window.location.pathname === '/waitlist' ? (
            waitData?.length !== 0 ? (
              waitData?.map((item) => {
                return <MyConsultBodyContainer key={item.id} realtorListState={realtorListState} item={item} setSearchState={setSearchState} />;
              })
            ) : (
              <div className="consulting-wrap2">대기중인 상담이 없습니다.</div>
            )
          ) : null}
          {window.location.pathname === '/answeredlist' ? (
            answeredData?.length !== 0 ? (
              answeredData?.map((item) => {
                return <MyConsultBodyContainer key={item.id} realtorListState={realtorListState} item={item} setSearchState={setSearchState} />;
              })
            ) : (
              <div className="consulting-wrap2">답변한 상담이 없습니다.</div>
            )
          ) : null}
        </div>
      )}
    </StMyPageBodyWrap>
  );
}

const StMyPageBodyWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  margin-bottom: auto;
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
  .consulting-wrap2 {
    width: 328px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid var(--gray6);
    font-family: var(--button-font-family);
    font-size: var(--button_Large-font-size);
    font-weight: var(--button_Large-font-weight);
    line-height: var(--button_Large-line-height);
    letter-spacing: var(--button_Large-letter-spacing);
    @media (max-width: 500px) {
      width: 95%;
    }
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
    @media (max-width: 500px) {
      width: 93%;
    }
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
