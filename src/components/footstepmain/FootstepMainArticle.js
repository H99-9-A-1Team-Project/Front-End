/*global kakao*/
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import '../../global/global.css';
import searchImg from './sources/Search.png';
import pathDown from './sources/path_down.png';
import WriteIcon from './sources/write.png';

export default function FootstepMainArticle() {
  const navigate = useNavigate();
  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(37.696046, 127.081947),
      level: 8,
    };
    const map = new kakao.maps.Map(container, options);

    //요소의 사이즈;
    const list = document.querySelector('.list');
    const listScrollWidth = list?.scrollWidth;
    const listClientWidth = list?.clientWidth;

    // 이벤트마다 갱신될 값
    let startX = 0;
    let nowX = 0;
    let endX = 0;
    let listX = 0;

    const onScrollStart = (e) => {
      startX = getClientX(e);
      window.addEventListener('mousemove', onScrollMove);
      window.addEventListener('touchmove', onScrollMove);
      window.addEventListener('mouseup', onScrollEnd);
      window.addEventListener('touchend', onScrollEnd);
    };
    const onScrollMove = (e) => {
      nowX = getClientX(e);
      setTranslateX(listX + nowX - startX);
    };
    const onScrollEnd = (e) => {
      endX = getClientX(e);
      listX = getTranslateX();
      if (listX > 0) {
        setTranslateX(0);
        list.style.transition = `all 0.3s ease`;
        listX = 0;
      } else if (listX < listClientWidth - listScrollWidth) {
        setTranslateX(listClientWidth - listScrollWidth);
        list.style.transition = `all 0.3s ease`;
        listX = listClientWidth - listScrollWidth;
      }

      window.removeEventListener('mousedown', onScrollStart);
      window.removeEventListener('touchstart', onScrollStart);
      window.removeEventListener('mousemove', onScrollMove);
      window.removeEventListener('touchmove', onScrollMove);
      window.removeEventListener('mouseup', onScrollEnd);
      window.removeEventListener('touchend', onScrollEnd);
      window.removeEventListener('click', onClick);

      setTimeout(() => {
        bindEvents();
        list.style.transition = '';
      }, 300);
    };
    const onClick = (e) => {
      if (startX - endX !== 0) {
        e.preventDefault();
      }
    };

    const getClientX = (e) => {
      const isToches = e.touches ? true : false;
      return isToches ? e.touches[0].clientX : e.clientX;
    };

    const getTranslateX = () => {
      return parseInt(getComputedStyle(list).transform.split(/[^\-0-9]+/g)[5]);
    };

    const setTranslateX = (x) => {
      list.style.transform = `translateX(${x}px)`;
    };

    const bindEvents = () => {
      list.addEventListener('mousedown', onScrollStart);
      list.addEventListener('touchstart', onScrollStart);
      list.addEventListener('click', onClick);
    };

    bindEvents();
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
        <SortBox>
          <SortName>전체</SortName>
          <SortImg src={pathDown} />
        </SortBox>
        <WriteBox>
          <WriteBtn
            onClick={() => {
              navigate('/newfootstep');
            }}
          >
            <WriteImg src={WriteIcon} />
          </WriteBtn>
          <CarouselWrap>
            <CarouselUl className="list">
              <CarouselLi className="item">
                <CarosulItem
                  className="image"
                  src="https://w.namu.la/s/200b12d8096ace4b14fad5783b72ded273dd4eab1317b6a3455a7ab95e80d06d7d49f4dd92ffb9502afa4e9be50398e229fba3e3541e3a77f64d3e480d3e0e34e6fde40ed312e7bd168a4502ce694271202ac4f941d1448edc1c7ab47970d204"
                  alt="첫 번째 별나비"
                />
              </CarouselLi>
              <CarouselLi className="item">
                <CarosulItem
                  className="image"
                  src="https://w.namu.la/s/f1dbb5118738ea9ae30b8dffe5e09aeeebe528b1023f67da317dd68c3e12ab14979925126dd0fd2948e18cd82d5c484e3438a6274f4b48c17a9fcf20817a7b08f014991d6484653d4b70e304e14004c502ddea8ad5fd0f28e77f3f8a296eb55d2eb9aefcd45842931dd2df1ae592b586"
                  alt="첫 번째 별나비"
                />
              </CarouselLi>
              <CarouselLi className="item">
                <CarosulItem className="image" src="https://img4.yna.co.kr/photo/ap/2011/09/12/PAP20110912234101034_P4.jpg" alt="첫 번째 별나비" />
              </CarouselLi>
              <CarouselLi className="item">
                <CarosulItem className="image" src="https://img.insight.co.kr/static/2016/06/13/2000/s2q33j23pj02068k8j7v.jpg" alt="첫 번째 별나비" />
              </CarouselLi>
              <CarouselLi className="item">
                <CarosulItem className="image" src="http://image.yes24.com/blogimage/blog/k/i/kikine/czXNJ1Dr.gif" alt="첫 번째 별나비" />
              </CarouselLi>
              <CarouselLi className="item">
                <CarosulItem
                  className="image"
                  src="https://mblogthumb-phinf.pstatic.net/MjAxNzAyMThfMTMz/MDAxNDg3Mzk5MzExODYy.O6Ysc8jgkkdtuM1hA4v6Ko1Abmq3NAfuVOMYUlZEtpEg.bQyZllUpIL8y2QGz0fLm6UlEsPINWYgSE88l_uHz8MEg.JPEG.soso005/%EC%95%BC%EB%8F%88.jpg?type=w800"
                  alt="첫 번째 별나비"
                />
              </CarouselLi>
              <CarouselLi className="item">
                <CarosulItem
                  className="image"
                  src="https://w.namu.la/s/799cc2ec018675e79efedb50c0750cd1a74e8bf79466c1eab9caec6ec59dd4681ed4deb364f7d3f5147e31d6ee0fa0f7ef42e9ea90b55370e87283e0faf2e5536b05fe73d64085efdd5d48a996b8cea7867fe5be249490ea521c4a84b89d21c4"
                  alt="첫 번째 별나비"
                />
              </CarouselLi>
            </CarouselUl>
          </CarouselWrap>
        </WriteBox>
      </FootstepMainArticleContainer>
    </>
  );
}

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
  background-color: white;
  border: 1px solid var(--gray5);
  border-radius: 8px;
  margin-top: 80px;
  margin-left: 16px;
  cursor: pointer;
`;

const SortName = styled.div`
  margin-left: 12px;
  margin-top: 10px;
  font-family: var(--button-font-family);
  font-size: var(--button_Small-font-size);
  font-weight: var(--button_Small-font-weight);
  line-height: var(--button_Small-line-height);
  letter-spacing: var(--button_Small-letter-spacing);
`;

const SortImg = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 4px;
  margin-top: 8px;
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
