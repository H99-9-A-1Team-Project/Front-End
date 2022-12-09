import React from 'react';
import styled from 'styled-components';
import Banner1 from './sources/main_banner_img1.png';
import Banner2 from './sources/banner2.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
SwiperCore.use([Navigation, Pagination, Autoplay]);

export default function MainPageBanner() {
  const onLinkto = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLScBo334v9MmxoFzl_xJ74m51UTAuU_rVoAfheLlNXFZK_iCJA/viewform');
  };
  return (
    <BannerContainer>
      <BannerBox>
        <Swiper className="mysiwper" autoplay={{ delay: 3000, disableOnInteraction: false }}>
          <SwiperSlide className="slide">
            <BannerImg1 src={Banner1} />
          </SwiperSlide>
          <SwiperSlide className="slide">
            <BannerImg2
              src={Banner2}
              onClick={() => {
                onLinkto();
              }}
            />
          </SwiperSlide>
        </Swiper>
      </BannerBox>
    </BannerContainer>
  );
}

const BannerContainer = styled.div`
  width: 100%;
  height: 204px;
  background-color: white;
  display: flex;
`;

const BannerBox = styled.div`
  margin-top: 32px;
  margin-left: 16px;
  background-color: white;
  width: 328px;
  height: 132px;
  @media (max-width: 500px) {
    margin-left: 0;
    box-sizing: border-box;
    padding: 0 16px 0 16px;
    width: 100%;
  }
  .images {
    width: 328px;
    margin: 0px;
    padding: 0px;
    background-color: white;
    display: flex;
    overflow-x: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  .mysiwper {
    background-color: white;
  }
  .swiper-slide {
    background-color: white;
  }
`;

const BannerImg1 = styled.img`
  width: 328px;
  height: 132px;
  background: none;
  cursor: pointer;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const BannerImg2 = styled.img`
  width: 328px;
  height: 132px;
  background: none;
  cursor: pointer;
  @media (max-width: 500px) {
    width: 100%;
  }
`;
