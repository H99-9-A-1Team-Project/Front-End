import React, { useState } from 'react';
import styled from 'styled-components';
import NoneState from './sources/none_circle.png';
import OnState from './sources/on_circle.png';
import NoneImg from './sources/none_img.png';
import OnImg from './sources/on_img.png';
import imageCompression from 'browser-image-compression';
import { useRecoilState, useRecoilValue } from 'recoil';
import { nfsData, nfsImgState, nfsImgData, nfsrPath } from '../../store/store';

export default function NewFootStepOption() {
  const [nfscData, setNfscData] = useRecoilState(nfsData);
  const [nfscImgState, setNfscImgState] = useRecoilState(nfsImgState);
  const [nfscImgData, setNfscImgData] = useRecoilState(nfsImgData);
  const OptionState = useRecoilValue(nfsrPath);

  const onCheckStateChange = (name) => {
    if (name === 'destroy' && nfscData.destroy === false) {
      setNfscData({ ...nfscData, destroy: true });
    }
    if (name === 'destroy' && nfscData.destroy === true) {
      setNfscData({ ...nfscData, destroy: false });
    }
    if (name === 'utiroom' && nfscData.utiRoom === false) {
      setNfscData({ ...nfscData, utiRoom: true });
    }
    if (name === 'utiroom' && nfscData.utiRoom === true) {
      setNfscData({ ...nfscData, utiRoom: false });
    }
  };

  const onFileUpdate = async (e, name) => {
    if (name === 'option' && nfscImgState.option === false) {
      await onImgCompress(e.target.files[0]);
      setNfscImgState({ ...nfscImgState, option: true });
    }
    if (name === 'destroy' && nfscImgState.destroy === false) {
      await onImgCompress(e.target.files[0]);
      setNfscImgState({ ...nfscImgState, destroy: true });
    }
    if (name === 'utiroom' && nfscImgState.utiRoom === false) {
      await onImgCompress(e.target.files[0]);
      setNfscImgState({ ...nfscImgState, utiRoom: true });
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
      console.log(compressedFile);
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        const base64data = reader.result;
        onHandlingDataForm(base64data);
      };
    } catch (error) {
      console.log(error);
    }
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
      console.log(nfscImgData);
    };
  };

  const onChangeData = (e) => {
    const { name, value } = e.target;
    setNfscData({ ...nfscData, [name]: value });
    console.log(nfscData);
  };

  return (
    <>
      {OptionState.option === true ? (
        <Container>
          <MemoHeadline>추가 메모</MemoHeadline>
          <MemoInputBox>
            <MemoInput placeholder="옵션의 상태는 어떤가요?" name="option" onChange={onChangeData} />
            <ImgStateInput2 id="OptionImg" type="file" onChange={(event) => onFileUpdate(event, 'option')} />
            <ImgStateLabel2 htmlFor="OptionImg">{nfscImgState.option === false ? <ImgState2 src={NoneImg} /> : <ImgState2 src={OnImg} />}</ImgStateLabel2>
          </MemoInputBox>
          <ContentBox1>
            <CheckBox>
              {nfscData.destroy === false ? (
                <CheckImg
                  src={NoneState}
                  onClick={() => {
                    onCheckStateChange('destroy');
                  }}
                />
              ) : (
                <CheckImg
                  src={OnState}
                  onClick={() => {
                    onCheckStateChange('destroy');
                  }}
                />
              )}
              <CheckTextBox>
                <CheckTextHeadline>파손된 가구 있음</CheckTextHeadline>
                <CheckTextNav>파손된 가구나 벽지가 있나요?</CheckTextNav>
              </CheckTextBox>
            </CheckBox>
            <ImgStateInput id="DestroyImg" type="file" onChange={(event) => onFileUpdate(event, 'destroy')} />
            <ImgStateLabel htmlFor="DestroyImg">{nfscImgState.destroy === false ? <ImgState src={NoneImg} /> : <ImgState src={OnImg} />}</ImgStateLabel>
          </ContentBox1>
          <ContentBox2>
            <CheckBox>
              {nfscData.utiRoom === false ? (
                <CheckImg
                  src={NoneState}
                  onClick={() => {
                    onCheckStateChange('utiroom');
                  }}
                />
              ) : (
                <CheckImg
                  src={OnState}
                  onClick={() => {
                    onCheckStateChange('utiroom');
                  }}
                />
              )}
              <CheckTextBox>
                <CheckTextHeadline>다용도실 있음</CheckTextHeadline>
                <CheckTextNav>다용도실의 활용도가 높은가요?</CheckTextNav>
              </CheckTextBox>
            </CheckBox>
            <ImgStateInput id="UtiroomImg" type="file" onChange={(event) => onFileUpdate(event, 'utiroom')} />
            <ImgStateLabel htmlFor="UtiroomImg">{nfscImgState.utiRoom === false ? <ImgState src={NoneImg} /> : <ImgState src={OnImg} />}</ImgStateLabel>
          </ContentBox2>
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
  margin-bottom: 32px;
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

const MemoHeadline = styled.div`
  margin-top: 24px;
  margin-left: 16px;
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
`;

const MemoInputBox = styled.div`
  width: 328px;
  height: 45.9px;
  margin-left: 16px;
  border: 1px solid var(--gray6);
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const MemoInput = styled.input`
  margin-left: 12px;
  width: 264px;
  height: 44px;
  border: none;
  outline: none;
  ::-webkit-input-placeholder {
    color: var(--gray4);
    font-family: var(--body-font-family);
    font-size: var(--body_Medium-font-size);
    font-weight: var(--body_Medium-font-weight);
    line-height: var(--body_Medium-line-height);
    letter-spacing: var(--body_Medium-letter-spacing);
  }
`;

const ImgStateInput2 = styled.input`
  display: none;
`;

const ImgState2 = styled.img``;

const ImgStateLabel2 = styled.label`
  margin-top: 10px;
  margin-right: 16px;
  width: 24px;
  height: 24px;
  display: block;
  cursor: pointer;
`;
