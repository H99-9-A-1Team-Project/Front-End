/* global kakao*/
import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { nfsRoadAddress, nfsData } from '../../store/store';
import { useEffect } from 'react';
import { useState } from 'react';

const PopupPostCode = (props) => {
  const [nfsPopRoadAddress, setNfsPopRoadAddress] = useRecoilState(nfsRoadAddress);
  const [popNfsInfo, setPopNfsInfo] = useRecoilState(nfsData);
  const [viewPort, setViewPort] = useState('');
  let geocoder = new kakao.maps.services.Geocoder();
  const handlePostCode = (data) => {
    let address = '';
    if (data.userSelectedType === 'J') {
      address = data.jibunAddress;
    } else if (data.userSelectedType === 'R') {
      address = data.roadAddress;
    }
    setNfsPopRoadAddress(address);
    setPopNfsInfo({ ...popNfsInfo, title: address });
    geocoder.addressSearch(address, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        let coords = new kakao.maps.LatLng(result[0].x, result[0].y);
        setPopNfsInfo({ ...popNfsInfo, coordFX: coords.La, coordFY: coords.Ma });
      }
    });
    props.onClose();
  };
  useEffect(() => {
    if (window.innerWidth > 500) {
      setViewPort('340px');
    }
    if (window.innerWidth <= 500) {
      const width = window.innerWidth * 0.93;
      setViewPort(`${width}px`);
    }
  }, []);
  const postCodeStyle = {
    display: 'flex',
    position: 'absolute',
    width: `${viewPort}`,
    height: '400px',
    left: '0px',
    padding: '7px',
    background: '#edf3fa',
  };

  return (
    <Container>
      <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
      <CloseBtn
        type="button"
        onClick={() => {
          props.onClose();
        }}
        className="postCode_btn"
      >
        닫기
      </CloseBtn>
    </Container>
  );
};

export default PopupPostCode;

const Container = styled.div`
  position: absolute;
  width: 370px;
  background: none;
  right: -353.3px;
  bottom: -500px;
  z-index: 1;
`;

const CloseBtn = styled.button`
  width: 50px;
  height: 30px;
  left: 304px;
  bottom: 153px;
  margin-top: 569px;
  border: 1px solid black;
  position: relative;
  cursor: pointer;
  background: none;
  background-color: white;
  @media (max-width: 500px) {
    left: 0;
    bottom: 155px;
  }
`;
