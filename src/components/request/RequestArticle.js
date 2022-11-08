import { useState } from 'react';
import styled from 'styled-components';
import PopupDom from './PopupDom';
import PopupPostCode from './PopupPostCode';
import { useRecoilState } from 'recoil';
import { requireAddress } from '../../store/store';

export default function RequestArticle() {
  // 입력된 주소를 담을 RecoilState
  const [requAddress, setRequAddress] = useRecoilState(requireAddress);

  // 팝업창 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 팝업창 열기
  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  // 팝업창 닫기
  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  return (
    <RequestBackground>
      <RequestArticleContainer>
        <RequestP>상담받으실 매물 주소를 알려주세요</RequestP>
        <AddressBox>
          <RequestP>주소</RequestP>
          <RequestAddressSearchBtn type="button" onClick={openPostCode}>
            우편번호 검색
          </RequestAddressSearchBtn>
        </AddressBox>
        <PopDom id="popupDom">
          {isPopupOpen && (
            <popupDom>
              <PopupPostCode onClose={closePostCode} />
            </popupDom>
          )}
        </PopDom>
        <AddressP>{requAddress}</AddressP>
        <DetailAddressBox>
          <RequestP>상세 주소</RequestP>
          <DetailAddressInput placeholder="상세주소를 입력해주세요"></DetailAddressInput>
        </DetailAddressBox>
        <RequestP>부동산 구분</RequestP>
        <BuildingRadioBox>
          <label>
            <input type={'radio'} name="building" value={'집합건물'} />
            🏢집합건물
          </label>
          <label>
            <input type={'radio'} name="building" value={'건물'} />
            🏬건물
          </label>
        </BuildingRadioBox>
        <RequestP>상담 유형</RequestP>
        <TypeBox>
          <TypeBtn>등기부등본</TypeBtn>
          <TypeBtn>건축물대장</TypeBtn>
        </TypeBox>
        <RequestP>전달 메세지</RequestP>
        <Message placeholder="공인중개사님께 보낼 메세지를 적어주세요. (더 궁금한 것들, 알고싶었던것들)"></Message>
        <SendBtn>상담 신청하기</SendBtn>
      </RequestArticleContainer>
    </RequestBackground>
  );
}

const RequestBackground = styled.div`
  width: 100%;
  height: 922px;
`;

const RequestArticleContainer = styled.div`
  width: 30%;
  height: 922px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const RequestP = styled.p`
  font-weight: bold;
  margin-top: 35px;
  font-size: 20px;
`;

const AddressBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 40px;
`;

const RequestAddressSearchBtn = styled.button`
  width: 100px;
  height: 28px;
  margin-top: 20px;
  margin-left: 5px;
`;

const PopDom = styled.div`
  position: absolute;
`;

const AddressP = styled.p`
  margin-top: 8px;
`;

const DetailAddressBox = styled.div``;

const DetailAddressInput = styled.input`
  width: 300px;
  height: 20px;
  margin-top: 8px;
`;

const BuildingRadioBox = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: row;
`;

const TypeBox = styled.div`
  display: flex;
  flex-direction: row;
`;
const TypeBtn = styled.div`
  width: 110px;
  height: 30px;
  border: 1px solid black;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  margin-top: 10px;
`;

const Message = styled.input`
  width: 500px;
  height: 20px;
  margin-top: 10px;
`;

const SendBtn = styled.div`
  width: 506px;
  height: 30px;
  border: 1px solid black;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
