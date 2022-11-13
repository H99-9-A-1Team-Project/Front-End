import styled from 'styled-components';

export default function ItemInfo() {
  return (
    <ItemInfoContainer>
      <InputContainer>
        <RoadAddressBox>
          <AddressTitleP>도로명 주소</AddressTitleP>
          <SubSpan>필수</SubSpan>
        </RoadAddressBox>
        <RoadAddressSearch>
          {'\u00A0'}
          {'\u00A0'}검색
        </RoadAddressSearch>
        <DetailAddressBox>
          <AddressTitleP>상세 주소</AddressTitleP>
          <SubSpan>필수</SubSpan>
        </DetailAddressBox>
        <InputTag placeholder="상세 주소를 입력해주세요"></InputTag>
        <TitleP>매물 가격</TitleP>
        <InputTag placeholder="전/월세 금액, 월 납부 금액"></InputTag>
        <TitleP>방 크기</TitleP>
        <InputTag placeholder="방 평수, 체감 크기 등"></InputTag>
        <TitleP>한줄 평</TitleP>
        <InputTag placeholder="매물을 한 줄로 표현하자면?"></InputTag>
      </InputContainer>
      <RegistBtn>등록하기</RegistBtn>
    </ItemInfoContainer>
  );
}

const ItemInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  width: 40%;
  margin-top: 20px;
  flex-direction: column;
  align-items: center;
`;

const RoadAddressBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DetailAddressBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

const AddressTitleP = styled.p`
  font-size: 24px;
  font-weight: bold;
`;

const TitleP = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
`;

const SubSpan = styled.span`
  font-size: 14px;
  margin-left: 10px;
  font-weight: bold;
`;

const RoadAddressSearch = styled.div`
  margin-top: 9px;
  background-color: #f3f3f3;
  border: 1px solid #f3f3f3;
  border-radius: 10px;
  width: 641px;
  height: 68px;
  font-size: 18px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const InputTag = styled.input`
  margin-top: 9px;
  background-color: #f3f3f3;
  border: 1px solid #f3f3f3;
  border-radius: 10px;
  width: 641px;
  height: 68px;
  font-size: 18px;
  display: flex;
  align-items: center;
`;

const RegistBtn = styled.button`
  height: 30px;
  background-color: white;
  margin-top: 20px;
  margin-left: 450px;
`;
