import React from 'react';
import styled from 'styled-components';
import Path_left from './sources/path_left.png';
import { useNavigate } from 'react-router-dom';

export default function NewFootStepAddress() {
  const navigate = useNavigate();
  return (
    <Container>
      <HeaderBox>
        <ImgPathLeft
          src={Path_left}
          onClick={() => {
            navigate('/footstepmain');
          }}
        />
        <HeadlineBox>
          <HeaderHeadline>발품기록</HeaderHeadline>
          <CreateBtn>추가</CreateBtn>
        </HeadlineBox>
      </HeaderBox>
    </Container>
  );
}

const Container = styled.div`
  height: 64px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--gray6);
`;

const HeaderBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const ImgPathLeft = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 16px;
  margin-top: 20px;
  cursor: pointer;
`;

const HeadlineBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const HeaderHeadline = styled.p`
  margin-left: 8px;
  margin-top: 20px;
  font-family: var(--body-font-family);
  font-size: var(--body_Large-font-size);
  font-weight: var(--body_Large-font-weight);
  line-height: var(--body_Large-line-height);
  letter-spacing: var(--body_Large-letter-spacing);
  cursor: default;
`;

const CreateBtn = styled.button`
  margin-top: 22px;
  margin-right: 16px;
  width: 40px;
  font-family: var(--button-font-family);
  font-size: var(--button_Large-font-size);
  font-weight: var(--button_Large-font-weight);
  line-height: var(--button_Large-line-height);
  letter-spacing: var(--button_Large-letter-spacing);
  border: none;
  color: var(--primary2-400);
  cursor: pointer;
`;
