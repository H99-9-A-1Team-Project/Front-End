import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { ToastOpen, TextToast } from '../../store/store';
import styled from 'styled-components';

function InnerToast() {
  // toast 닫기용 state
  const [toast, setToast] = useRecoilState(ToastOpen);
  // toast 에 들어갈 문구 recoilstate
  const [toasttext, setToastText] = useRecoilState(TextToast);
  console.log(toasttext);
  // toast 에 들어갈 문구는 넣고 싶은 위치에.

  return (
    <div>
      <ToastTextStyle>{toasttext}</ToastTextStyle>
    </div>
  );
}

export default InnerToast;

const ToastTextStyle = styled.div`
  color: white;
  position: relative;
`;

