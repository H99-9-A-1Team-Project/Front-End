import React, { useState } from 'react';
import styled from 'styled-components';
import imgCreate from './sources/imgcreate.png';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { nfsPreviewImgData, nfsImgData } from '../../store/store';
import imageCompression from 'browser-image-compression';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper';
import './carousel.css';

export default function NewFootStepImg() {
  const [nfscPreviewImgData, setNfscPreviewImgData] = useRecoilState(nfsPreviewImgData);
  const [nfscImgData, setNfscImgData] = useRecoilState(nfsImgData);

  const [count, setCount] = useState(0);
  // useEffect(() => {
  //   //요소의 사이즈;
  //   const list = document.querySelector('.list');
  //   const listScrollWidth = list?.scrollWidth;
  //   const listClientWidth = list?.clientWidth;

  //   // 이벤트마다 갱신될 값
  //   let startX = 0;
  //   let nowX = 0;
  //   let endX = 0;
  //   let listX = 0;

  //   const onScrollStart = (e) => {
  //     startX = getClientX(e);
  //     window.addEventListener('mousemove', onScrollMove);
  //     window.addEventListener('touchmove', onScrollMove);
  //     window.addEventListener('mouseup', onScrollEnd);
  //     window.addEventListener('touchend', onScrollEnd);
  //   };
  //   const onScrollMove = (e) => {
  //     nowX = getClientX(e);
  //     setTranslateX(listX + nowX - startX);
  //   };
  //   const onScrollEnd = (e) => {
  //     endX = getClientX(e);
  //     listX = getTranslateX();
  //     if (listX > 0) {
  //       setTranslateX(0);
  //       list.style.transition = `all 0.3s ease`;
  //       listX = 0;
  //     } else if (listX < listClientWidth - listScrollWidth) {
  //       setTranslateX(listClientWidth - listScrollWidth);
  //       list.style.transition = `all 0.3s ease`;
  //       listX = listClientWidth - listScrollWidth;
  //     }

  //     window.removeEventListener('mousedown', onScrollStart);
  //     window.removeEventListener('touchstart', onScrollStart);
  //     window.removeEventListener('mousemove', onScrollMove);
  //     window.removeEventListener('touchmove', onScrollMove);
  //     window.removeEventListener('mouseup', onScrollEnd);
  //     window.removeEventListener('touchend', onScrollEnd);
  //     window.removeEventListener('click', onClick);

  //     setTimeout(() => {
  //       bindEvents();
  //       list.style.transition = '';
  //     }, 300);
  //   };
  //   const onClick = (e) => {
  //     if (startX - endX !== 0) {
  //       e.preventDefault();
  //     }
  //   };

  //   const getClientX = (e) => {
  //     const isToches = e.touches ? true : false;
  //     return isToches ? e.touches[0].clientX : e.clientX;
  //   };

  //   const getTranslateX = () => {
  //     return parseInt(getComputedStyle(list).transform.split(/[^\-0-9]+/g)[5]);
  //   };

  //   const setTranslateX = (x) => {
  //     list.style.transform = `translateX(${x}px)`;
  //   };

  //   const bindEvents = () => {
  //     list.addEventListener('mousedown', onScrollStart);
  //     list.addEventListener('touchstart', onScrollStart);
  //     list.addEventListener('click', onClick);
  //   };

  //   bindEvents();
  // }, [count]);

  const onFileUpdate = async (e) => {
    if (count < 10) {
      setNfscImgData([...nfscImgData, e.target.files[0]]);
      await onImgCompress(e.target.files[0]);
      setCount(count + 1);
      console.log('a', count);
    }
  };

  const onImgCompress = async (file) => {
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1200,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        const base64data = reader.result;
        console.log('com', base64data);
        setNfscPreviewImgData([...nfscPreviewImgData, base64data]);
        console.log(nfscPreviewImgData);
      };
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <HeadlineBox>
        <Headline>매물 사진</Headline>
        <HeadlineNav>필수</HeadlineNav>
      </HeadlineBox>
      <NavBox>
        <Nav>최대 10개까지 등록이 가능해요</Nav>
        <CountImg>{count}/10</CountImg>
      </NavBox>
      <ImgBox>
        <CarouselWrap>
          {/* <CarouselUl className="list">
            <CarouselLi className="item">
              <ImgCreateInput id="imgCreate" type="file" onChange={onFileUpdate} />
              <ImgCreateLabel htmlFor="imgCreate">
                <CarosulItem className="image" src={imgCreate} />
              </ImgCreateLabel>
            </CarouselLi>
            {nfscPreviewImgData?.map((data) => {
              return (
                <CarouselLi className="item">
                  <CarosulItem className="image" src={data} />
                </CarouselLi>
              );
            })}
          </CarouselUl> */}
          <Swiper
            slidesPerView={2}
            spaceBetween={-40}
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
                  <CarosulItem src={imgCreate} />
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
  color: var(--primary1-500);
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
  width: 330px;
  height: 120px;
  margin-bottom: 32px;
  overflow: hidden;
`;

// const CarouselUl = styled.ul`
//   width: 100%;
//   display: flex;
//   transform: translate(0, 0);
// `;

const CarouselLi = styled.li`
  width: 308px;
  height: 120px;
  list-style: none;
  user-select: none;
  padding-right: 20px;
`;

const CarosulItem = styled.img`
  width: 128px;
  height: 128px;
  -webkit-user-drag: none;
`;
