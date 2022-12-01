/*global kakao*/
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import '../../global/global.css';
import searchImg from './sources/Search.png';
import pathDown from './sources/path_down.png';
import pathUp from './sources/path_up.png';
import WriteIcon from './sources/write.png';
import { useQuery } from '@tanstack/react-query';
import { ReadImgFootStep, ReadPremisesList } from '../../api/apiGET';
import fstMarker from './sources/fstMarker.png';
import CaroselImages from './sources/caroselImage.png';
import CarouselMarker from './sources/carouselmarker.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper';

export default function FootstepMainArticle() {
  const navigate = useNavigate();
  const [fstData, setFstData] = useState([]);
  const [sortName, setSortName] = useState('전체');
  const [sortState, setSortState] = useState(true);

  const { data: premisesData } = useQuery(['premisesData'], ReadPremisesList, {
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (response) => {
      console.log(response);
    },
  });
  const onSortList = () => {
    setSortState(false);
  };

  const onSorting = (sort) => {
    if (sort === '상담') {
      setSortName(sort);
      setSortState(true);
    }
    if (sort === '발품기록') {
      premisesData?.map((data) => {
        let coord = { LatLng: new kakao.maps.LatLng(data.coordFX, data.coordFY) };
        return setFstData([...fstData, coord]);
      });
      console.log(fstData);
      setSortName(sort);
      setSortState(true);
    }
    if (sort === '전체') {
      setSortName(sort);
      setSortState(true);
    }
  };
  console.log(premisesData);
  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new window.kakao.maps.LatLng(37.389777093851, 127.097880906475),
      level: 7,
    };
    const map = new window.kakao.maps.Map(container, options);

    // if (premisesData.length !== 0) {
    //   for (let i = 0; i < fstData.length; i++) {
    //     let imageSize = new kakao.maps.Size(44, 54);
    //     let markerImage = new kakao.maps.MarkerImage(fstMarker, imageSize);
    //     let marker = new kakao.maps.Marker({
    //       map: map,
    //       position: fstData[i].LatLng,
    //       image: markerImage,
    //     });
    //   }
    // }
  });

  return (
    <>
      <FootstepMainArticleContainer>
        <MapContainer id="myMap" />
        <AddressSearchBox>
          <AddressSearchInput placeholder="주소로 기록을 검색해보세요" />
          <SearchImg src={searchImg} />
        </AddressSearchBox>
        <ListBtn>목록</ListBtn>
        {sortState === false ? (
          <SortList>
            <SortHeadlineBox>
              <SortHeadline>전체</SortHeadline>
              <SortingImg src={pathUp} />
            </SortHeadlineBox>
            <SortRequest
              onClick={() => {
                onSorting('상담');
              }}
            >
              상담
            </SortRequest>
            <SortNfs
              onClick={() => {
                onSorting('발품기록');
              }}
            >
              발품기록
            </SortNfs>
            <SortAll
              onClick={() => {
                onSorting('전체');
              }}
            >
              전체
            </SortAll>
          </SortList>
        ) : (
          <SortBox
            onClick={() => {
              onSortList();
            }}
          >
            <SortName>{sortName}</SortName>
            <SortImg src={pathDown} />
          </SortBox>
        )}

        <WriteBox>
          <WriteBtn
            onClick={() => {
              navigate('/newfootstep');
            }}
          >
            <WriteImg src={WriteIcon} />
          </WriteBtn>
          <CarouselWrap>
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
              <CarouselUl className="list">
                {sortName === '발품기록' ? (
                  <CarouselLi className="item">
                    <CarouselBox
                      onClick={() => {
                        navigate(`${premisesData !== 'undefined' && premisesData.length !== '0' ? premisesData[0].id : null}`);
                      }}
                    >
                      <CarouselImage src={CaroselImages} />
                      <CarouselRightBox>
                        <CarouselHeaderBox>
                          <CarouselMarkerImg src={CarouselMarker} />
                          <CarouselHeaderP>발품기록 | 상담</CarouselHeaderP>
                        </CarouselHeaderBox>
                        <CarouselAddress>{premisesData.length !== 0 ? premisesData[0].title : null}</CarouselAddress>
                        <CarouselReview>{premisesData.length !== 0 ? premisesData[0].review : null}</CarouselReview>
                      </CarouselRightBox>
                    </CarouselBox>
                  </CarouselLi>
                ) : null}
              </CarouselUl>
            </Swiper>
          </CarouselWrap>
        </WriteBox>
      </FootstepMainArticleContainer>
    </>
  );
}

const CarouselBox = styled.div`
  width: 308px;
  height: 120px;
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: 8px;
  box-shadow: var(--Shadow2-box-shadow);
  margin-left: 16px;
  -webkit-user-drag: none;
  cursor: pointer;
`;

const CarouselImage = styled.img`
  width: 84px;
  height: 84px;
  margin-top: 18px;
  margin-left: 16px;
`;
const CarouselRightBox = styled.div`
  margin-left: 12px;
  margin-top: 16px;
`;

const CarouselHeaderBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const CarouselMarkerImg = styled.img`
  width: 24px;
  height: 24px;
`;

const CarouselHeaderP = styled.div`
  margin-left: 8px;
  margin-top: 4px;
  color: #3fb00a;
  font-family: var(--body-font-family);
  font-size: var(--body_Small-font-size);
  font-weight: var(--body_Small-font-weight);
  line-height: var(--body_Small-line-height);
  letter-spacing: var(--body_Small-letter-spacing);
`;

const CarouselAddress = styled.div`
  width: 180px;
  margin-top: 4px;
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
`;

const CarouselReview = styled.div`
  margin-top: 4px;
  color: var(--gray4);
  font-family: var(--body-font-family);
  font-size: var(--body_Small-font-size);
  font-weight: var(--body_Small-font-weight);
  line-height: var(--body_Small-line-height);
  letter-spacing: var(--body_Small-letter-spacing);
`;

const FootstepMainArticleContainer = styled.div`
  width: 360px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MapContainer = styled.div`
  width: 360px;
  height: 100%;
  background: white;
  z-index: 0;
  margin-top: auto;
`;

const AddressSearchBox = styled.div`
  position: absolute;
  width: 256px;
  height: 48px;
  background-color: white;
  margin-left: 16px;
  margin-top: 24px;
  border: 1px solid var(--primary1-400);
  border-radius: 8px;
  box-shadow: var(--Shadow1-box-shadow);
`;

const AddressSearchInput = styled.input`
  position: absolute;
  width: 180px;
  height: 16px;
  margin-left: 20px;
  margin-top: 16px;
  border: none;
  outline: none;
`;

const SearchImg = styled.img`
  margin-left: 212px;
  margin-top: 13px;
  cursor: pointer;
`;

const ListBtn = styled.div`
  position: absolute;
  width: 57px;
  height: 48px;
  margin-left: 288px;
  margin-top: 24px;
  border-radius: 8px;
  box-shadow: var(--Shadow2-box-shadow);
  background-color: var(--primary1-400);
  font-family: var(--button-font-family);
  font-size: var(--button_Medium-font-size);
  font-weight: var(--button_Medium-font-weight);
  line-height: var(--button_Medium-line-height);
  letter-spacing: var(--button_Medium-letter-spacing);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SortBox = styled.div`
  position: absolute;
  width: 70px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid var(--gray5);
  border-radius: 8px;
  margin-top: 80px;
  margin-left: 16px;
  cursor: pointer;
`;

const SortName = styled.div`
  font-family: var(--button-font-family);
  font-size: var(--button_Small-font-size);
  font-weight: var(--button_Small-font-weight);
  line-height: var(--button_Small-line-height);
  letter-spacing: var(--button_Small-letter-spacing);
`;

const SortList = styled.div`
  position: absolute;
  width: 70px;
  height: 135px;
  margin-top: 80px;
  margin-left: 16px;
  background-color: white;
  border: 1px solid var(--gray5);
  border-radius: 8px;
`;

const SortHeadlineBox = styled.div`
  width: 60px;
  height: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 12px;
  margin-top: 8px;
  color: var(--gray3);
`;

const SortHeadline = styled.div`
  margin-top: 2px;
  cursor: default;
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
`;

const SortRequest = styled.div`
  width: 70px;
  height: 32px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  border-top: 1px solid var(--gray5);
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
  cursor: pointer;
`;

const SortNfs = styled.div`
  width: 70px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  border-top: 1px solid var(--gray5);
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
  cursor: pointer;
`;

const SortAll = styled.div`
  width: 70px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  border-top: 1px solid var(--gray5);
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
  cursor: pointer;
`;

const SortingImg = styled.img`
  width: 20px;
  height: 20px;
  margin-top: 4px;
`;

const SortImg = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 4px;
`;

const WriteBox = styled.div`
  position: absolute;
  height: 100%;
  background-color: aqua;
  display: flex;
  flex-direction: column-reverse;
`;

const WriteBtn = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  margin-left: 305px;
  margin-bottom: 235px;
  display: flex;
  background-color: var(--primary1-400);
  border-radius: 8px;
  box-shadow: var(--Shadow3-box-shadow);
  cursor: pointer;
`;

const WriteImg = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 8px;
  margin-top: 8px;
`;

// const CarouselBox = styled.div`
//   position: absolute;
//   height: 100%;
//   display: flex;
//   flex-direction: column-reverse;
//   overflow: hidden;
//   z-index: 0;
// `;

const CarouselWrap = styled.div`
  position: absolute;
  width: 360px;
  height: 120px;
  margin-bottom: 110px;
  overflow: hidden;
`;

const CarouselUl = styled.ul`
  width: 100%;
  display: flex;
  transform: translate(0, 0);
`;

const CarouselLi = styled.li`
  width: 308px;
  height: 120px;
  list-style: none;
  user-select: none;
  padding-right: 20px;
`;

const CarosulItem = styled.img`
  width: 200px;
  height: 120px;
  -webkit-user-drag: none;
`;
