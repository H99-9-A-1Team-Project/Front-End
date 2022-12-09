import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { ReadConsultDetail, ReadFootStep } from '../../api/apiGET';
import Marker_All from '../../global/sources/Pin_all.svg';
import Marker_FootStep from '../../global/sources/Pin_Footstep.svg';
import Marker_request from '../../global/sources/Pin_Request.svg';
import defaultImg from './sources/detaildefault.png';

export default function BottomSheet({ modalOverLab, modalId, visible, maskCloseable, onClose, closeable }) {
  const navigate = useNavigate();
  const onMaskClicks = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const { data: footstepData } = useQuery(['fstdata'], () => ReadFootStep(modalId), {
    enabled: !!(modalOverLab === 1 || modalOverLab === 3),
    onSuccess: (response) => {},
    onError: (response) => {},
  });

  const { data: requestData } = useQuery(['reqdata'], () => ReadConsultDetail(modalId), {
    enabled: !!(modalOverLab === 2),
    onSuccess: (response) => {},
    onError: (response) => {},
  });

  const onDetailPage = () => {
    if (modalOverLab === 1 || modalOverLab === 3) {
      onClose();
      navigate(`${modalId}`);
    }
    if (modalOverLab === 2) {
      onClose();
      navigate(`/myconsultdetail/${requestData?.id}`);
    }
  };

  return (
    <>
      <ModalBackground visible={visible} />
      <ModalWrapper onClick={maskCloseable ? onMaskClicks : null} tabIndex={-1} visible={visible}>
        <ModalInner tabIndex="0" className="modal-inner" onClick={(e) => e.stopPropagation()}>
          {closeable && (
            <>
              <DetailBtn
                onClick={() => {
                  onDetailPage();
                }}
              >
                자세히 보기
              </DetailBtn>
              <ContentContainer>
                <BsImg src={defaultImg} />
                <ContentWrap>
                  <MarkerBox>
                    {modalOverLab === 1 ? <MarkerImg src={Marker_FootStep} /> : modalOverLab === 2 ? <MarkerImg src={Marker_request} /> : modalOverLab === 3 ? <MarkerImg src={Marker_All} /> : null}
                    {modalOverLab === 1 ? <MarkerP>발품기록</MarkerP> : modalOverLab === 2 ? <MarkerP>상담</MarkerP> : modalOverLab === 3 ? <MarkerP>발품기록 | 상담</MarkerP> : null}
                  </MarkerBox>
                  {modalOverLab === 1 ? <AddressP>{footstepData?.title}</AddressP> : modalOverLab === 2 ? <AddressP>{requestData?.title}</AddressP> : modalOverLab === 3 ? <AddressP>{footstepData?.title}</AddressP> : null}
                  {modalOverLab === 1 ? <ReviewP>{footstepData?.review}</ReviewP> : modalOverLab === 2 ? <ReviewP>{requestData?.consultMessage}</ReviewP> : modalOverLab === 3 ? <ReviewP>{footstepData?.review}</ReviewP> : null}
                </ContentWrap>
              </ContentContainer>
            </>
          )}
        </ModalInner>
      </ModalWrapper>
    </>
  );
}

const ModalBackground = styled.div`
  position: absolute;
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
  height: 242px;
  overflow-y: scroll;
  bottom: 0;
  border-radius: 1rem 1rem 0 0;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const DetailBtn = styled.div`
  width: 60px;
  height: 12px;
  margin-top: 12px;
  margin-left: 284px;
  color: var(--primary2-400);
  font-family: var(--button-font-family);
  font-size: var(--button_Small-font-size);
  font-weight: var(--button_Small-font-weight);
  line-height: var(--button_Small-line-height);
  letter-spacing: var(--button_Small-letter-spacing);
  cursor: pointer;
`;

const ContentContainer = styled.div`
  width: 328px;
  height: 124px;
  display: flex;
  flex-direction: row;
`;

const BsImg = styled.img`
  width: 124px;
  height: 124px;
  border-radius: 8px;
  margin-left: 16px;
  margin-top: 12px;
`;

const ContentWrap = styled.div`
  width: 188px;
  height: 130px;
  display: flex;
  flex-direction: column;
`;

const MarkerBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const MarkerImg = styled.img`
  width: 24px;
  height: 24px;
  margin-top: 14px;
  margin-left: 16px;
`;

const MarkerP = styled.div`
  font-family: var(--body-font-family);
  font-size: var(--body_Small-font-size);
  font-weight: var(--body_Small-font-weight);
  line-height: var(--body_Small-line-height);
  letter-spacing: var(--body_Small-letter-spacing);
  margin-top: 18px;
  margin-left: 8px;
  cursor: default;
  color: #3fb00a;
`;

const AddressP = styled.div`
  width: 188px;
  height: 48px;
  margin-left: 16px;
  margin-top: 4px;
  font-family: var(--body-font-family);
  font-size: var(--body_Large-font-size);
  font-weight: var(--body_Large-font-weight);
  line-height: var(--body_Large-line-height);
  letter-spacing: var(--body_Large-letter-spacing);
  cursor: default;
`;

const ReviewP = styled.div`
  width: 188px;
  height: 60px;
  margin-left: 16px;
  margin-top: 4px;
  cursor: default;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: var(--gray4);
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
`;
