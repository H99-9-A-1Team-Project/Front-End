import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import '../../global/global.css';
import { useNavigate } from 'react-router-dom';
import { rqInfo } from '../../store/store';
import { useRecoilState } from 'recoil';

export default function Request3Article() {
  const navigate = useNavigate();
  const [rq3Info, setRq3Info] = useRecoilState(rqInfo);
  const [placeMsg, setPlaceMsg] = useState('');
  useEffect(() => {
    if (rq3Info.consultMessage === '') {
      setPlaceMsg('더 궁금한 것들, 혹은 알고싶었던 것들이 있다면 입력해주세요.');
    }
  }, [rq3Info]);

  const onChangeMsg = (e) => {
    const { name, value } = e.target;
    setRq3Info({ ...rq3Info, [name]: value });
    console.log(rq3Info);
  };

  const onNextBtn = () => {
    if (rq3Info.consultMessage === '') {
      setRq3Info({ ...rq3Info, consultMessage: '없음' });
    }
    navigate('/requestcheck');
  };

  return (
    <Rq3Container>
      <CommentBox>
        <CommentArea name="consultMessage" onChange={onChangeMsg} placeholder={placeMsg} value={rq3Info.consultMessage} />
      </CommentBox>
      <BtnBox>
        <BackBtn
          onClick={() => {
            navigate('/request2');
          }}
        >
          이전
        </BackBtn>
        <NextBtn
          onClick={() => {
            onNextBtn();
          }}
        >
          다음
        </NextBtn>
      </BtnBox>
    </Rq3Container>
  );
}

const Rq3Container = styled.div`
  height: 100%;
  margin: 0;
  padding: 0;
  background: none;
`;

const CommentBox = styled.div`
  width: 328px;
  height: 158px;
  margin-left: 16px;
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid var(--gray6);
  border-radius: 8px;
`;

const CommentArea = styled.textarea`
  width: 304px;
  height: 126px;
  background-color: white;
  border: none;
  outline: none;
  resize: none;
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 16px;
  margin-top: 386px;
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
  color: white;
  background-color: var(--primary2-400);
  font-family: var(--button-font-family);
  font-size: var(--button_Large-font-size);
  font-weight: var(--button_Large-font-weight);
  line-height: var(--button_Large-line-height);
  letter-spacing: var(--button_Large-letter-spacing);
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;
