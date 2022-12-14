import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { ReadRequestList } from '../../api/apiGET';
import { searchConsult, searchState } from '../../store/store';
import MyConsultBodyContainer from './MyConsultBodyContainer';

export default function MyConsultBody() {
  const [searchStateData, setSearchState] = useRecoilState(searchState);
  const searchData = useRecoilValue(searchConsult);
  const [listState, setListState] = useState(0);
  const onClickListAll = () => {
    setListState(0);
  };
  const onClickListWait = () => {
    setListState(1);
  };
  const onClickListComplete = () => {
    setListState(2);
  };

  const { data } = useQuery(['requestlist'], ReadRequestList, {
    refetchOnWindowFocus: false,
    onSuccess: (config) => {
      config.map((item) => {
        if (item.consultMessage === '없음') {
          return (item.consultMessage = '전달메세지가 없습니다.');
        }
      });
      return config.reverse();
    },
  });
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
      {searchStateData ? (
        searchData?.length !== 0 ? (
          <div className="consulting-wrap">
            {searchData?.map((item) => {
              return <MyConsultBodyContainer key={item.id} listState={listState} item={item} setSearchState={setSearchState} />;
            })}
          </div>
        ) : (
          <div className="consulting-wrap2">검색하신 단어와 일치하는 정보가 없습니다.</div>
        )
      ) : data?.length !== 0 ? (
        <div className="consulting-wrap">
          {data?.map((item) => {
            return <MyConsultBodyContainer key={item.id} listState={listState} item={item} setSearchState={setSearchState} />;
          })}
        </div>
      ) : (
        <div className="consulting-wrap2">상담신청 내역이 없습니다.</div>
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
      width: 100%;
      box-sizing: border-box;
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
      .toastui-editor-contents {
        p {
          border-bottom: 0px !important;
        }
      }
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
