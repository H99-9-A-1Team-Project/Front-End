import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { TabState } from '../../store/store';
import { useQuery } from '@tanstack/react-query';
import { ReadPremisesList, ReadFootStep } from '../../api/apiGET';
import { useParams } from 'react-router-dom';
export default function Basic() {
  const { id } = useParams();
  const { data: premisesData } = useQuery(['fstdata'], () => ReadFootStep(id), {
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (response) => {
      console.log(response);
    },
  });
  const TabStates = useRecoilValue(TabState);
  return (
    <Container>
      {TabStates === 0 ? (
        <>
          <Box1>
            <Title>매물 가격</Title>
            <Body>{premisesData && premisesData.price}</Body>
          </Box1>
          <Box1>
            <Title>관리비</Title>
            <Body>{premisesData && premisesData.expenses}</Body>
          </Box1>
          <Box1>
            <Title>방 크기</Title>
            <Body>{premisesData && premisesData.size}</Body>
          </Box1>
          <Box1>
            <Title>한 줄 평</Title>
            <Body>{premisesData && premisesData.review}</Body>
          </Box1>
          <Box1>
            <Title>상담 유무</Title>
            <Body>안함</Body>
          </Box1>
        </>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: 200px;
`;

const Box1 = styled.div`
  height: 52px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.div`
  margin-left: 16px;
  margin-top: 16px;
  color: var(--gray4);
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
`;

const Body = styled.div`
  margin-top: 16px;
  margin-right: 16px;
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
`;
