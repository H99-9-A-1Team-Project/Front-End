import React from 'react';
import styled from 'styled-components';
import '../../global/global.css';
import PopupPostCode from './PopupPostCode';
import nfsSearchImg from './sources/searchIcon.png';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { nfsData, nfsRoadAddress, nfsDetailAddress, nfsRoadEssentialState, nfsDetailEssentialState } from '../../store/store';

export default function NewFootStepAddress() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const nfscRoadAddress = useRecoilValue(nfsRoadAddress);
  const [nfscDetailAddress, setNfscDetailAddress] = useRecoilState(nfsDetailAddress);
  const [nfscData, setNfscData] = useRecoilState(nfsData);
  const nfsRoadEsscential = useRecoilValue(nfsRoadEssentialState);
  const nfsDetailEsscential = useRecoilValue(nfsDetailEssentialState);

  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  const onChangeAddress = (e) => {
    const { name, value } = e.target;
    // setNfscData({ ...nfscData, post: { ...nfscData.post, [name]: nfscRoadAddress + ' ' + value } });
    setNfscData({ ...nfscData, [name]: nfscRoadAddress + ' ' + value });
    setNfscDetailAddress(value);
  };

  return (
    <Container>
      <HeadlineBox>
        <Headline>매물 주소</Headline>
        <HeadlineNav nfsDetailEsscential={nfsDetailEsscential}>필수</HeadlineNav>
      </HeadlineBox>
      <RoadAddressBox type="button" onClick={openPostCode}>
        <RoadAddressWrap nfsRoadEsscential={nfsRoadEsscential}>
          <RoadAddressP>{nfscRoadAddress}</RoadAddressP>
          <SearchImg src={nfsSearchImg} />
        </RoadAddressWrap>
      </RoadAddressBox>
      <DetailHeadline>이하 상세주소</DetailHeadline>
      <DetailAddressBox nfsDetailEsscential={nfsDetailEsscential}>
        <PopDom id="popupDom">
          {isPopupOpen && (
            <popupDom>
              <PopupPostCode onClose={closePostCode} />
            </popupDom>
          )}
        </PopDom>
        <DetailAddressInput name="title" value={nfscDetailAddress} onChange={onChangeAddress} placeholder="동, 호수 등 상세 주소를 입력해주세요" />
      </DetailAddressBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 204px;
  margin-top: 64px;
  @media (max-width: 500px) {
    margin: 0;
  }
`;

const HeadlineBox = styled.div`
  height: 28px;
  margin-top: 24px;
  display: flex;
  flex-direction: row;
`;

const Headline = styled.div`
  color: black;
  margin-left: 19px;
  font-family: var(--headline-font-family);
  font-size: var(--headline_Large-font-size);
  font-weight: var(--headline_Large-font-weight);
  line-height: var(--headline_Large-line-height);
  letter-spacing: var(--headline_Large-letter-spacing);
  cursor: default;
`;

const HeadlineNav = styled.div`
  margin-left: 8px;
  margin-top: 5.5px;
  color: ${({ nfsDetailEsscential }) => `${nfsDetailEsscential === false ? 'var(--primary1-500);' : '#f0766e'}`};
  font-family: var(--body-font-family);
  font-size: var(--body_Small-font-size);
  font-weight: var(--body_Small-font-weight);
  line-height: var(--body_Small-line-height);
  letter-spacing: var(--body_Small-letter-spacing);
  cursor: default;
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
  border: ${({ nfsRoadEsscential }) => `${nfsRoadEsscential === false ? '1px solid var(--primary1-400);' : '1px solid #f0766e'}`};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 8px;
  margin-left: 16px;
  background-color: white;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  @media (max-width: 500px) {
    width: 92%;
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
  width: 24px;
  height: 24px;
  margin-right: 20px;
  margin-top: 12px;
  background: none;
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
  height: 45.5px;
  background-color: white;
  border: ${({ nfsDetailEsscential }) => `${nfsDetailEsscential === false ? '1px solid var(--gray6);' : '1px solid #f0766e'}`};
  border-radius: 8px;
  margin-left: 16px;
  @media (max-width: 500px) {
    width: 92%;
  }
`;

const DetailAddressInput = styled.input`
  width: 304px;
  height: 44px;
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
    color: var(--gray4);
  }
`;

const PopDom = styled.div`
  position: absolute;
  z-index: 1;
`;
