import React from 'react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toastVisible } from '../../store/store';

export default function ToastMessage({ text }) {
  const [visible, setVisible] = useRecoilState(toastVisible);
  useEffect(() => {
    if (visible) {
      setTimeout(() => setVisible(false), 3000);
    }
  }, [visible]);
  return (
    <StToastMessageLayout visible={visible}>
      <div className="children">{text}</div>
    </StToastMessageLayout>
  );
}
const StToastMessageLayout = styled.div`
  position: relative;
  left: 62px;
  bottom: 52px;
  z-index: 1000;
  transform: ${(props) => (props.visible ? 'translateY(-96px)' : 'translateY(0)')};
  opacity: ${(props) => (props.visible ? '1' : '0')};
  transition: transform 1s;
  width: 236px;
  height: 52px;
  border-radius: 8px;
  background-color: rgba(37, 40, 43, 0.6);
  pointer-events: none;
  .children {
    width: 236px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--headline-font-family);
    font-size: var(--body_Medium-font-size);
    font-weight: var(--body_Medium-font-weight);
    line-height: var(--body_Medium-line-height);
    letter-spacing: var(--body_Medium-letter-spacing);
    color: rgba(255, 255, 255, 1);
    white-space: pre-line;
  }
`;
