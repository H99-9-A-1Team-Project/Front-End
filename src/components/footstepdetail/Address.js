import React from 'react';
import styled from 'styled-components';
import MarkerImg from './sources/carouselmarker.png';
import { useQuery } from '@tanstack/react-query';
import { ReadPremisesList } from '../../api/apiGET';

export default function Address() {
  const { data: premisesData } = useQuery(['premisesData'], ReadPremisesList, {
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (response) => {
      console.log(response);
    },
  });
  return (
    <Container>
      <HeadlineBox>
        <HeadlineImg src={MarkerImg} />
        <HeadlineP>발품기록 | 상담</HeadlineP>
      </HeadlineBox>
      <AddressP>{premisesData && premisesData[0].title}</AddressP>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

const HeadlineBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 24px;
  margin-left: 16px;
`;

const HeadlineImg = styled.img`
  width: 24px;
  height: 24px;
`;

const HeadlineP = styled.div`
  margin-left: 8px;
  margin-top: 4px;
  color: #3fb00a;
  font-family: var(--body-font-family);
  font-size: var(--body_Small-font-size);
  font-weight: var(--body_Small-font-weight);
  line-height: var(--body_Small-line-height);
  letter-spacing: var(--body_Small-letter-spacing);
`;

const AddressP = styled.div`
  margin-left: 16px;
  margin-top: 8px;
  font-family: var(--headline-font-family);
  font-size: var(--headline_Small-font-size);
  font-weight: var(--headline_Small-font-weight);
  line-height: var(--headline_Small-line-height);
  letter-spacing: var(--headline_Small-letter-spacing);
`;
