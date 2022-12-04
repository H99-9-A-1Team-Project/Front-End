/* global kakao*/
import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { nfsRoadAddress, nfsData } from '../../store/store';

const PopupPostCode = (props) => {
  const [nfsPopRoadAddress, setNfsPopRoadAddress] = useRecoilState(nfsRoadAddress);
  const [popNfsInfo, setPopNfsInfo] = useRecoilState(nfsData);
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
    console.log(popNfsInfo);
    props.onClose();
  };

  const postCodeStyle = {
    display: 'flex',
    position: 'absolute',
    width: '340px',
    height: '400px',
    left: '0px',
    padding: '7px',
    background: '#fae1e1',
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
`;
