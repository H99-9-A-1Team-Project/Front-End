import React from 'react';
import styled from 'styled-components';
import RqLt_Marker from './sources/rqmLt_Marker.png';
import '../../global/global.css';

export default function requestList() {
  return (
    <RqListContainer>
      <LastRequestContainer>
        <ListBox>
          <ListHeader>내 지난 상담</ListHeader>
          <ListContent>
            <MarkerImg src={RqLt_Marker} />
            <ContentText>서울특별시 관악구 남부순환로 2076 203호</ContentText>
            <ContentState1>대기중</ContentState1>
          </ListContent>
          <HorizontalBar />
          <ListContent>
            <MarkerImg src={RqLt_Marker} />
            <ContentText>서울특별시 관악구 남부순환로 2076 203호</ContentText>
            <ContentState2>완료</ContentState2>
          </ListContent>
        </ListBox>
      </LastRequestContainer>
    </RqListContainer>
  );
}

const RqListContainer = styled.div`
  width: 100%;
  height: 328px;
  display: flex;
  background-color: white;
`;

const LastRequestContainer = styled.div`
  width: 335px;
  height: 183px;
  margin-top: 24px;
  margin-left: 12.5px;
  border: 1px solid var(--gray6);
  background: none;
  border-radius: 8px;
`;

const ListBox = styled.div`
  width: 303px;
  height: 149px;
  margin-top: 17px;
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  background: none;
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
  margin-top: 16px;
  background: none;
  cursor: pointer;
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

const ContentState1 = styled.div`
  width: 48px;
  height: 24px;
  background-color: var(--primary1-200);
  border-radius: 4px;
  display: flex;
  align-items: center;
  margin-left: 8px;
  margin-top: 8px;
  justify-content: center;
  font-family: var(--body-font-family);
  font-size: var(--body_Small-font-size);
  font-weight: var(--body_Small-font-weight);
  line-height: var(--body_Small-line-height);
  letter-spacing: var(--body_Small-letter-spacing);
`;
const ContentState2 = styled.div`
  width: 38px;
  height: 24px;
  background-color: var(--primary1-400);
  border-radius: 4px;
  display: flex;
  align-items: center;
  margin-left: 13px;
  margin-top: 8px;
  justify-content: center;
  font-family: var(--body-font-family);
  font-size: var(--body_Small-font-size);
  font-weight: var(--body_Small-font-weight);
  line-height: var(--body_Small-line-height);
  letter-spacing: var(--body_Small-letter-spacing);
`;

const HorizontalBar = styled.div`
  width: 296px;
  height: 1px;
  margin-top: 16px;
  background-color: var(--gray6);
`;
