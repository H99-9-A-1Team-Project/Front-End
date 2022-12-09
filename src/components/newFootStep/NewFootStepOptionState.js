import React from 'react';
import styled from 'styled-components';
import '../../global/global.css';
import path_down from './sources/path_down.png';
import path_up from './sources/path_up.png';
import { nfsrPath } from '../../store/store';
import { useRecoilState } from 'recoil';

export default function NewFootStepOptionState() {
  const [optionPathState, setOptionPathState] = useRecoilState(nfsrPath);

  const onOptionStateChange = () => {
    if (optionPathState.option === false) setOptionPathState({ ...optionPathState, option: true });
    if (optionPathState.option === true) setOptionPathState({ ...optionPathState, option: false });
  };
  return (
    <Container
      onClick={() => {
        onOptionStateChange();
      }}
    >
      <Headline>구조/가구</Headline>
      {optionPathState.option === false ? <PathImg src={path_down} /> : <PathImg src={path_up} />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 360px;
  height: 56px;
  border-width: 1px 0px;
  border-color: var(--gray6);
  border-style: solid;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const Headline = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 16px;
  font-family: var(--button-font-family);
  font-size: var(--button_Medium-font-size);
  font-weight: var(--button_Medium-font-weight);
  line-height: var(--button_Medium-line-height);
  letter-spacing: var(--button_Medium-letter-spacing);
  color: var(--gray1);
  cursor: pointer;
`;

const PathImg = styled.img`
  margin-top: 16px;
  margin-bottom: 16px;
  width: 24px;
  height: 24px;
  margin-right: 16px;
  cursor: pointer;
`;
