import React from 'react';
import styled from 'styled-components';
import '../../global/global.css';
import path_down from './sources/path_down.png';
import path_up from './sources/path_up.png';
import { nfsrPath } from '../../store/store';
import { useRecoilState } from 'recoil';

export default function NewFootStepConvenState() {
  const [convenPathState, setConvenPathState] = useRecoilState(nfsrPath);

  const onSunStateChange = () => {
    if (convenPathState.conven === false) setConvenPathState({ ...convenPathState, conven: true });
    if (convenPathState.conven === true) setConvenPathState({ ...convenPathState, conven: false });
  };
  return (
    <Container>
      <Headline>편의성</Headline>
      {convenPathState.conven === false ? (
        <PathImg
          src={path_down}
          onClick={() => {
            onSunStateChange();
          }}
        />
      ) : (
        <PathImg
          src={path_up}
          onClick={() => {
            onSunStateChange();
          }}
        />
      )}
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
  cursor: default;
`;

const PathImg = styled.img`
  margin-top: 16px;
  margin-bottom: 16px;
  width: 24px;
  height: 24px;
  margin-right: 16px;
  cursor: pointer;
`;
