import { useState } from 'react';
import styled from 'styled-components';

export default function RequestArticle() {
  const CityList = [
    '서울특별시',
    '부산광역시',
    '대구광역시',
    '인천광역시',
    '광주광역시',
    '대전광역시',
    '울산광역시',
    '세종특별자치시',
    '경기도',
    '강원도',
    '충청북도',
    '충청남도',
    '전라북도',
    '전라남도',
    '경상북도',
    '경상남도',
    '제주특별자치도',
  ];

  const [city, setCity] = useState();
  return (
    <RequestArticleContainer>
      <RequestTitle>상담받으실 매물 주소를 알려주세요</RequestTitle>
      <RequestCitiesP>시/도</RequestCitiesP>
      <RequestSelectCity>
        {CityList.map((city) => {
          <option value={city}>{city}</option>;
        })}
        {/* <option value=""></option>
        <option value="서울특별시">서울특별시</option>
        <option value="부산광역시">부산광역시</option>
        <option value="대구광역시">대구광역시</option>
        <option value="인천광역시">인천광역시</option>
        <option value="광주광역시">광주광역시</option>
        <option value="대전광역시">대전광역시</option>
        <option value="울산광역시">울산광역시</option>
        <option value="세종특별자치시">세종특별자치시</option>
        <option value="경기도">경기도</option>
        <option value="강원도">강원도</option>
        <option value="충청북도">충청북도</option>
        <option value="충청남도">충청남도</option>
        <option value="전라북도">전라북도</option>
        <option value="전라남도">전라남도</option>
        <option value="경상북도">경상북도</option>
        <option value="경상남도">경상남도</option>
        <option value="제주특별자치도">제주특별자치도</option> */}
      </RequestSelectCity>
      <RequestSelectWard></RequestSelectWard>
    </RequestArticleContainer>
  );
}

const RequestArticleContainer = styled.div`
  width: 60%;
  height: 922px;
  background-color: aqua;
  display: flex;
  flex-direction: column;
`;

const RequestTitle = styled.p`
  font-weight: bold;
  margin-left: 40px;
  margin-top: 20px;
`;

const RequestCitiesP = styled.p`
  font-weight: bold;
  margin-left: 40px;
  margin-top: 20px;
`;

const RequestSelectCity = styled.select`
  width: 197px;
`;

const RequestSelectWard = styled.select``;
