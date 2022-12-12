import React from 'react';
import styled from 'styled-components';
import ButtonLage from '../global/components/ButtonLage';
import img from '../global/sources/notfound.png';

export default function NotFoundBody() {
  return (
    <NotFoundBodyContainer>
      <img src={img} alt="img" />
      <div className="body">
        <div className="body_title_box">
          <div className="body_title"> 페이지를 찾을 수 없습니다!</div>
          <div className="body_title"> (404 Not Found)</div>
        </div>
        <div className="body_body_box">
          <div className="body_body"> 페이지가 존재하지않거나,</div>
          <div className="body_body"> 사용할 수 없는 페이지 입니다.</div>
        </div>
        <div className="body_body_box">
          <div className="body_body"> 입력하신 주소가 정확한지 </div>
          <div className="body_body"> 다시 한번 확인해주시기 바랍니다.</div>
        </div>
      </div>
      <ButtonLage text={'홈으로 돌아가기'} page={'/'} />
    </NotFoundBodyContainer>
  );
}

const NotFoundBodyContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 100%;
  }
  .body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  .body_title_box {
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    box-sizing: border-box;
  }
  .body_title {
    font-family: var(--headline-font-family);
    font-size: var(--headline_Large-font-size);
    font-weight: var(--headline_Large-font-weight);
    line-height: var(--headline_Large-line-height);
    letter-spacing: var(--headline_Large-letter-spacing);
  }
  .body_body {
    font-family: var(--headline-font-family);
    font-size: var(--body_Large-font-size);
    font-weight: var(--body_Large-font-weight);
    line-height: var(--body_Large-line-height);
    letter-spacing: var(--body_Large-letter-spacing);
  }
  .body_body_box {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
`;
