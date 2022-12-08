import React, { useState } from 'react';
import styled from 'styled-components';
import NoneState from './sources/none_circle.png';
import OnState from './sources/on_circle.png';
import NoneImg from './sources/none_img.png';
import OnImg from './sources/on_img.png';
import imageCompression from 'browser-image-compression';
import { useRecoilState, useRecoilValue } from 'recoil';
import { nfsData, nfsImgState, nfsImgData, nfsrPath } from '../../store/store';

export default function NewFootStepSun() {
  const [nfscData, setNfscData] = useRecoilState(nfsData);
  const [nfscImgState, setNfscImgState] = useRecoilState(nfsImgState);
  const [nfscImgData, setNfscImgData] = useRecoilState(nfsImgData);
  const SunState = useRecoilValue(nfsrPath);

  console.log(nfscImgData);
  console.log(nfscData);
  const onCheckStateChange = (name) => {
    if (name === 'sun' && nfscData.sun === false) {
      setNfscData({ ...nfscData, sun: true });
    }
    if (name === 'sun' && nfscData.sun === true) {
      setNfscData({ ...nfscData, sun: false });
    }
    if (name === 'mold' && nfscData.mold === false) {
      setNfscData({ ...nfscData, mold: true });
    }
    if (name === 'mold' && nfscData.mold === true) {
      setNfscData({ ...nfscData, mold: false });
    }
    if (name === 'vent' && nfscData.vent === false) {
      setNfscData({ ...nfscData, vent: true });
    }
    if (name === 'vent' && nfscData.vent === true) {
      setNfscData({ ...nfscData, vent: false });
    }
    if (name === 'water' && nfscData.water === false) {
      setNfscData({ ...nfscData, water: true });
    }
    if (name === 'water' && nfscData.water === true) {
      setNfscData({ ...nfscData, water: false });
    }
    if (name === 'ventil' && nfscData.ventil === false) {
      setNfscData({ ...nfscData, ventil: true });
    }
    if (name === 'ventil' && nfscData.ventil === true) {
      setNfscData({ ...nfscData, ventil: false });
    }
    if (name === 'drain' && nfscData.drain === false) {
      setNfscData({ ...nfscData, drain: true });
    }
    if (name === 'drain' && nfscData.drain === true) {
      setNfscData({ ...nfscData, drain: false });
    }
    if (name === 'draft' && nfscData.draft === false) {
      setNfscData({ ...nfscData, draft: true });
    }
    if (name === 'draft' && nfscData.draft === true) {
      setNfscData({ ...nfscData, draft: false });
    }
  };

  const onFileUpdate = async (e, name) => {
    if (name === 'sun' && nfscImgState.sun === false) {
      await onImgCompress(e.target.files[0]);
      setNfscImgState({ ...nfscImgState, sun: true });
    }
    if (name === 'mold' && nfscImgState.mold === false) {
      await onImgCompress(e.target.files[0]);
      setNfscImgState({ ...nfscImgState, mold: true });
    }
    if (name === 'vent' && nfscImgState.vent === false) {
      await onImgCompress(e.target.files[0]);
      setNfscImgState({ ...nfscImgState, vent: true });
    }
    if (name === 'water' && nfscImgState.water === false) {
      await onImgCompress(e.target.files[0]);
      setNfscImgState({ ...nfscImgState, water: true });
    }
    if (name === 'ventil' && nfscImgState.ventil === false) {
      await onImgCompress(e.target.files[0]);
      setNfscImgState({ ...nfscImgState, ventil: true });
    }
    if (name === 'drain' && nfscImgState.drain === false) {
      await onImgCompress(e.target.files[0]);
      setNfscImgState({ ...nfscImgState, drain: true });
    }
    if (name === 'draft' && nfscImgState.draft === false) {
      await onImgCompress(e.target.files[0]);
      setNfscImgState({ ...nfscImgState, draft: true });
    }
    if (name === 'extramemo' && nfscImgState.extramemo === false) {
      await onImgCompress(e.target.files[0]);
      setNfscImgState({ ...nfscImgState, extramemo: true });
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
      {SunState.sun === true ? (
        <Container>
          <ContentBox1>
            <CheckBox>
              {nfscData.sun === false ? (
                <CheckImg
                  src={NoneState}
                  onClick={() => {
                    onCheckStateChange('sun');
                  }}
                />
              ) : (
                <CheckImg
                  src={OnState}
                  onClick={() => {
                    onCheckStateChange('sun');
                  }}
                />
              )}
              <CheckTextBox>
                <CheckTextHeadline>채광 잘 듦</CheckTextHeadline>
                <CheckTextNav>창문을 열었을 때 햇빛이 잘 들어오나요?</CheckTextNav>
              </CheckTextBox>
            </CheckBox>
            <ImgStateInput id="SunImg" name="sun" type="file" onChange={(event) => onFileUpdate(event, 'sun')} />
            <ImgStateLabel htmlFor="SunImg">{nfscImgState.sun === false ? <ImgState src={NoneImg} /> : <ImgState src={OnImg} />}</ImgStateLabel>
          </ContentBox1>

          <ContentBox2>
            <CheckBox>
              {nfscData.mold === false ? (
                <CheckImg
                  src={NoneState}
                  onClick={() => {
                    onCheckStateChange('mold');
                  }}
                />
              ) : (
                <CheckImg
                  src={OnState}
                  onClick={() => {
                    onCheckStateChange('mold');
                  }}
                />
              )}
              <CheckTextBox>
                <CheckTextHeadline>곰팡이 있음</CheckTextHeadline>
                <CheckTextNav>가구 뒷편, 구석에 곰팡이가 있나요?</CheckTextNav>
              </CheckTextBox>
            </CheckBox>
            <ImgStateInput id="MoldImg" type="file" onChange={(event) => onFileUpdate(event, 'mold')} />
            <ImgStateLabel htmlFor="MoldImg">{nfscImgState.mold === false ? <ImgState src={NoneImg} /> : <ImgState src={OnImg} />}</ImgStateLabel>
          </ContentBox2>
          <ContentBox2>
            <CheckBox>
              {nfscData.vent === false ? (
                <CheckImg
                  src={NoneState}
                  onClick={() => {
                    onCheckStateChange('vent');
                  }}
                />
              ) : (
                <CheckImg
                  src={OnState}
                  onClick={() => {
                    onCheckStateChange('vent');
                  }}
                />
              )}
              <CheckTextBox>
                <CheckTextHeadline>습도가 높음</CheckTextHeadline>
                <CheckTextNav>집이 눅눅하진 않은가요?</CheckTextNav>
              </CheckTextBox>
            </CheckBox>
            <ImgStateInput id="VentImg" type="file" onChange={(event) => onFileUpdate(event, 'vent')} />
            <ImgStateLabel htmlFor="VentImg">{nfscImgState.vent === false ? <ImgState src={NoneImg} /> : <ImgState src={OnImg} />}</ImgStateLabel>
          </ContentBox2>
          <ContentBox2>
            <CheckBox>
              {nfscData.water === false ? (
                <CheckImg
                  src={NoneState}
                  onClick={() => {
                    onCheckStateChange('water');
                  }}
                />
              ) : (
                <CheckImg
                  src={OnState}
                  onClick={() => {
                    onCheckStateChange('water');
                  }}
                />
              )}
              <CheckTextBox>
                <CheckTextHeadline>물 잘 나옴</CheckTextHeadline>
                <CheckTextNav>수도를 동시에 틀었을 때도 잘 나오나요?</CheckTextNav>
              </CheckTextBox>
            </CheckBox>
            <ImgStateInput id="WaterImg" type="file" onChange={(event) => onFileUpdate(event, 'water')} />
            <ImgStateLabel htmlFor="WaterImg">{nfscImgState.water === false ? <ImgState src={NoneImg} /> : <ImgState src={OnImg} />}</ImgStateLabel>
          </ContentBox2>
          <ContentBox2>
            <CheckBox>
              {nfscData.ventil === false ? (
                <CheckImg
                  src={NoneState}
                  onClick={() => {
                    onCheckStateChange('ventil');
                  }}
                />
              ) : (
                <CheckImg
                  src={OnState}
                  onClick={() => {
                    onCheckStateChange('ventil');
                  }}
                />
              )}
              <CheckTextBox>
                <CheckTextHeadline>배수 잘 됨</CheckTextHeadline>
                <CheckTextNav>세면대, 싱크대 등 배수가 잘 되나요?</CheckTextNav>
              </CheckTextBox>
            </CheckBox>
            <ImgStateInput id="VentilImg" type="file" onChange={(event) => onFileUpdate(event, 'ventil')} />
            <ImgStateLabel htmlFor="VentilImg">{nfscImgState.ventil === false ? <ImgState src={NoneImg} /> : <ImgState src={OnImg} />}</ImgStateLabel>
          </ContentBox2>
          <ContentBox2>
            <CheckBox>
              {nfscData.drain === false ? (
                <CheckImg
                  src={NoneState}
                  onClick={() => {
                    onCheckStateChange('drain');
                  }}
                />
              ) : (
                <CheckImg
                  src={OnState}
                  onClick={() => {
                    onCheckStateChange('drain');
                  }}
                />
              )}
              <CheckTextBox>
                <CheckTextHeadline>외풍 있음</CheckTextHeadline>
                <CheckTextNav>문을 닫아도 바람이 들어오나요?</CheckTextNav>
              </CheckTextBox>
            </CheckBox>
            <ImgStateInput id="DrainImg" type="file" onChange={(event) => onFileUpdate(event, 'drain')} />
            <ImgStateLabel htmlFor="DrainImg">{nfscImgState.drain === false ? <ImgState src={NoneImg} /> : <ImgState src={OnImg} />}</ImgStateLabel>
          </ContentBox2>
          <ContentBox2>
            <CheckBox>
              {nfscData.draft === false ? (
                <CheckImg
                  src={NoneState}
                  onClick={() => {
                    onCheckStateChange('draft');
                  }}
                />
              ) : (
                <CheckImg
                  src={OnState}
                  onClick={() => {
                    onCheckStateChange('draft');
                  }}
                />
              )}
              <CheckTextBox>
                <CheckTextHeadline>환기 잘 됨</CheckTextHeadline>
                <CheckTextNav>바람이 잘 통하나요?</CheckTextNav>
              </CheckTextBox>
            </CheckBox>
            <ImgStateInput id="DraftImg" type="file" onChange={(event) => onFileUpdate(event, 'draft')} />
            <ImgStateLabel htmlFor="DraftImg">{nfscImgState.draft === false ? <ImgState src={NoneImg} /> : <ImgState src={OnImg} />}</ImgStateLabel>
          </ContentBox2>
          <MemoHeadline>추가 메모</MemoHeadline>
          <MemoInputBox>
            <MemoInput placeholder="매물의 특이사항을 입력해주세요" name="extraMemo" onChange={onChangeData} />
            <ImgStateInput2 id="ExtraMemoImg" type="file" onChange={(event) => onFileUpdate(event, 'extramemo')} />
            <ImgStateLabel2 htmlFor="ExtraMemoImg">{nfscImgState.extramemo === false ? <ImgState2 src={NoneImg} /> : <ImgState2 src={OnImg} />}</ImgStateLabel2>
          </MemoInputBox>
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
  margin-top: 16px;
  margin-left: 16px;
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
`;

const MemoInputBox = styled.div`
  width: 328px;
  height: 45.8px;
  margin-left: 16px;
  margin-bottom: 32px;
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
