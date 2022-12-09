import React, { useState } from 'react';
import styled from 'styled-components';
import NoneState from './sources/none_circle.png';
import OnState from './sources/on_circle.png';
import NoneImg from './sources/none_img.png';
import OnImg from './sources/on_img.png';
import imageCompression from 'browser-image-compression';
import { useRecoilState, useRecoilValue } from 'recoil';
import { nfsData, nfsImgState, nfsImgData, nfsrPath } from '../../store/store';

export default function NewFootStepSecurity() {
  const [nfscData, setNfscData] = useRecoilState(nfsData);
  const [nfscImgState, setNfscImgState] = useRecoilState(nfsImgState);
  const [nfscImgData, setNfscImgData] = useRecoilState(nfsImgData);
  const SecurityState = useRecoilValue(nfsrPath);

  const onCheckStateChange = (name) => {
    if (name === 'securitywindow' && nfscData.securityWindow === false) {
      setNfscData({ ...nfscData, securityWindow: true });
    }
    if (name === 'securitywindow' && nfscData.securityWindow === true) {
      setNfscData({ ...nfscData, securityWindow: false });
    }
    if (name === 'noise' && nfscData.noise === false) {
      setNfscData({ ...nfscData, noise: true });
    }
    if (name === 'noise' && nfscData.noise === true) {
      setNfscData({ ...nfscData, noise: false });
    }
    if (name === 'loan' && nfscData.loan === false) {
      setNfscData({ ...nfscData, loan: true });
    }
    if (name === 'loan' && nfscData.loan === true) {
      setNfscData({ ...nfscData, loan: false });
    }
    if (name === 'cctv' && nfscData.cctv === false) {
      setNfscData({ ...nfscData, cctv: true });
    }
    if (name === 'cctv' && nfscData.cctv === true) {
      setNfscData({ ...nfscData, cctv: false });
    }
  };

  const onFileUpdate = async (e, name) => {
    if (name === 'securitywindow' && nfscImgState.securityWindow === false) {
      await onImgCompress(e.target.files[0]);
      setNfscImgState({ ...nfscImgState, securityWindow: true });
    }
    if (name === 'noise' && nfscImgState.noise === false) {
      await onImgCompress(e.target.files[0]);
      setNfscImgState({ ...nfscImgState, noise: true });
    }
    if (name === 'loan' && nfscImgState.loan === false) {
      await onImgCompress(e.target.files[0]);
      setNfscImgState({ ...nfscImgState, loan: true });
    }
    if (name === 'cctv' && nfscImgState.cctv === false) {
      await onImgCompress(e.target.files[0]);
      setNfscImgState({ ...nfscImgState, cctv: true });
    }
  };

  const onImgCompress = async (file) => {
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 360,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        const base64data = reader.result;
        onHandlingDataForm(base64data);
      };
    } catch (error) {}
    const onHandlingDataForm = async (dataURI) => {
      const byteString = atob(dataURI.split(',')[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ia], {
        type: 'image/jpeg',
      });

      const file = new File([blob], 'image.jpg');
      setNfscImgData([...nfscImgData, file]);
    };
  };

  return (
    <>
      {SecurityState.security === true ? (
        <Container>
          <ContentBox1>
            <CheckBox>
              {nfscData.securityWindow === false ? (
                <CheckImg
                  src={NoneState}
                  onClick={() => {
                    onCheckStateChange('securitywindow');
                  }}
                />
              ) : (
                <CheckImg
                  src={OnState}
                  onClick={() => {
                    onCheckStateChange('securitywindow');
                  }}
                />
              )}
              <CheckTextBox>
                <CheckTextHeadline>방범창 설치되어 있음</CheckTextHeadline>
                <CheckTextNav>방범창이 안전하게 설치되어 있나요?</CheckTextNav>
              </CheckTextBox>
            </CheckBox>
            <ImgStateInput id="SecurityWindowImg" type="file" onChange={(event) => onFileUpdate(event, 'securitywindow')} />
            <ImgStateLabel htmlFor="SecurityWindowImg">{nfscImgState.securityWindow === false ? <ImgState src={NoneImg} /> : <ImgState src={OnImg} />}</ImgStateLabel>
          </ContentBox1>
          <ContentBox2>
            <CheckBox>
              {nfscData.noise === false ? (
                <CheckImg
                  src={NoneState}
                  onClick={() => {
                    onCheckStateChange('noise');
                  }}
                />
              ) : (
                <CheckImg
                  src={OnState}
                  onClick={() => {
                    onCheckStateChange('noise');
                  }}
                />
              )}
              <CheckTextBox>
                <CheckTextHeadline>방음 안됨</CheckTextHeadline>
                <CheckTextNav>이웃집 간 소리가 들리진 않나요?</CheckTextNav>
              </CheckTextBox>
            </CheckBox>
            <ImgStateInput id="NoiseImg" type="file" onChange={(event) => onFileUpdate(event, 'noise')} />
            <ImgStateLabel htmlFor="NoiseImg">{nfscImgState.noise === false ? <ImgState src={NoneImg} /> : <ImgState src={OnImg} />}</ImgStateLabel>
          </ContentBox2>
          <ContentBox2>
            <CheckBox>
              {nfscData.loan === false ? (
                <CheckImg
                  src={NoneState}
                  onClick={() => {
                    onCheckStateChange('loan');
                  }}
                />
              ) : (
                <CheckImg
                  src={OnState}
                  onClick={() => {
                    onCheckStateChange('loan');
                  }}
                />
              )}
              <CheckTextBox>
                <CheckTextHeadline>대출 가능함</CheckTextHeadline>
                <CheckTextNav>원하는 대출이 가능한 매물인가요?</CheckTextNav>
              </CheckTextBox>
            </CheckBox>
            <ImgStateInput id="LoanImg" type="file" onChange={(event) => onFileUpdate(event, 'loan')} />
            <ImgStateLabel htmlFor="LoanImg">{nfscImgState.loan === false ? <ImgState src={NoneImg} /> : <ImgState src={OnImg} />}</ImgStateLabel>
          </ContentBox2>
          <ContentBox3>
            <CheckBox>
              {nfscData.cctv === false ? (
                <CheckImg
                  src={NoneState}
                  onClick={() => {
                    onCheckStateChange('cctv');
                  }}
                />
              ) : (
                <CheckImg
                  src={OnState}
                  onClick={() => {
                    onCheckStateChange('cctv');
                  }}
                />
              )}
              <CheckTextBox>
                <CheckTextHeadline>CCTV, 중앙현관 있음</CheckTextHeadline>
                <CheckTextNav>방범 시설이 제대로 갖춰졌나요?</CheckTextNav>
              </CheckTextBox>
            </CheckBox>
            <ImgStateInput id="CctvImg" type="file" onChange={(event) => onFileUpdate(event, 'cctv')} />
            <ImgStateLabel htmlFor="CctvImg">{nfscImgState.cctv === false ? <ImgState src={NoneImg} /> : <ImgState src={OnImg} />}</ImgStateLabel>
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
  @media (max-width: 500px) {
    width: 95%;
  }
`;

const ContentBox2 = styled.div`
  width: 328px;
  height: 72px;
  margin-top: 16px;
  margin-left: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 500px) {
    width: 95%;
  }
`;

const ContentBox3 = styled.div`
  width: 328px;
  height: 72px;
  margin-top: 16px;
  margin-left: 16px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 500px) {
    width: 95%;
  }
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
