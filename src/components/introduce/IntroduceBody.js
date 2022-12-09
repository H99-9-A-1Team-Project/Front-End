import React from 'react';
import styled from 'styled-components';
import deco from './sources/information.png';
import service_info from './sources/service_info.png';
import service_info_phone_1 from './sources/service_info_phone_1.png';
import service_info_phone_2 from './sources/service_info_phone_2.png';
import service_info_phone_3 from './sources/service_info_phone_3.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode } from 'swiper';
import ButtonLage from '../../global/components/ButtonLage';

export default function IntroduceBody() {
  return (
    <StContainer>
      <div className="img_container">
        <img src={service_info} alt="service_info" />
      </div>
      <div className="information_container_1">
        <div className="infomation">집을 구할 때 힘들게 발품 팔아서 마음에 드는 집을 발견했어도, 덜컥 계약하기에는 따져봐야 할 것들이 정말 많죠. 신중하게 골라 오랫동안 살 내집. 등대지기로 어떤 도움을 받을 수 있을까요?</div>
      </div>
      <div className="information_container_2">
        <div className="infomation_title_1">첫 번째,</div>
        <div className="infomation_title_1">매물을 꼼꼼히 기록해보세요</div>
      </div>
      <div className="information_container_3">
        <Swiper slidesPerView={1.1} spaceBetween={0} freeMode={true} modules={[FreeMode]} className="swiper">
          <SwiperSlide className="slide">
            <div className="information_slide_1">
              <div className="information_slide_1_text_1">
                <div className="information_slide_1_text_1_1">발로뛰며 알아본 정보는</div>
                <div className="information_slide_1_text_1_1">잊어버리지 않게</div>
                <div className="information_slide_1_text_1_1">꼼꼼히 메모하고</div>
              </div>
              <div className="information_slide_1_img_1">
                <img src={service_info_phone_1} alt="phone_1" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="information_slide_2">
              <div className="information_slide_1_img_2">
                <img src={service_info_phone_2} alt="phone_2" />
              </div>
              <div className="information_slide_1_text_2">
                <div className="information_slide_1_text_1_1">내가 기록한 발품이</div>
                <div className="information_slide_1_text_1_1">어느 위치인지</div>
                <div className="information_slide_1_text_1_1">한 눈에 확인하세요</div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="information_container_2">
        <div className="infomation_title_1">두 번째,</div>
        <div className="infomation_title_1">공인중개사님께</div>
        <div className="infomation_title_1">1:1 매물 안전 상담을 받아보세요</div>
      </div>
      <div className="information_container_4">
        <img src={service_info_phone_3} alt="service_info_phone_3" />
      </div>
      <div className="information_container_5">
        <div className="infomation_title_1">인증된 공인중개사님이 고민에 맞게</div>
        <div className="infomation_title_1">
          직접 매물의
          <span> 등기부등본, 건축물대장</span>을 보고
        </div>
        <div className="infomation_title_1">안전매물인지 피드백해드려요</div>
      </div>
      <div className="information_container_6">
        <img src={deco} alt="deco" />
        <ButtonLage text={'지금 바로 상담 받아보기'} page={'/request1'} />
      </div>
    </StContainer>
  );
}

const StContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .img_container {
    width: 100%;
    height: 360px;
    background-color: var(--primary2-100);
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 322px;
      height: 322px;
    }
  }
  .information_container_1 {
    width: 100%;
    box-sizing: border-box;
    padding: 20px 16px 0 16px;
    margin-bottom: 60px;
    .infomation {
      font-family: var(--button-font-family);
      font-size: var(--body_Large-font-size);
      font-weight: var(--body_Large-font-weight);
      line-height: var(--body_Large-line-height);
      letter-spacing: var(--body_Large-letter-spacing);
    }
  }
  .information_container_2 {
    width: 100%;
    box-sizing: border-box;
    padding: 0 16px 0 16px;
    margin-bottom: 20px;
    .infomation_title_1 {
      font-family: var(--button-font-family);
      font-size: var(--headline_Medium-font-size);
      font-weight: var(--headline_Medium-font-weight);
      line-height: var(--headline_Medium-line-height);
      letter-spacing: var(--headline_Medium-letter-spacing);
    }
  }
  .information_container_3 {
    margin-bottom: 40px;
  }
  .swiper {
    width: 360px;
    height: 360px;
    @media (max-width: 500px) {
      width: 100%;
    }
    .information_slide_1_text_1,
    .information_slide_1_text_2 {
      font-family: var(--button-font-family);
      font-size: var(--body_Small-font-size);
      font-weight: var(--body_Small-font-weight);
      line-height: var(--body_Small-line-height);
      letter-spacing: var(--body_Small-letter-spacing);
    }
    .information_slide_1 {
      display: flex;
      flex-direction: row;
      .information_slide_1_text_1 {
        margin: 58px auto 0px 20px;
      }
      .information_slide_1_img_1 {
        img {
          width: 180px;
          height: 332px;
        }
      }
    }
    .information_slide_2 {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .information_slide_1_text_2 {
        margin: 156px 16px 0px 0px;
      }
      .information_slide_1_img_2 {
        img {
          width: 180px;
          height: 332px;
        }
      }
    }
  }
  .information_container_4 {
    width: 360px;
    height: 360px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media (max-width: 500px) {
      width: 100%;
    }
    img {
      width: 180px;
      height: 307px;
    }
  }
  .information_container_5 {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    div {
      font-family: var(--button-font-family);
      font-size: var(--body_Small-font-size);
      font-weight: var(--body_Small-font-weight);
      line-height: var(--body_Small-line-height);
      letter-spacing: var(--body_Small-letter-spacing);
    }
    span {
      font-weight: 700;
    }
  }
  .information_container_6 {
    margin-top: 68px;
    padding-bottom: 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 176px;
      height: 44px;
    }
  }
`;
