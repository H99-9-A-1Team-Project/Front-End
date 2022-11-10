import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { FootStepListBackState } from '../../store/store';

export default function FootStepList() {
  const [backbtn, setBackBtn] = useRecoilState(FootStepListBackState);

  const onClickBackBtn = () => {
    if (backbtn === 0) {
      setBackBtn(1);
    }
    if (backbtn === 1) {
      setBackBtn(0);
    }
  };
  return (
    <FootStepListContainer>
      <ListHeader>
        <BackBtn
          onClick={() => {
            onClickBackBtn();
          }}
        >
          뒤로가기
        </BackBtn>
        <ListSearch placeholder="검색"></ListSearch>
        <SearchFilter>필터</SearchFilter>
      </ListHeader>
      <ContentListContainer>
        <ContentBox>
          <ContentHeaderContainer>
            <ContentHeaderAddress>부산광역시 센텀시티</ContentHeaderAddress>
            <ContentHeaderType>발품기록 | 상담</ContentHeaderType>
            <Contentcotent>이 매물은 좋은 것인가 안좋은 것인가 그것이 알고싶다. 의 진행을 맡은 MC 김상중이었습니다.</Contentcotent>
          </ContentHeaderContainer>
        </ContentBox>
        <ContentBox>
          <ContentHeaderContainer>
            <ContentHeaderAddress>대구광역시 동성로</ContentHeaderAddress>
            <ContentHeaderType>발품기록</ContentHeaderType>
            <Contentcotent>이 매물은 좋은 것인가 안좋은 것인가 그것이 알고싶다. 의 진행을 맡은 MC 이효리이었습니다.</Contentcotent>
          </ContentHeaderContainer>
        </ContentBox>
        <ContentBox>
          <ContentHeaderContainer>
            <ContentHeaderAddress>경기도 용인시 에버랜드</ContentHeaderAddress>
            <ContentHeaderType>발품기록 | 상담</ContentHeaderType>
            <Contentcotent>이 매물은 좋은 것인가 안좋은 것인가 그것이 알고싶다. 의 진행을 맡은 MC 유재석이었습니다.</Contentcotent>
          </ContentHeaderContainer>
        </ContentBox>
        <ContentBox>
          <ContentHeaderContainer>
            <ContentHeaderAddress>인천광역시 인천국제공항</ContentHeaderAddress>
            <ContentHeaderType>발품기록 | 상담</ContentHeaderType>
            <Contentcotent>이 매물은 좋은 것인가 안좋은 것인가 그것이 알고싶다. 의 진행을 맡은 MC 강호동이었습니다.</Contentcotent>
          </ContentHeaderContainer>
        </ContentBox>
        <ContentBox>
          <ContentHeaderContainer>
            <ContentHeaderAddress>부산광역시 광안리 해수욕장</ContentHeaderAddress>
            <ContentHeaderType>발품기록</ContentHeaderType>
            <Contentcotent>이 매물은 좋은 것인가 안좋은 것인가 그것이 알고싶다. 의 진행을 맡은 MC 하하이었습니다.</Contentcotent>
          </ContentHeaderContainer>
        </ContentBox>
        <ContentBox>
          <ContentHeaderContainer>
            <ContentHeaderAddress>대전광역시</ContentHeaderAddress>
            <ContentHeaderType>발품기록 | 상담</ContentHeaderType>
            <Contentcotent>이 도시는 정말로 노잼 도시일까요? 그것이 알고싶다. 의 진행을 맡은 MC 펭수였습니다.</Contentcotent>
          </ContentHeaderContainer>
        </ContentBox>
        <ContentBox>
          <ContentHeaderContainer>
            <ContentHeaderAddress>울산광역시</ContentHeaderAddress>
            <ContentHeaderType>발품기록 | 상담</ContentHeaderType>
            <Contentcotent>이 도시는 정말로 노잼 도시일까요? 그것이 알려드림. 의 진행을 맡은 MC 진용진였습니다.</Contentcotent>
          </ContentHeaderContainer>
        </ContentBox>
        <ContentBox>
          <ContentHeaderContainer>
            <ContentHeaderAddress>광주광역시</ContentHeaderAddress>
            <ContentHeaderType>발품기록 | 상담</ContentHeaderType>
            <Contentcotent>이 도시는 정말로 노잼 도시일까요? 그것이 알고싶다. 의 진행을 맡은 MC 전현무였습니다.</Contentcotent>
          </ContentHeaderContainer>
        </ContentBox>
      </ContentListContainer>
    </FootStepListContainer>
  );
}

const FootStepListContainer = styled.div`
  width: 800px;
  height: 860px;
  background-color: white;
  z-index: 2;
  position: absolute;
  margin-left: 1120px;
  top: 112px;
  overflow-y: auto;
  overflow-x: hidden;
  word-break: break-all;
`;

const ListHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  position: fixed;
  background-color: white;
  height: 100px;
  z-index: 1;
  border-bottom: 1px solid black;
`;

const BackBtn = styled.div`
  width: 100px;
  height: 40px;
  border: 1px solid black;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  margin-top: 20px;
  background-color: #d6d6d6;
  cursor: pointer;
`;

const ListSearch = styled.input`
  width: 600px;
  height: 40px;
  margin-left: 20px;
  margin-top: 20px;
`;

const SearchFilter = styled.div`
  width: 80px;
  height: 30px;
  position: absolute;
  margin-top: 27px;
  margin-left: 660px;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const ContentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  word-break: break-all;
  margin-top: 100px;
`;

const ContentBox = styled.div`
  width: 91%;
  height: 100px;
  margin-top: 10px;
  margin-right: 30px;
  border: 1px solid black;
  cursor: pointer;
`;

const ContentHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  margin-left: 15px;
`;

const ContentHeaderAddress = styled.p`
  font-weight: bold;
  font-size: 20px;
`;

const ContentHeaderType = styled.p``;

const Contentcotent = styled.p`
  width: 90%;
  margin-top: 15px;
  overflow: hidden;
  white-space: nowrap;
  word-break: break-all;
  text-overflow: ellipsis;
`;
