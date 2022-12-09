import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import left_light from '../../global/sources/Expand_left_light.svg';

export default function MyConsultHeader({ text, page }) {
  const navigate = useNavigate();
  return (
    <MyConsultHeaderLayout>
      <div className="div1">
        <div onClick={() => navigate(page)}>
          <img src={left_light} alt="left_light" />
          {text}
        </div>
      </div>
    </MyConsultHeaderLayout>
  );
}

const MyConsultHeaderLayout = styled.div`
  width: 360px;
  height: 64px;
  background-color: white;
  border-bottom: 1px solid var(--gray6);
  @media (max-width: 500px) {
    width: 100%;
  }
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
    div {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      background-color: white;
      cursor: pointer;
    }
  }
  img {
    background-color: white;
    margin: 20px 8px 20px 16px;
  }
`;
