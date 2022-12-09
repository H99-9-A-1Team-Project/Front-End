import React from 'react';
import styled from 'styled-components';
import leftPath from './sources/rqhPath.png';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  return (
    <Container>
      <PathImg
        src={leftPath}
        onClick={() => {
          navigate('/footstepmain');
        }}
      />
      <Headline>발품기록</Headline>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-bottom: 20px;
`;

const PathImg = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 16px;
  margin-top: 20px;
  cursor: pointer;
`;

const Headline = styled.div`
  margin-left: 8px;
  margin-top: 20px;
  cursor: default;
`;
