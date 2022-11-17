import React from 'react';
import styled from 'styled-components';
import Path from './source/rqhPath.png';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { rqInfo, requireAddress, rqDetailAddress } from '../../store/store';

export default function RequestHeader() {
  const navigate = useNavigate();
  const [rqhInfo, setRqhInfo] = useRecoilState(rqInfo);
  const [rqhAddress, setRqhAddress] = useRecoilState(requireAddress);
  const [rqhDetailAddress, setRqhDetailAddress] = useRecoilState(rqDetailAddress);
  const onBack = () => {
    setRqhInfo({ title: '', coordX: '', coordY: '', check1: 0, check2: 0, check3: 0, check4: 0, check5: 0, check6: 0, consultMessage: '' });
    setRqhAddress('도로명 주소 검색');
    setRqhDetailAddress('');
    navigate('/request');
  };
  return (
    <HeaderContainer>
      <HeaderPath
        src={Path}
        onClick={() => {
          onBack();
        }}
      />
      <HeaderP>상담 신청하기</HeaderP>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  height: 64px;
  background: none;
  display: flex;
`;

const HeaderPath = styled.img`
  width: 24px;
  height: 24px;
  margin-top: 20px;
  margin-left: 16px;
  background: none;
  cursor: pointer;
`;

const HeaderP = styled.p`
  background: none;
  margin-left: 8px;
  margin-top: 22px;
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
  cursor: default;
`;
