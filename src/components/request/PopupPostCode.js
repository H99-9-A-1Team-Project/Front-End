import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { requireAddress } from '../../store/store';

const PopupPostCode = (props) => {
  // 선택된 주소를 담을 recoilState
  const [requPopAddress, setRequPopAddress] = useRecoilState(requireAddress);
  // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
  const handlePostCode = (data) => {
    let address = '';
    if (data.userSelectedType === 'J') {
      address = data.jibunAddress;
    } else if (data.userSelectedType === 'R') {
      address = data.roadAddress;
    }
    setRequPopAddress(address);
    props.onClose();
  };

  const postCodeStyle = {
    display: 'block',
    position: 'absolute',
    width: '600px',
    height: '450px',
    padding: '7px',
    backgroundColor: '#fae1e1',
    marginTop: '100px',
  };

  return (
    <>
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
    </>
  );
};

export default PopupPostCode;

const CloseBtn = styled.button`
  width: 50px;
  height: 30px;
  margin-left: 564px;
  margin-top: 569px;
  border: 1px solid black;
  position: relative;
  cursor: pointer;
`;
