/*global kakao*/
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import marker1 from '../../sources/markerImage/markerStar1.png';
import marker2 from '../../sources/markerImage/markerStar2.png';
import marker3 from '../../sources/markerImage/markerStar3.png';
import './popupbox.css';
import { useRecoilState } from 'recoil';
import { FootStepListBackState } from '../../store/store';
import { Outlet, useNavigate } from 'react-router-dom';

export default function FootStepNavMenu() {
  const navigate = useNavigate();
  const [footStepMenuState, setFootStepMenuState] = useState(1);
  const [RequestMenuState, setRequestMenuState] = useState(0);
  const [ListUp, setListUp] = useRecoilState(FootStepListBackState);
  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(37.545642179638556, 126.98117041998981),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    let markerImg1 = marker1;
    let markerImg2 = marker2;
    let markerImg3 = marker3;

    if (footStepMenuState === 1 && RequestMenuState === 0) {
      const positions = [
        { title: '주소1', LatLng: new kakao.maps.LatLng(37.545642179638556, 126.98117041998981) },
        { title: '주소2', LatLng: new kakao.maps.LatLng(37.546542179638556, 126.98117041998981) },
        { title: '주소3', LatLng: new kakao.maps.LatLng(37.547442179638556, 126.98117041998981) },
      ];

      const iwHover = [{ mouseHover: '<div style="padding:5px;">대구광역시 장기로 26길 30</div>' }, { mouseHover: '<div style="padding:5px;">서울 특별시 여의도</div>' }, { mouseHover: '<div style="padding:5px;">부산광역시 해운대구</div>' }];

      const iwClick = [
        {
          mouseClick: `<div class="MarkerClickBox">
          <div class="MarkerHeaderBox">
          <div class="MarkerAddressBox">
          <p class="MarkerAddress">인천광역시 부평구</p>
          <p class="MarkerType">발품기록 | 상담</p>
          </div>
          </div>
          <p class="MarkerComment">이 매물은 좋은건가 안좋은건가 그것이 알고싶다.</p>
          </div>
          `,
        },
        {
          mouseClick: `<div class="MarkerClickBox">
          <div class="MarkerHeaderBox">
          <div class="MarkerAddressBox">
          <p class="MarkerAddress">부산광역시 해운대구</p>
          <p class="MarkerType">발품기록 | 상담</p>
          </div>
          </div>
          <p class="MarkerComment">이 매물은 좋은건가 안좋은건가 그것이 알고싶다.</p>
          </div>
          `,
        },
        {
          mouseClick: `<div class="MarkerClickBox">
          <div class="MarkerHeaderBox">
          <div class="MarkerAddressBox">
          <p class="MarkerAddress">대구광역시 달서구</p>
          <p class="MarkerType">발품기록</p>
          </div>
          </div>
          <p class="MarkerComment">이 매물은 좋은건가 안좋은건가 그것이 알고싶다.</p>
          </div>
          `,
        },
      ];

      for (let i = 0; i < positions.length; i++) {
        let imageSize = new kakao.maps.Size(24, 35);
        let markerImage = new kakao.maps.MarkerImage(markerImg1, imageSize);

        let infoHoverWindow = new kakao.maps.InfoWindow({
          content: iwHover[i].mouseHover,
        });

        // let infoClickWindow = new kakao.maps.InfoWindow({
        //   content: iwClick[i].mouseClick,
        // });

        let marker = new kakao.maps.Marker({
          map: map,
          position: positions[i].LatLng,
          // title: positions[i].title,
          image: markerImage,
        });
        let overlay = new kakao.maps.CustomOverlay({
          yAnchor: 1.5,
          position: marker.getPosition(),
        });

        let content = document.createElement('div');
        content.innerHTML = iwClick[i].mouseClick;
        overlay.setContent(content);

        let closeBtn = document.createElement('button');
        closeBtn.innerHTML = '닫기';
        closeBtn.onclick = function () {
          overlay.setMap(null);
        };
        content.appendChild(closeBtn);

        closeBtn.style.cssText = 'margin-left:309px;position:absolute;top:85px; background-color:white;cursor: pointer;border:1px solid black;';

        let DetailBtn = document.createElement('button');
        DetailBtn.innerHTML = '자세히 보기';
        DetailBtn.onclick = function () {
          alert('자세히 보기');
        };
        content.appendChild(DetailBtn);
        DetailBtn.style.cssText =
          'width: 100px; height:35px; position:absolute; border: 1px solid black; display: flex; border-radius: 8px; align-items: center;justify-content: center;cursor: pointer; top:10px; margin-left:240px; background-color:white;';

        kakao.maps.event.addListener(marker, 'mouseover', function () {
          infoHoverWindow.open(map, marker);
        });
        kakao.maps.event.addListener(marker, 'mouseout', function () {
          infoHoverWindow.close(map, marker);
        });
        kakao.maps.event.addListener(marker, 'click', function () {
          overlay.setMap(map);
        });
        // kakao.maps.event.addListener(marker, 'click', function () {
        //   infoClickWindow.open(map, marker);
        // });
      }
    }

    if (footStepMenuState === 0 && RequestMenuState === 1) {
      const positions = [
        { title: '주소1', LatLng: new kakao.maps.LatLng(37.544642179638556, 126.98117041998981) },
        { title: '주소2', LatLng: new kakao.maps.LatLng(37.543542179638556, 126.98117041998981) },
        { title: '주소3', LatLng: new kakao.maps.LatLng(37.542442179638556, 126.98117041998981) },
      ];

      for (let i = 0; i < positions.length; i++) {
        let imageSize = new kakao.maps.Size(24, 35);
        let markerImage = new kakao.maps.MarkerImage(markerImg2, imageSize);
        let marker = new kakao.maps.Marker({
          map: map,
          position: positions[i].LatLng,
          title: positions[i].title,
          image: markerImage,
        });
      }
    }

    if (footStepMenuState === 1 && RequestMenuState === 1) {
      const positions = [
        { title: '주소1', LatLng: new kakao.maps.LatLng(37.544642179638556, 126.98117041998981) },
        { title: '주소2', LatLng: new kakao.maps.LatLng(37.543542179638556, 126.98217041998981) },
        { title: '주소3', LatLng: new kakao.maps.LatLng(37.542442179638556, 126.98317041998981) },
      ];

      for (let i = 0; i < positions.length; i++) {
        let imageSize = new kakao.maps.Size(24, 35);
        let markerImage = new kakao.maps.MarkerImage(markerImg3, imageSize);
        let marker = new kakao.maps.Marker({
          map: map,
          position: positions[i].LatLng,
          title: positions[i].title,
          image: markerImage,
        });
      }
    }
  }, [footStepMenuState, RequestMenuState]);

  const onFootMenuClick = () => {
    if (footStepMenuState === 0) {
      setFootStepMenuState(1);
      console.log(footStepMenuState);
    } else if (footStepMenuState === 1) {
      setFootStepMenuState(0);
      console.log(footStepMenuState);
    }
  };

  const onRequestMenuClick = () => {
    if (RequestMenuState === 0) {
      setRequestMenuState(1);
      console.log(RequestMenuState);
    } else if (RequestMenuState === 1) {
      setRequestMenuState(0);
      console.log(RequestMenuState);
    }
  };

  const onListUp = () => {
    setListUp(1);
  };
  return (
    <>
      <MapContainer id="myMap"></MapContainer>
      <NavMenuContainer>
        <LeftSpace>
          <FootStepMenu
            footStepMenuState={footStepMenuState}
            onClick={() => {
              onFootMenuClick();
            }}
          >
            발품
          </FootStepMenu>
          <RequestMenu
            RequestMenuState={RequestMenuState}
            onClick={() => {
              onRequestMenuClick();
            }}
          >
            상담
          </RequestMenu>
        </LeftSpace>
        <RightSpace>
          <SearchMenu
            onClick={() => {
              onListUp();
            }}
          >
            검색
          </SearchMenu>
          <FootStepListMenu
            onClick={() => {
              onListUp();
            }}
          >
            발품목록
          </FootStepListMenu>
        </RightSpace>
      </NavMenuContainer>

      <NewFootStep
        onClick={() => {
          navigate('/newfootstep');
        }}
      >
        새로운 기록 추가하기
      </NewFootStep>
    </>
  );
}

const NavMenuContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const LeftSpace = styled.div`
  margin-top: 30px;
`;
const FootStepMenu = styled.button`
  width: 100px;
  height: 60px;
  border: 3px solid black;
  border-radius: 5px;
  margin-left: 30px;
  background-color: ${(props) => `${props.footStepMenuState === 0 ? '#F0F0F0' : '#2020FF'}`};
  color: ${(props) => `${props.footStepMenuState === 0 ? 'black' : 'white'}`};
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;
const RequestMenu = styled.button`
  width: 100px;
  height: 60px;
  border: 3px solid black;
  border-radius: 5px;
  margin-left: 30px;
  background-color: ${(props) => `${props.RequestMenuState === 0 ? '#F0F0F0' : '#2020FF'}`};
  color: ${(props) => `${props.RequestMenuState === 0 ? 'black' : 'white'}`};
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const RightSpace = styled.div`
  margin-top: 30px;
`;
const SearchMenu = styled.button`
  width: 100px;
  height: 60px;
  border: 3px solid black;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;
const FootStepListMenu = styled.button`
  width: 100px;
  height: 60px;
  border: 3px solid black;
  border-radius: 5px;
  margin-left: 30px;
  margin-right: 30px;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const MapContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 859px;
`;

const NewFootStep = styled.div`
  width: 200px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  position: relative;
  margin: 0 auto;
  margin-top: 700px;
  border: 1px solid black;
  border-radius: 15px;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const FootStepListContainer = styled.div`
  width: 800px;
  height: 100%;
  background-color: white;
  z-index: 2;
  position: absolute;
  margin-left: 1120px;
  top: 112px;
`;

// const MarkerClickBox = styled.div`
//   width: 350px;
//   height: 80px;
//   border: 1px solid black;
//   border-radius: 5px;
// `;

// const MarkerHeaderBox = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;
// const MarkerAddressBox = styled.div`
//   margin-left: 20px;
//   margin-top: 10px;
//   display: flex;
//   flex-direction: column;
// `;

// const MarkerAddress = styled.p`
//   font-weight: bold;
// `;

// const MarkerType = styled.p``;

// const MarkerDetailbtn = styled.div`
//   margin-top: 10px;
//   margin-right: 10px;
//   width: 100px;
//   border: 1px solid black;
//   display: flex;
//   border-radius: 8px;
//   align-items: center;
//   justify-content: center;
// `;

// const MarkerComment = styled.p`
//   width: 320px;
//   overflow: hidden;
//   white-space: nowrap;
//   word-break: break-all;
//   text-overflow: ellipsis;
//   margin-left: 20px;
//   margin-top: 10px;
// `;
