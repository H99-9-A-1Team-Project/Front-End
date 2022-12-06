import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { requireAddress, rqInfo } from '../../store/store';

const PopupPostCode = (props) => {
  const [requPopAddress, setRequPopAddress] = useRecoilState(requireAddress);
  const [popRq1Info, setPopRq1Info] = useRecoilState(rqInfo);

  const handlePostCode = (data) => {
    let address = '';
    if (data.userSelectedType === 'J') {
      address = data.jibunAddress;
    } else if (data.userSelectedType === 'R') {
      address = data.roadAddress;
    }
    setRequPopAddress(address);
    setPopRq1Info({ ...popRq1Info, title: requPopAddress });
    props.onClose();
  };

  const postCodeStyle = {
    display: 'flex',
    position: 'absolute',
    width: '340px',
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
  width: 350px;
  background: none;
  right: -336px;
  bottom: -500px;
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
