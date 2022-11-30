import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function ButtonLage({ text, page }) {
  const navigate = useNavigate();
  return <Stbutton onClick={() => page && navigate(page)}>{text}</Stbutton>;
}
const Stbutton = styled.div`
  width: 328px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: var(--primary2-400);
  border-radius: 8px;
  font-family: var(--button-font-family);
  font-size: var(--button_Large-font-size);
  font-weight: var(--button_Large-font-weight);
  line-height: var(--button_Large-line-height);
  letter-spacing: var(--button_Large-letter-spacing);
  cursor: pointer;
`;
