import React, { useState } from 'react';
import styled from 'styled-components';
import NoneState from './sources/none_circle.png';
import OnState from './sources/on_circle.png';
import NoneImg from './sources/none_img.png';
import OnImg from './sources/on_img.png';
import imageCompression from 'browser-image-compression';
import { useRecoilState, useRecoilValue } from 'recoil';
import { nfsData, nfsImgState, nfsImgData, nfsrPath } from '../../store/store';

export default function NewFootStepConven() {
  const [nfscData, setNfscData] = useRecoilState(nfsData);
  const [nfscImgState, setNfscImgState] = useRecoilState(nfsImgState);
  const [nfscImgData, setNfscImgData] = useRecoilState(nfsImgData);
  const SecurityState = useRecoilValue(nfsrPath);

  const onCheckStateChange = (name) => {
    if (name === 'hill' && nfscData.hill === false) {
      setNfscData({ ...nfscData, hill: true });
    }
    if (name === 'hill' && nfscData.hill === true) {
      setNfscData({ ...nfscData, hill: false });
    }
    if (name === 'hospital' && nfscData.hospital === false) {
      setNfscData({ ...nfscData, hospital: true });
    }
    if (name === 'hospital' && nfscData.hospital === true) {
      setNfscData({ ...nfscData, hospital: false });
    }
    if (name === 'mart' && nfscData.mart === false) {
      setNfscData({ ...nfscData, mart: true });
    }
    if (name === 'mart' && nfscData.mart === true) {
      setNfscData({ ...nfscData, mart: false });
    }
    if (name === 'accessibility' && nfscData.accessibility === false) {
      setNfscData({ ...nfscData, accessibility: true });
    }
    if (name === 'accessibility' && nfscData.accessibility === true) {
      setNfscData({ ...nfscData, accessibility: false });
    }
    if (name === 'park' && nfscData.park === false) {
      setNfscData({ ...nfscData, park: true });
    }
    if (name === 'park' && nfscData.park === true) {
      setNfscData({ ...nfscData, park: false });
    }
  };

  const onFileUpdate = async (e, name) => {
    if (name === 'hill' && nfscImgState.hill === false) {
      setNfscImgData([...nfscImgData, e.target.files[0]]);
      setNfscImgState({ ...nfscImgState, hill: true });
    }
    if (name === 'mart' && nfscImgState.mart === false) {
      setNfscImgData([...nfscImgData, e.target.files[0]]);
      setNfscImgState({ ...nfscImgState, mart: true });
    }
    if (name === 'hospital' && nfscImgState.hospital === false) {
      setNfscImgData([...nfscImgData, e.target.files[0]]);
      setNfscImgState({ ...nfscImgState, hospital: true });
    }
    if (name === 'accessibility' && nfscImgState.accessibility === false) {
      setNfscImgData([...nfscImgData, e.target.files[0]]);
      setNfscImgState({ ...nfscImgState, accessibility: true });
    }
    if (name === 'park' && nfscImgState.park === false) {
      setNfscImgData([...nfscImgData, e.target.files[0]]);
      setNfscImgState({ ...nfscImgState, park: true });
    }
  };

  return (
    <>
      {SecurityState.conven === true ? (
        <Container>
          <ContentBox1>
            <CheckBox>
              {nfscData.hill === false ? (
                <CheckImg
                  src={NoneState}
                  onClick={() => {
                    onCheckStateChange('hill');
                  }}
                />
              ) : (
                <CheckImg
                  src={OnState}
                  onClick={() => {
                    onCheckStateChange('hill');
                  }}
                />
              )}
              <CheckTextBox>
                <CheckTextHeadline>언덕 높음</CheckTextHeadline>
                <CheckTextNav>언덕이 높은 곳에 매물이 있나요?</CheckTextNav>
              </CheckTextBox>
            </CheckBox>
            <ImgStateInput id="HillImg" type="file" onChange={(event) => onFileUpdate(event, 'hill')} />
            <ImgStateLabel htmlFor="HillImg">{nfscImgState.hill === false ? <ImgState src={NoneImg} /> : <ImgState src={OnImg} />}</ImgStateLabel>
          </ContentBox1>
          <ContentBox2>
            <CheckBox>
              {nfscData.mart === false ? (
                <CheckImg
                  src={NoneState}
                  onClick={() => {
                    onCheckStateChange('mart');
                  }}
                />
              ) : (
                <CheckImg
                  src={OnState}
                  onClick={() => {
                    onCheckStateChange('mart');
                  }}
                />
              )}
              <CheckTextBox>
                <CheckTextHeadline>편의점, 시장, 마트가 근처에 있음</CheckTextHeadline>
                <CheckTextNav>5분 내 거리에 있나요?</CheckTextNav>
              </CheckTextBox>
            </CheckBox>
            <ImgStateInput id="MartImg" type="file" onChange={(event) => onFileUpdate(event, 'mart')} />
            <ImgStateLabel htmlFor="MartImg">{nfscImgState.mart === false ? <ImgState src={NoneImg} /> : <ImgState src={OnImg} />}</ImgStateLabel>
          </ContentBox2>
          <ContentBox2>
            <CheckBox>
              {nfscData.hospital === false ? (
                <CheckImg
                  src={NoneState}
                  onClick={() => {
                    onCheckStateChange('hospital');
                  }}
                />
              ) : (
                <CheckImg
                  src={OnState}
                  onClick={() => {
                    onCheckStateChange('hospital');
                  }}
                />
              )}
              <CheckTextBox>
                <CheckTextHeadline>병원, 약국이 근처에 있음</CheckTextHeadline>
                <CheckTextNav>긴급 상황에 대처가 가능한 거리인가요?</CheckTextNav>
              </CheckTextBox>
            </CheckBox>
            <ImgStateInput id="HospitalImg" type="file" onChange={(event) => onFileUpdate(event, 'hospital')} />
            <ImgStateLabel htmlFor="HospitalImg">{nfscImgState.hospital === false ? <ImgState src={NoneImg} /> : <ImgState src={OnImg} />}</ImgStateLabel>
          </ContentBox2>
          <ContentBox2>
            <CheckBox>
              {nfscData.accessibility === false ? (
                <CheckImg
                  src={NoneState}
                  onClick={() => {
                    onCheckStateChange('accessibility');
                  }}
                />
              ) : (
                <CheckImg
                  src={OnState}
                  onClick={() => {
                    onCheckStateChange('accessibility');
                  }}
                />
              )}
              <CheckTextBox>
                <CheckTextHeadline>대중교통이 편리함</CheckTextHeadline>
                <CheckTextNav>역 또는 정류장이 근처에 있나요?</CheckTextNav>
              </CheckTextBox>
            </CheckBox>
            <ImgStateInput id="AccessibilityImg" type="file" onChange={(event) => onFileUpdate(event, 'accessibility')} />
            <ImgStateLabel htmlFor="AccessibilityImg">{nfscImgState.accessibility === false ? <ImgState src={NoneImg} /> : <ImgState src={OnImg} />}</ImgStateLabel>
          </ContentBox2>
          <ContentBox3>
            <CheckBox>
              {nfscData.park === false ? (
                <CheckImg
                  src={NoneState}
                  onClick={() => {
                    onCheckStateChange('park');
                  }}
                />
              ) : (
                <CheckImg
                  src={OnState}
                  onClick={() => {
                    onCheckStateChange('park');
                  }}
                />
              )}
              <CheckTextBox>
                <CheckTextHeadline>대중교통이 편리함</CheckTextHeadline>
                <CheckTextNav>역 또는 정류장이 근처에 있나요?</CheckTextNav>
              </CheckTextBox>
            </CheckBox>
            <ImgStateInput id="ParkImg" type="file" onChange={(event) => onFileUpdate(event, 'park')} />
            <ImgStateLabel htmlFor="ParkImg">{nfscImgState.park === false ? <ImgState src={NoneImg} /> : <ImgState src={OnImg} />}</ImgStateLabel>
          </ContentBox3>
        </Container>
      ) : null}
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ContentBox1 = styled.div`
  width: 328px;
  height: 72px;
  margin-top: 24px;
  margin-left: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ContentBox2 = styled.div`
  width: 328px;
  height: 72px;
  margin-top: 16px;
  margin-left: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ContentBox3 = styled.div`
  width: 328px;
  height: 72px;
  margin-top: 16px;
  margin-left: 16px;
  margin-bottom: 7px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CheckBox = styled.div`
  width: 232px;
  height: 40px;
  margin-top: 16px;
  margin-left: 6px;
  display: flex;
  flex-direction: row;
`;

const CheckImg = styled.img`
  margin-top: 8px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const ImgStateInput = styled.input`
  display: none;
`;

const ImgState = styled.img``;

const ImgStateLabel = styled.label`
  margin-top: 24px;
  margin-right: 6px;
  width: 24px;
  height: 24px;
  display: block;
  cursor: pointer;
`;

const CheckTextBox = styled.div`
  width: 196px;
  height: 40px;
  margin-left: 12px;
  display: flex;
  flex-direction: column;
`;

const CheckTextHeadline = styled.div`
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
  cursor: default;
`;

const CheckTextNav = styled.div`
  color: var(--gray4);
  font-family: var(--body-font-family);
  font-size: var(--body_Small-font-size);
  font-weight: var(--body_Small-font-weight);
  line-height: var(--body_Small-line-height);
  letter-spacing: var(--body_Small-letter-spacing);
  cursor: default;
`;
