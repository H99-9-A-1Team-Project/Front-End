import React from 'react';
import styled from 'styled-components';
import arrow2 from './sources/arrow2.png';

export default function MyConsultHeader() {
  return (
    <MyConsultHeaderLayout>
      <div className="div1">
        <img src={arrow2} alt="arrow2" />내 상담
      </div>
    </MyConsultHeaderLayout>
  );
}

const MyConsultHeaderLayout = styled.div`
  width: 100%;
  height: 64px;
  background-color: white;
  border-bottom: 1px solid var(--gray6);
  .div1 {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: white;
    font-family: var(--headline-font-family);
    font-size: var(--body_Medium-font-size);
    font-weight: var(--body_Medium-font-weight);
    line-height: var(--body_Medium-line-height);
    letter-spacing: var(--body_Medium-letter-spacing);
  }
  img {
    background-color: white;
    width: 6px;
    height: 12px;
    margin: 26px 17px 26px 25px;
  }
`;
