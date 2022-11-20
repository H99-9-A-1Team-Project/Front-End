import React, { useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Banner1 from './sources/main_banner_img1.png';
import Banner2 from './sources/banner2.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function MainPageBanner() {
  const slideRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();
  const [visible, setVisble] = useState(true);

  const onDragStart = (e) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + slideRef.current.scrollLeft);
    console.log('x', e.pageX);
    console.log('s', slideRef.current.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e) => {
    if (isDrag) {
      const { scrollWidth, clientWidth, scrollLeft } = slideRef.current;

      slideRef.current.scrollLeft = startX - e.pageX;

      if (scrollLeft === 0) {
        setStartX(e.pageX);
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft);
      }
    }
  };

  const throttle = (func, ms) => {
    let throttled = false;
    return (...args) => {
      if (!throttled) {
        throttled = true;
        setTimeout(() => {
          func(...args);
          throttled = false;
        }, ms);
      }
    };
  };
  const delay = 100;
  const onThrottleDragMove = throttle(onDragMove, delay);

  // const onClickE1 = (e) => {
  //   const x = e.nativeEvent.offsetX;
  //   console.log(e);
  //   console.log(x);
  //   setVisble(false);
  // };

  // const onClickE2 = (e) => {
  //   const x = e.nativeEvent.offsetX;
  //   console.log(e);
  //   console.log(x);
  //   setVisble(true);
  // };
  const [state, setState] = useState('paused');
  const click = () => {
    setState('running');
  };
  return (
    <BannerContainer>
      <BannerBox>
        {/* <div className="images" ref={slideRef} onMouseDown={onDragStart} onMouseMove={onThrottleDragMove} onMouseUp={onDragEnd} onMouseLeave={onDragEnd}>
          <BannerImg1 visible={visible} src={Banner1} />
          <BannerImg2 visible={visible} src={Banner2} />
        </div> */}
        <Swiper className="mysiwper">
          <SwiperSlide className="slide">
            <BannerImg1 visible={visible} src={Banner1} />
          </SwiperSlide>
          <SwiperSlide className="slide">
            <BannerImg2 visible={visible} src={Banner2} />
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
  /* display: ${(props) => (props.visible ? 'flex' : 'none')}; */
`;

const BannerImg2 = styled.img`
  width: 328px;
  height: 132px;
  background: none;
  cursor: pointer;
  /* display: ${(props) => (!props.visible ? 'flex' : 'none')}; */
`;
