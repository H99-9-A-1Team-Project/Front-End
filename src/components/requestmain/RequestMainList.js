import React from 'react';
import styled from 'styled-components';
import RqLt_Marker from './sources/RqmLt_Marker.png';
import '../../global/global.css';
import { useQuery } from '@tanstack/react-query';
import { ReadRequestList } from '../../api/apiGET';
import { useNavigate } from 'react-router-dom';

export default function RequestList() {
  const navigate = useNavigate();
  const { data } = useQuery(['requestlist'], ReadRequestList, {
    refetchOnWindowFocus: false,
    onSuccess: (response) => {},
  });
  return (
    <RqListContainer>
      <LastRequestContainer>
        <ListBox>
          <ListHeader>내 지난 상담</ListHeader>
          {data?.length > 0 ? (
            data.map((item) => {
              if (item.answerState === 'WAIT') {
                return (
                  <ListContent key={item.id} onClick={() => navigate(`/myconsultdetail/${item.id}`)}>
                    <div className="inner_box">
                      <MarkerImg src={RqLt_Marker} />
                      <ContentText>{item.title}</ContentText>
                    </div>
                    <div className="answer-icon-0">대기중</div>
                  </ListContent>
                );
              }
              if (item.answerState === 'ANSWER') {
                return (
                  <ListContent key={item.id} onClick={() => navigate(`/myconsultdetail/${item.id}`)}>
                    <MarkerImg src={RqLt_Marker} />
                    <ContentText>{item.title}</ContentText>
                    <div className="answer-icon-1">답변함</div>
                  </ListContent>
                );
              }
              if (item.answerState === 'FINISH') {
                return (
                  <ListContent key={item.id} onClick={() => navigate(`/myconsultdetail/${item.id}`)}>
                    <MarkerImg src={RqLt_Marker} />
                    <ContentText>{item.title}</ContentText>
                    <div className="answer-icon-2">답변함</div>
                  </ListContent>
                );
              }
            })
          ) : (
            <div className="empty"> 없음</div>
          )}
        </ListBox>
      </LastRequestContainer>
    </RqListContainer>
  );
}

const RqListContainer = styled.div`
  width: 100%;
  min-height: 328px;
  max-height: fit-content;
  display: flex;
  background-color: white;
  .answer-icon-0,
  .answer-icon-1,
  .answer-icon-2 {
    width: 48px;
    height: 24px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    margin-left: 8px;
    margin-top: 8px;
    justify-content: center;
    font-family: var(--button-font-family);
    font-size: var(--button_Small-font-size);
    font-weight: var(--button_Small-font-weight);
    line-height: var(--button_Small-line-height);
    letter-spacing: var(--button_Small-letter-spacing);
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

const LastRequestContainer = styled.div`
  width: 335px;
  min-height: 183px;
  max-height: fit-content;
  margin-top: 24px;
  margin-left: 12.5px;
  border: 1px solid var(--gray6);
  background: none;
  border-radius: 8px;
  @media (max-width: 500px) {
    width: 90%;
    margin: 24px auto 0 auto;
    padding-bottom: 0;
  }
`;

const ListBox = styled.div`
  width: 303px;
  min-height: 149px;
  max-height: fit-content;
  margin-top: 17px;
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  background: none;
  @media (max-width: 500px) {
    box-sizing: border-box;
    width: 90%;
    margin-right: auto;
    margin-left: auto;
  }
  .empty {
    width: 300px;
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-family: var(--button-font-family);
    font-size: var(--body_Medium-font-size);
    font-weight: var(--body_Medium-font-weight);
    line-height: var(--body_Medium-line-height);
    letter-spacing: var(--body_Medium-letter-spacing);
    color: var(--gray5);
  }
`;

const ListHeader = styled.p`
  background: none;
  font-family: var(--headline-font-family);
  font-size: var(--headline_Small-font-size);
  font-weight: var(--headline_Small-font-weight);
  line-height: var(--headline_Small-line-height);
  letter-spacing: var(--headline_Small-letter-spacing);
  cursor: default;
`;

const ListContent = styled.div`
  width: 303px;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
  padding-bottom: 16px;
  background: none;
  cursor: pointer;
  border-bottom: 1px solid var(--gray6);
  @media (max-width: 500px) {
    width: 100%;
    justify-content: space-between;
  }
  .inner_box {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const MarkerImg = styled.img`
  width: 24px;
  height: 24px;
  margin-top: 8px;
  background: none;
`;

const ContentText = styled.p`
  width: 215px;
  background: none;
  margin-left: 8px;
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
`;
