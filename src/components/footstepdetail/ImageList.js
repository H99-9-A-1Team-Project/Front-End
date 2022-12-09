import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import { ReadImgFootStep0, ReadImgFootStep1, ReadImgFootStep2, ReadImgFootStep3, ReadImgFootStep4, ReadImgFootStep5 } from '../../api/apiGET';
import 'swiper/css';
// import 'swiper/css/pagination';
import 'swiper/css/navigation';
export default function ImageList() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [swiperRef, setSwiperRef] = useState(null);
  const { data: FstImgData0 } = useQuery(['fstImgData0'], () => ReadImgFootStep0(id), {
    onSuccess: (response) => {
      console.log('0', response);
    },
    onError: (response) => {
      console.log(response);
    },
  });
  const { data: FstImgData1 } = useQuery(['fstImgData1'], () => ReadImgFootStep1(id), {
    onSuccess: (response) => {
      console.log('1', response);
    },
    onError: (response) => {
      console.log(response);
    },
  });
  const { data: FstImgData2 } = useQuery(['fstImgData2'], () => ReadImgFootStep2(id), {
    onSuccess: (response) => {
      console.log('2', response);
    },
    onError: (response) => {
      console.log(response);
    },
  });
  const { data: FstImgData3 } = useQuery(['fstImgData3'], () => ReadImgFootStep3(id), {
    onSuccess: (response) => {
      console.log('3', response);
    },
    onError: (response) => {
      console.log(response);
    },
  });
  const { data: FstImgData4 } = useQuery(['fstImgData4'], () => ReadImgFootStep4(id), {
    onSuccess: (response) => {
      console.log('4', response);
    },
    onError: (response) => {
      console.log(response);
    },
  });
  const { data: FstImgData5 } = useQuery(['fstImgData5'], () => ReadImgFootStep5(id), {
    onSuccess: (response) => {
      console.log('5', response);
    },
    onError: (response) => {
      console.log(response);
    },
  });

  return (
    <Container>
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={1}
        centeredSlides={true}
        spaceBetween={2}
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {FstImgData0?.map((data) => {
          return (
            <SwiperSlide>
              <BannerImg src={data.postImgUrl} />
            </SwiperSlide>
          );
        })}
        {FstImgData1?.map((data) => {
          return (
            <SwiperSlide>
              <BannerImg src={data.postImgUrl} />
            </SwiperSlide>
          );
        })}
        {FstImgData2?.map((data) => {
          return (
            <SwiperSlide>
              <BannerImg src={data.postImgUrl} />
            </SwiperSlide>
          );
        })}
        {FstImgData3?.map((data) => {
          return (
            <SwiperSlide>
              <BannerImg src={data.postImgUrl} />
            </SwiperSlide>
          );
        })}
        {FstImgData4?.map((data) => {
          return (
            <SwiperSlide>
              <BannerImg src={data.postImgUrl} />
            </SwiperSlide>
          );
        })}
        {FstImgData5?.map((data) => {
          return (
            <SwiperSlide>
              <BannerImg src={data.postImgUrl} />
            </SwiperSlide>
          );
        })}
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
  width: 355px;
  height: 280px;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;
