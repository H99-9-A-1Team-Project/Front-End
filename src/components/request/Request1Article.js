/* global kakao*/
import React, { useEffect } from 'react';
import styled from 'styled-components';
import '../../global/global.css';
import rq1search from './source/rq1search.png';
import { useState } from 'react';
import PopupPostCode from './PopupPostCode';
import { useRecoilState, useRecoilValue } from 'recoil';
import { requireAddress, rqInfo, rqDetailAddress, consultNumber, isLogin } from '../../store/store';
import { useNavigate } from 'react-router-dom';

export default function Request1Article() {
  const navigate = useNavigate();
  const requAddress = useRecoilValue(requireAddress);
  const [rq1Info, setRq1Info] = useRecoilState(rqInfo);
  const [rq1DetailAddress, setRq1DetailAddress] = useRecoilState(rqDetailAddress);
  const consultNum = useRecoilValue(consultNumber);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [btnState, setBtnState] = useState(0);
  let geocoder = new kakao.maps.services.Geocoder();
  const LoginState = useRecoilValue(isLogin);
  useEffect(() => {
    if (LoginState === false) {
      navigate('/mypage');
    }
  });
  useEffect(() => {
    if (requAddress === '도로명 주소 검색' || rq1DetailAddress === '') {
      setBtnState(0);
    } else if (requAddress !== '도로명 주소 검색' && rq1DetailAddress !== '') {
      setBtnState(1);
    }
  }, [requAddress, rq1DetailAddress]);

  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  const onChangeAddress = (e) => {
    const { name, value } = e.target;
    setRq1Info({ ...rq1Info, [name]: requAddress + ' ' + value });
    setRq1DetailAddress(value);
  };

  const onNextBtn = () => {
    if (btnState === 1) {
      geocoder.addressSearch(requAddress, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          let coords = new kakao.maps.LatLng(result[0].x, result[0].y);
          setRq1Info({ ...rq1Info, coordX: coords.La, coordY: coords.Ma });
        }
      });
      navigate('/request2');
    }
  };
  useEffect(() => {
    if (consultNum >= 2) {
      navigate('/request');
    }
  }, []);

  return (
    <Rq1ArticleContainer>
      <RoadAddressBox type="button" onClick={openPostCode}>
        <RoadAddressWrap>
          <RoadAddressP>{requAddress}</RoadAddressP>
          <SearchImg src={rq1search} />
        </RoadAddressWrap>
      </RoadAddressBox>
      <DetailHeadline>이하 상세주소</DetailHeadline>
      <DetailAddressBox>
        <PopDom id="popupDom">
          {isPopupOpen && (
            <popupDom>
              <PopupPostCode onClose={closePostCode} />
            </popupDom>
          )}
        </PopDom>
        <DetailAddressInput name="title" value={rq1DetailAddress} onChange={onChangeAddress} placeholder="동, 호수 등 상세 주소를 입력해주세요" />
      </DetailAddressBox>
      <NextBtn btnState={btnState} onClick={onNextBtn}>
        다음
      </NextBtn>
    </Rq1ArticleContainer>
  );
}

const Rq1ArticleContainer = styled.div`
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const RoadAddressBox = styled.div`
  width: 328px;
  height: 48px;
  background: none;
  cursor: pointer;
  margin-top: 32px;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const RoadAddressWrap = styled.div`
  width: 328px;
  height: 48px;
  box-shadow: var(--Shadow1-box-shadow);
  border: 1px solid var(--primary2-400);
  border-radius: 8px;
  margin-left: 16px;
  background-color: white;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  @media (max-width: 500px) {
    width: 92%;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
  }
`;

const RoadAddressP = styled.div`
  margin-left: 20px;
  height: 48px;
  display: flex;
  align-items: center;
  background: none;
  color: var(--gray4);
  font-family: var(--button-font-family);
  font-size: var(--button_Medium-font-size);
  font-weight: var(--button_Medium-font-weight);
  line-height: var(--button_Medium-line-height);
  letter-spacing: var(--button_Medium-letter-spacing);
  cursor: pointer;
`;

const SearchImg = styled.img`
  position: absolute;
  width: 24px;
  height: 24px;
  margin-left: 284px;
  margin-top: 12px;
  background: none;
  @media (max-width: 500px) {
    position: static;
    margin: 0;
    padding-right: 20px;
  }
`;

const DetailHeadline = styled.div`
  margin-top: 24px;
  margin-left: 16px;
  background: none;
  cursor: default;
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
`;

const DetailAddressBox = styled.div`
  width: 328px;
  height: 44px;
  background-color: white;
  border: 1px solid var(--gray6);
  border-radius: 8px;
  margin-left: 16px;
  @media (max-width: 500px) {
    width: 92%;
  }
`;

const DetailAddressInput = styled.input`
  width: 304px;
  height: 42px;
  background-color: white;
  border: none;
  margin-left: 12px;
  outline: none;
  ::-webkit-input-placeholder {
    font-family: var(--body-font-family);
    font-size: var(--body_Medium-font-size);
    font-weight: var(--body_Medium-font-weight);
    line-height: var(--body_Medium-line-height);
    letter-spacing: var(--body_Medium-letter-spacing);
    color: #2a224f;
  }
`;

const NextBtn = styled.div`
  width: 328px;
  height: 60px;
  margin-left: 16px;
  margin-top: auto;
  margin-bottom: 32px;
  color: ${({ btnState }) => `${btnState === 0 ? 'black' : 'white'}`};
  background-color: ${({ btnState }) => `${btnState === 0 ? 'var(--gray5)' : 'var(--primary2-400)'}`};
  border-radius: 8px;
  font-family: var(--button-font-family);
  font-size: var(--button_Large-font-size);
  font-weight: var(--button_Large-font-weight);
  line-height: var(--button_Large-line-height);
  letter-spacing: var(--button_Large-letter-spacing);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media (max-width: 500px) {
    width: 92%;
  }
`;

const PopDom = styled.div`
  position: absolute;
  z-index: 1;
`;
