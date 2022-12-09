import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { TabState } from '../../store/store';
import { useQuery } from '@tanstack/react-query';
import { ReadFootStep } from '../../api/apiGET';
import path_down from './sources/path_down.png';
import path_up from './sources/path_up.png';
import Check_On from './sources/Check_On.png';
import Check_None from './sources/Check_None.png';
import { useParams } from 'react-router-dom';
export default function CheckList() {
  const { id } = useParams();
  const [pathState, setPathState] = useState({
    sun: false,
    option: false,
    security: false,
    conven: false,
  });
  const { data: premisesData } = useQuery(['premisesData'], () => ReadFootStep(id), {
    onSuccess: (response) => {},
    onError: (response) => {},
  });
  const TabStates = useRecoilValue(TabState);

  const onStateChange = (state) => {
    if (state === 'sun') {
      if (pathState.sun === false) setPathState({ ...pathState, sun: true });
      if (pathState.sun === true) setPathState({ ...pathState, sun: false });
    }
    if (state === 'option') {
      if (pathState.option === false) setPathState({ ...pathState, option: true });
      if (pathState.option === true) setPathState({ ...pathState, option: false });
    }
    if (state === 'security') {
      if (pathState.security === false) setPathState({ ...pathState, security: true });
      if (pathState.security === true) setPathState({ ...pathState, security: false });
    }
    if (state === 'conven') {
      if (pathState.conven === false) setPathState({ ...pathState, conven: true });
      if (pathState.conven === true) setPathState({ ...pathState, conven: false });
    }
  };

  return (
    <Container>
      {TabStates === 1 ? (
        <>
          <PathBox>
            <Headline>채광/습도/수도</Headline>
            {pathState.sun === false ? (
              <PathImg
                src={path_down}
                onClick={() => {
                  onStateChange('sun');
                }}
              />
            ) : (
              <>
                <PathImg
                  src={path_up}
                  onClick={() => {
                    onStateChange('sun');
                  }}
                />
              </>
            )}
          </PathBox>

          {pathState.sun === true ? (
            <>
              <CheckBox1>
                {premisesData && premisesData.sun === false ? <CheckImg src={Check_None} /> : <CheckImg src={Check_On} />}
                <CheckBody>채광 잘 듦</CheckBody>
              </CheckBox1>
              <CheckBox2>
                {premisesData && premisesData.mold === false ? <CheckImg src={Check_None} /> : <CheckImg src={Check_On} />}
                <CheckBody>곰팡이 있음</CheckBody>
              </CheckBox2>
              <CheckBox2>
                {premisesData && premisesData.vent === false ? <CheckImg src={Check_None} /> : <CheckImg src={Check_On} />}
                <CheckBody>습도가 높음</CheckBody>
              </CheckBox2>
              <CheckBox2>
                {premisesData && premisesData.water === false ? <CheckImg src={Check_None} /> : <CheckImg src={Check_On} />}
                <CheckBody>물 잘 나옴</CheckBody>
              </CheckBox2>
              <CheckBox2>
                {premisesData && premisesData.ventil === false ? <CheckImg src={Check_None} /> : <CheckImg src={Check_On} />}
                <CheckBody>배수 잘 됨</CheckBody>
              </CheckBox2>
              <CheckBox2>
                {premisesData && premisesData.drain === false ? <CheckImg src={Check_None} /> : <CheckImg src={Check_On} />}
                <CheckBody>외풍 있음</CheckBody>
              </CheckBox2>
              <CheckBox2>
                {premisesData && premisesData.draft === false ? <CheckImg src={Check_None} /> : <CheckImg src={Check_On} />}
                <CheckBody>환기 잘 됨</CheckBody>
              </CheckBox2>
              <MemoHeadline>추가 메모</MemoHeadline>
              <MemoBody>{premisesData && premisesData.extraMemo}</MemoBody>
            </>
          ) : null}
          <>
            <PathBox>
              <Headline>구조/가구</Headline>
              {pathState.option === false ? (
                <PathImg
                  src={path_down}
                  onClick={() => {
                    onStateChange('option');
                  }}
                />
              ) : (
                <>
                  <PathImg
                    src={path_up}
                    onClick={() => {
                      onStateChange('option');
                    }}
                  />
                </>
              )}
            </PathBox>
          </>
          {pathState.option === true ? (
            <>
              <MemoHeadline>옵션 종류 및 상태</MemoHeadline>
              <MemoBody2>{premisesData && premisesData.option}</MemoBody2>
              <CheckBox2>
                {premisesData && premisesData.destroy === false ? <CheckImg src={Check_None} /> : <CheckImg src={Check_On} />}
                <CheckBody>파손된 가구 있음</CheckBody>
              </CheckBox2>
              <CheckBox2>
                {premisesData && premisesData.utiRoom === false ? <CheckImg src={Check_None} /> : <CheckImg src={Check_On} />}
                <CheckBody>다용도실 있음</CheckBody>
              </CheckBox2>
            </>
          ) : null}
          <>
            <PathBox>
              <Headline>안전</Headline>
              {pathState.security === false ? (
                <PathImg
                  src={path_down}
                  onClick={() => {
                    onStateChange('security');
                  }}
                />
              ) : (
                <>
                  <PathImg
                    src={path_up}
                    onClick={() => {
                      onStateChange('security');
                    }}
                  />
                </>
              )}
            </PathBox>
          </>
          {pathState.security === true ? (
            <>
              <CheckBox1>
                {premisesData && premisesData.securityWindow === false ? <CheckImg src={Check_None} /> : <CheckImg src={Check_On} />}
                <CheckBody>방범창 설치되어 있음</CheckBody>
              </CheckBox1>
              <CheckBox2>
                {premisesData && premisesData.noise === false ? <CheckImg src={Check_None} /> : <CheckImg src={Check_On} />}
                <CheckBody>방음 안됨</CheckBody>
              </CheckBox2>
              <CheckBox2>
                {premisesData && premisesData.loan === false ? <CheckImg src={Check_None} /> : <CheckImg src={Check_On} />}
                <CheckBody>대출 가능함</CheckBody>
              </CheckBox2>
              <CheckBox2>
                {premisesData && premisesData.cctv === false ? <CheckImg src={Check_None} /> : <CheckImg src={Check_On} />}
                <CheckBody>CCTV, 중앙현관 있음</CheckBody>
              </CheckBox2>
            </>
          ) : null}
          <>
            <PathBox>
              <Headline>편의성</Headline>
              {pathState.conven === false ? (
                <PathImg
                  src={path_down}
                  onClick={() => {
                    onStateChange('conven');
                  }}
                />
              ) : (
                <>
                  <PathImg
                    src={path_up}
                    onClick={() => {
                      onStateChange('conven');
                    }}
                  />
                </>
              )}
            </PathBox>
          </>
          {pathState.conven === true ? (
            <>
              <CheckBox1>
                {premisesData && premisesData.hill === false ? <CheckImg src={Check_None} /> : <CheckImg src={Check_On} />}
                <CheckBody>언덕 높음</CheckBody>
              </CheckBox1>
              <CheckBox2>
                {premisesData && premisesData.mart === false ? <CheckImg src={Check_None} /> : <CheckImg src={Check_On} />}
                <CheckBody>편의점, 시장, 마트 근처에 있음</CheckBody>
              </CheckBox2>
              <CheckBox2>
                {premisesData && premisesData.hospital === false ? <CheckImg src={Check_None} /> : <CheckImg src={Check_On} />}
                <CheckBody>병원, 약국이 근처에 있음</CheckBody>
              </CheckBox2>
              <CheckBox2>
                {premisesData && premisesData.accessibility === false ? <CheckImg src={Check_None} /> : <CheckImg src={Check_On} />}
                <CheckBody>대중교통이 편리함</CheckBody>
              </CheckBox2>
              <CheckBox2>
                {premisesData && premisesData.park === false ? <CheckImg src={Check_None} /> : <CheckImg src={Check_On} />}
                <CheckBody>주차장 있음</CheckBody>
              </CheckBox2>
            </>
          ) : null}
        </>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  height: 100px;
`;

const PathBox = styled.div`
  height: 56px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid var(--gray6);
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

const CheckBox1 = styled.div`
  width: 328px;
  height: 56px;
  display: flex;
  flex-direction: row;
  margin-left: 22px;
  margin-top: 40px;
`;

const CheckBox2 = styled.div`
  width: 328px;
  height: 56px;
  display: flex;
  flex-direction: row;
  margin-left: 22px;
  margin-top: 16px;
`;

const CheckImg = styled.img`
  width: 24px;
  height: 24px;
`;

const CheckBody = styled.div`
  margin-left: 12px;
  margin-top: 2px;
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
`;

const MemoHeadline = styled.div`
  margin-left: 16px;
  margin-top: 16px;
  color: var(--gray4);
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
`;
const MemoBody = styled.div`
  margin-top: 8px;
  margin-left: 16px;
  margin-bottom: 56px;
`;
const MemoBody2 = styled.div`
  margin-top: 8px;
  margin-left: 16px;
  margin-bottom: 24px;
`;
