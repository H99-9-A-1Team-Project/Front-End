import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function MainPageArticle() {
  const navigate = useNavigate();
  return (
    <>
      <HeaderRequestBtnContainer>
        <HeaderRequestBtn
          onClick={() => {
            navigate('request');
          }}
        >
          지금 상담 신청하기
        </HeaderRequestBtn>
      </HeaderRequestBtnContainer>
      <HeaderFooterContainer>
        <>
          {'\u00A0'}
          {'\u00A0'}
          {'\u00A0'}
          {'\u00A0'}
          {'\u00A0'}
          {'\u00A0'}
          {'\u00A0'}
          {'\u00A0'}
          {'\u00A0'}
          {'\u00A0'}
          {'\u00A0'}
          {'\u00A0'}
        </>
        create by <br /> FE : 조병민, 김성욱, 김하나 <br /> BE : 장경원, 조정우, 정규재
      </HeaderFooterContainer>
    </>
  );
}

const HeaderRequestBtnContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
`;

const HeaderRequestBtn = styled.button`
  position: absolute;
  width: 436px;
  height: 99px;
  margin-right: 100px;
  margin-top: 20px;
  background-color: beige;
  &:hover {
    background-color: brown;
    color: white;
  }
  cursor: pointer;
`;

const HeaderFooterContainer = styled.div`
  width: 100%;
  height: 88px;
  background-color: aquamarine;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 72px;
`;
