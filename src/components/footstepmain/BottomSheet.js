import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { ReadFootStep, ReadConsultDetail } from '../../api/apiGET';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalIdData } from '../../store/store';

export default function BottomSheet({ modalOverLab, modalId, visible, maskCloseable, onClose, closeable }) {
  const [modalIdDatas, setModalIdData] = useRecoilState(modalIdData);
  const onMaskClicks = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };
  let testid = 40;
  if (modalOverLab === 1) {
    setModalIdData(modalId);
  }

  const { data: footstepData } = useQuery(['modalFootStepData'], ReadFootStep, {
    onSuccess: (response) => {
      console.log('zzz', response);
      console.log('abce');
    },
    onError: (response) => {
      console.log('asddd', response);
      console.log('abcf');
    },
  });

  const { data: requestData } = useQuery(['requestDatass'], ReadConsultDetail(testid), {
    onSuccess: (response) => {
      console.log('req1', response);
      console.log('abc');
    },
    onError: (response) => {
      console.log('req2', response);
      console.log('abcd');
    },
  });
  if (requestData !== undefined) {
    console.log('zxc', requestData.title);
  }

  return (
    <>
      <ModalBackground visible={visible} />
      <ModalWrapper onClick={maskCloseable ? onMaskClicks : null} tabIndex={-1} visible={visible}>
        <ModalInner tabIndex="0" className="modal-inner" onClick={(e) => e.stopPropagation()}>
          {closeable && (
            <>
              <>asdfasfasdf</>
            </>
          )}
        </ModalInner>
      </ModalWrapper>
    </>
  );
}

const ModalBackground = styled.div`
  position: absolute;
  top: 50%;
  left: 49.15%;
  transform: translate(-50%, -50%);
  width: 360px;
  height: 100%;
  background-color: black;
  opacity: 0.5;
  z-index: 1;
`;

const ModalWrapper = styled.div`
  position: fixed;
  display: flex;
  width: 360px;
  top: 0;
  right: auto;
  bottom: 0;
  left: auto;
  z-index: 1000;
  /* overflow:auto; */
  outline: 0;
  background-color: rgba(0, 0, 0, 0);
`;
const ModalInner = styled.div`
  z-index: 2;
  position: fixed;
  width: 360px;
  background-color: white;
  height: 500px;
  overflow-y: scroll;
  bottom: 0;
  border-radius: 1rem 1rem 0 0;
`;
