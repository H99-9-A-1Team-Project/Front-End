import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CheckOFF from './source/rq2CheckOFF.png';
import CheckON from './source/rq2CheckON.png';
import { rqInfo } from '../../store/store';
import { useRecoilState } from 'recoil';
import '../../global/global.css';
import { useNavigate } from 'react-router-dom';

export default function Request2Article() {
  const navigate = useNavigate();
  const [rq2Info, setRq2Info] = useRecoilState(rqInfo);
  const [btnState, setBtnState] = useState(0);

  useEffect(() => {
    if (rq2Info.check1 === 0 && rq2Info.check2 === 0 && rq2Info.check3 === 0 && rq2Info.check4 === 0 && rq2Info.check5 === 0 && rq2Info.check6 === 0) {
      setBtnState(0);
    } else {
      setBtnState(1);
    }
  }, [rq2Info]);

  const onCheck = (num) => {
    if (num === 1 && rq2Info.check1 !== 1) {
      setRq2Info({ ...rq2Info, check1: 1 });
    }
    if (num === 1 && rq2Info.check1 === 1) {
      setRq2Info({ ...rq2Info, check1: 0 });
    }
    if (num === 2 && rq2Info.check2 !== 1) {
      setRq2Info({ ...rq2Info, check2: 1 });
    }
    if (num === 2 && rq2Info.check2 === 1) {
      setRq2Info({ ...rq2Info, check2: 0 });
    }
    if (num === 3 && rq2Info.check3 !== 1) {
      setRq2Info({ ...rq2Info, check3: 1 });
    }
    if (num === 3 && rq2Info.check3 === 1) {
      setRq2Info({ ...rq2Info, check3: 0 });
    }
    if (num === 4 && rq2Info.check4 !== 1) {
      setRq2Info({ ...rq2Info, check4: 1 });
    }
    if (num === 4 && rq2Info.check4 === 1) {
      setRq2Info({ ...rq2Info, check4: 0 });
    }
    if (num === 5 && rq2Info.check5 !== 1) {
      setRq2Info({ ...rq2Info, check5: 1 });
    }
    if (num === 5 && rq2Info.check5 === 1) {
      setRq2Info({ ...rq2Info, check5: 0 });
    }
    if (num === 6 && rq2Info.check6 !== 1) {
      setRq2Info({ ...rq2Info, check6: 1 });
    }
    if (num === 6 && rq2Info.check6 === 1) {
      setRq2Info({ ...rq2Info, check6: 0 });
    }
    console.log(rq2Info);
  };

  const onNextBtn = () => {
    if (btnState === 1) {
      navigate('/request3');
    }
  };

  return (
    <Rq2Container>
      <HozBar1 />
      <ContentBox
        onClick={() => {
          onCheck(1);
        }}
      >
        {rq2Info.check1 === 1 ? <Rq2CheckImg src={CheckON} /> : <Rq2CheckImg src={CheckOFF} />}
        <ContentP>불법 건축물인지 확인하고 싶어요</ContentP>
      </ContentBox>
      <HozBar2 />
      <ContentBox
        onClick={() => {
          onCheck(2);
        }}
      >
        {rq2Info.check2 === 1 ? <Rq2CheckImg src={CheckON} /> : <Rq2CheckImg src={CheckOFF} />}
        <ContentP>건축물의 층별 구조와 용도를 알고싶어요</ContentP>
      </ContentBox>
      <HozBar2 />
      <ContentBox
        onClick={() => {
          onCheck(3);
        }}
      >
        {rq2Info.check3 === 1 ? <Rq2CheckImg src={CheckON} /> : <Rq2CheckImg src={CheckOFF} />}
        <ContentP>건축물의 소유자 현황을 알고싶어요</ContentP>
      </ContentBox>
      <HozBar2 />
      <ContentBox
        onClick={() => {
          onCheck(4);
        }}
      >
        {rq2Info.check4 === 1 ? <Rq2CheckImg src={CheckON} /> : <Rq2CheckImg src={CheckOFF} />}
        <ContentP>언제 지어졌는지 알고싶어요</ContentP>
      </ContentBox>
      <HozBar2 />
      <ContentBox
        onClick={() => {
          onCheck(5);
        }}
      >
        {rq2Info.check5 === 1 ? <Rq2CheckImg src={CheckON} /> : <Rq2CheckImg src={CheckOFF} />}
        <ContentP>전반적인 등기 정보를 알고싶어요</ContentP>
      </ContentBox>
      <HozBar2 />
      <ContentBox
        onClick={() => {
          onCheck(6);
        }}
      >
        {rq2Info.check6 === 1 ? <Rq2CheckImg src={CheckON} /> : <Rq2CheckImg src={CheckOFF} />}
        <ContentP>전/월세 계약하는데 안전할지 점검받고 싶어요</ContentP>
      </ContentBox>
      <HozBar2 />
      <BtnBox>
        <BackBtn
          onClick={() => {
            navigate('/request1');
          }}
        >
          이전
        </BackBtn>
        <NextBtn
          btnState={btnState}
          onClick={() => {
            onNextBtn();
          }}
        >
          다음
        </NextBtn>
      </BtnBox>
    </Rq2Container>
  );
}

const Rq2Container = styled.div`
  height: 100%;
  background: none;
  display: flex;
  flex-direction: column;
`;

const Rq2CheckImg = styled.img`
  width: 24px;
  height: 24px;
  background: none;
  margin-top: 12px;
`;

const ContentBox = styled.div`
  width: 328px;
  height: 48px;
  display: flex;
  flex-direction: row;
  margin-left: 16px;
  margin-top: 8px;
  background: none;
  cursor: pointer;
`;

const ContentP = styled.div`
  margin-left: 15px;
  margin-top: 16px;
  background: none;
  font-family: var(--button-font-family);
  font-size: var(--button_Medium-font-size);
  font-weight: var(--button_Medium-font-weight);
  line-height: var(--button_Medium-line-height);
  letter-spacing: var(--button_Medium-letter-spacing);
`;

const HozBar1 = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--gray6);
  margin-top: 32px;
`;

const HozBar2 = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--gray6);
  margin-top: 8px;
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 16px;
  margin-top: auto;
  margin-bottom: 32px;
  background: none;
`;
const BackBtn = styled.button`
  width: 156px;
  height: 60px;
  background-color: white;
  font-family: var(--button-font-family);
  font-size: var(--button_Large-font-size);
  font-weight: var(--button_Large-font-weight);
  line-height: var(--button_Large-line-height);
  letter-spacing: var(--button_Large-letter-spacing);
  border: 1px solid var(--gray5);
  border-radius: 8px;
  cursor: pointer;
`;
const NextBtn = styled.button`
  width: 156px;
  height: 60px;
  margin-left: 16px;
  color: ${({ btnState }) => `${btnState === 0 ? 'black' : 'white'}`};
  background-color: ${({ btnState }) => `${btnState === 0 ? 'var(--gray5)' : 'var(--primary2-400)'}`};
  font-family: var(--button-font-family);
  font-size: var(--button_Large-font-size);
  font-weight: var(--button_Large-font-weight);
  line-height: var(--button_Large-line-height);
  letter-spacing: var(--button_Large-letter-spacing);
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;
