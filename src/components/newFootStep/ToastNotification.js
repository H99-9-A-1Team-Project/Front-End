import React from 'react';
import styled from 'styled-components';

export default function ToastNotification({ msg = '메세지 없음' }) {
  return <ToastContainer>{msg}</ToastContainer>;
}

const ToastContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  padding: 11px;
  min-width: 200px;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  border-radius: 4px;
  border: 1px solid #000;
`;
