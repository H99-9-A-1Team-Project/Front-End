import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import img1 from './sources/1.png';
import img2 from './sources/2.png';
import img3 from './sources/3.png';
import img4 from './sources/4.png';
export default function ImageList() {
  return (
    <Container>
      <Swiper className="mysiwper" autoplay={{ delay: 3000, disableOnInteraction: false }}>
        <SwiperSlide className="slide">
          <BannerImg src={img1} />
        </SwiperSlide>
        <SwiperSlide className="slide">
          <BannerImg src={img2} />
        </SwiperSlide>
        <SwiperSlide className="slide">
          <BannerImg src={img3} />
        </SwiperSlide>
        <SwiperSlide className="slide">
          <BannerImg src={img4} />
        </SwiperSlide>
      </Swiper>
    </Container>
  );
}

const Container = styled.div`
  width: 360px;
  margin-top: 20px;
  display: flex;
`;

const BannerImg = styled.img`
  width: 360px;
  height: 280px;
  background: none;
  cursor: pointer;
`;
