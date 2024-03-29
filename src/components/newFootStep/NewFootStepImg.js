import React, { useState } from 'react';
import styled from 'styled-components';
import imgCreate from './sources/imgcreate.png';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { nfsPreviewImgData, nfsImgData, nfsImgEssentialState } from '../../store/store';
import imageCompression from 'browser-image-compression';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper';
import './carousel.css';

export default function NewFootStepImg() {
  const [perView, setPerview] = useState(0);
  const [between, setBetween] = useState(0);
  const nfsImgEssential = useRecoilValue(nfsImgEssentialState);
  const [nfscPreviewImgData, setNfscPreviewImgData] = useRecoilState(nfsPreviewImgData);
  const [nfscImgData, setNfscImgData] = useRecoilState(nfsImgData);

  const [count, setCount] = useState(0);
  const onFileUpdate = async (e) => {
    if (count < 10) {
      await onImgCompress(e.target.files[0]);
      setCount(count + 1);
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
        setNfscPreviewImgData([...nfscPreviewImgData, base64data]);
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
  useEffect(() => {
    if (window.innerWidth > 500) {
      setPerview(2);
      setBetween(-40);
    }
    if (window.innerWidth <= 500) {
      setPerview(3.2);
      setBetween(10);
    }
  }, []);
  return (
    <Container>
      <HeadlineBox>
        <Headline>매물 사진</Headline>
        <HeadlineNav nfsImgEssential={nfsImgEssential}>필수</HeadlineNav>
      </HeadlineBox>
      <NavBox>
        <Nav>최대 10개까지 등록이 가능해요</Nav>
        <CountImg>{count}/10</CountImg>
      </NavBox>
      <ImgBox>
        <CarouselWrap>
          <Swiper
            slidesPerView={perView}
            spaceBetween={between}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
          >
            <CarouselLi>
              <SwiperSlide>
                <ImgCreateInput id="imgCreate" type="file" onChange={onFileUpdate} />
                <ImgCreateLabel htmlFor="imgCreate">
                  <CreateCarosulItem nfsImgEssential={nfsImgEssential} src={imgCreate} />
                </ImgCreateLabel>
              </SwiperSlide>
            </CarouselLi>
            {nfscPreviewImgData?.map((data) => {
              return (
                <SwiperSlide>
                  <CarosulItem src={data} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </CarouselWrap>
      </ImgBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 225px;
`;

const HeadlineBox = styled.div`
  height: 28px;
  margin-top: 32px;
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
  color: ${({ nfsImgEssential }) => `${nfsImgEssential === false ? 'var(--primary1-500);' : '#f0766e'}`};
  font-family: var(--body-font-family);
  font-size: var(--body_Small-font-size);
  font-weight: var(--body_Small-font-weight);
  line-height: var(--body_Small-line-height);
  letter-spacing: var(--body_Small-letter-spacing);
  cursor: default;
`;

const NavBox = styled.div`
  margin-left: 16px;
  margin-top: 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Nav = styled.div`
  color: #9b9b9b;
  font-family: var(--body-font-family);
  font-size: var(--body_Small-font-size);
  font-weight: var(--body_Small-font-weight);
  line-height: var(--body_Small-line-height);
  letter-spacing: var(--body_Small-letter-spacing);
  cursor: default;
`;

const CountImg = styled.div`
  color: #9b9b9b;
  margin-right: 17px;
  font-family: var(--body-font-family);
  font-size: var(--body_Small-font-size);
  font-weight: var(--body_Small-font-weight);
  line-height: var(--body_Small-line-height);
  letter-spacing: var(--body_Small-letter-spacing);
  cursor: default;
`;

const ImgBox = styled.div`
  margin-top: 16px;
  margin-left: 16px;
`;

const ImgCreateLabel = styled.label`
  width: 128px;
  height: 128px;
  background-color: none;
  cursor: pointer;
`;

const ImgCreateInput = styled.input`
  width: 128px;
  height: 128px;
  cursor: pointer;
  display: none;
`;

const CarouselWrap = styled.div`
  position: relative;
  width: 330px;
  height: 130px;
  margin-bottom: 32px;
  overflow: hidden;
  z-index: 0;
  @media (max-width: 500px) {
    width: 95%;
  }
`;

const CarouselLi = styled.li`
  width: 308px;
  height: 120px;
  list-style: none;
  user-select: none;
  padding-right: 20px;
  @media (max-width: 500px) {
    width: 92%;
    padding-right: 0px;
  }
`;

const CreateCarosulItem = styled.img`
  width: 128px;
  height: 128px;
  -webkit-user-drag: none;
  border: ${({ nfsImgEssential }) => `${nfsImgEssential === false ? 'none' : '1px solid #f0766e'}`};
`;

const CarosulItem = styled.img`
  width: 128px;
  height: 128px;
  border-radius: 8px;
  -webkit-user-drag: none;
`;
