import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import slideImg1 from './sources/slide1.png';
import slideImg2 from './sources/Slide2.png';

export default function Article() {
  return (
    <Container>
      <Headline>
        로그인이 <br />
        필요한 기능이에요
      </Headline>

      <ImgSlide>
        <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <SlideImg src={slideImg1} />
          </SwiperSlide>
          <SwiperSlide>
            <SlideImg src={slideImg2} />
          </SwiperSlide>
        </Swiper>
      </ImgSlide>
    </Container>
  );
}

const Container = styled.div`
  width: 360px;
  height: 100%;
  margin-top: auto;
`;

const ImgSlide = styled.div``;

const Headline = styled.div`
  margin-top: 24px;
  margin-left: 16px;
  font-family: var(--headline-font-family);
  font-size: var(--headline_Large-font-size);
  font-weight: var(--headline_Large-font-weight);
  line-height: var(--headline_Large-line-height);
  letter-spacing: var(--headline_Large-letter-spacing);
  cursor: default;
`;

const SlideImg = styled.img`
  margin-top: 48px;
  width: 360px;
  height: 480px;
`;
