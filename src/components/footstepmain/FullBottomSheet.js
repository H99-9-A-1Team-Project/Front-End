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

export default function FullBottomSheet({ sortName, searchData, requestData, footStepData, Fbvisible, FbmaskCloseable, FbonClose, Fbcloseable }) {
  const navigate = useNavigate();

  const onMaskClicks = (e) => {
    if (e.target === e.currentTarget) {
      FbonClose(e);
    }
  };

  const onNavigate = (state, id) => {
    if (state === '상담' || state === 2) {
      FbonClose();
      navigate(`/myconsultdetail/${id}`);
    }
    if (state === '발품' || state === 1 || state === 3) {
      FbonClose();
      navigate(`${id}`);
    }
  };

  return (
    <>
      <ModalBackground visible={Fbvisible} />
      <ModalWrapper onClick={FbmaskCloseable ? onMaskClicks : null} tabIndex={-1} visible={Fbvisible}>
        <ModalInner tabIndex="0" className="modal-inner" onClick={(e) => e.stopPropagation()}>
          {Fbcloseable && (
            <>
              {sortName === '발품'
                ? footStepData.map((data) => {
                    return (
                      <>
                        <ContentContainer
                          onClick={() => {
                            onNavigate('발품', data.id);
                          }}
                        >
                          <BsImg src={defaultImg} />
                          <ContentWrap>
                            <MarkerBox>
                              <MarkerImg src={Marker_FootStep} />
                              <MarkerP>발품</MarkerP>
                            </MarkerBox>
                            <AddressP>{data.title}</AddressP>
                            <ReviewP>{data.review}</ReviewP>
                          </ContentWrap>
                        </ContentContainer>
                      </>
                    );
                  })
                : sortName === '상담'
                ? requestData.map((data) => {
                    return (
                      <>
                        <ContentContainer
                          onClick={() => {
                            onNavigate('상담', data.id);
                          }}
                        >
                          <BsImg src={defaultImg} />
                          <ContentWrap>
                            <MarkerBox>
                              <MarkerImg src={Marker_request} />
                              <MarkerP>상담</MarkerP>
                            </MarkerBox>
                            <AddressP>{data.title}</AddressP>
                            <ReviewP>{data.review}</ReviewP>
                          </ContentWrap>
                        </ContentContainer>
                      </>
                    );
                  })
                : sortName === '전체'
                ? searchData.map((data) => {
                    return (
                      <>
                        <ContentContainer
                          onClick={() => {
                            onNavigate(data.overLab, data.id);
                          }}
                        >
                          <BsImg src={defaultImg} />
                          <ContentWrap>
                            <MarkerBox>
                              {data.overLab === 1 ? (
                                <>
                                  <MarkerImg src={Marker_FootStep} />
                                  <MarkerP>발품</MarkerP>
                                </>
                              ) : data.overLab === 2 ? (
                                <>
                                  <MarkerImg src={Marker_request} />
                                  <MarkerP>상담</MarkerP>
                                </>
                              ) : data.overLab === 3 ? (
                                <>
                                  <MarkerImg src={Marker_All} />
                                  <MarkerP>발품기록 | 상담</MarkerP>
                                </>
                              ) : null}
                            </MarkerBox>
                            <AddressP>{data.title}</AddressP>
                            <ReviewP>{data.review}</ReviewP>
                          </ContentWrap>
                        </ContentContainer>
                      </>
                    );
                  })
                : null}
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
  @media (max-width: 500px) {
    width: 100%;
    top: 0;
    left: 0;
    transform: translate(0, 0);
    z-index: 15;
  }
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
  @media (max-width: 500px) {
    background-color: rgba(0, 0, 0, 0);
    width: 100%;
    z-index: 15;
    display: flex;
  }
`;
const ModalInner = styled.div`
  z-index: 2;
  position: fixed;
  width: 360px;
  background-color: white;
  height: 850px;
  bottom: 0;
  border-radius: 1rem 1rem 0 0;
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    /* display: none;  스크롤바가 안보이게 할수 있음(기능은 살아있음) */
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    height: 20%; /* 스크롤바의 길이 */
    background: var(--gray5); /* 스크롤바의 색상 */
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background: none; /*스크롤바 뒷 배경 색상*/
  }
  @media (max-width: 500px) {
    position: static;
    margin-right: auto;
    margin-left: auto;
    margin-top: auto;
  }
`;

const ContentContainer = styled.div`
  width: 328px;
  height: 124px;
  display: flex;
  flex-direction: row;
  margin-top: 40px;
  margin-bottom: 40px;
  cursor: pointer;
`;

const BsImg = styled.img`
  width: 124px;
  height: 124px;
  border-radius: 8px;
  margin-left: 16px;
  margin-top: 12px;
  cursor: pointer;
`;

const ContentWrap = styled.div`
  width: 188px;
  height: 130px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const MarkerBox = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;

const MarkerImg = styled.img`
  width: 24px;
  height: 24px;
  margin-top: 14px;
  margin-left: 16px;
  cursor: pointer;
`;

const MarkerP = styled.div`
  font-family: var(--body-font-family);
  font-size: var(--body_Small-font-size);
  font-weight: var(--body_Small-font-weight);
  line-height: var(--body_Small-line-height);
  letter-spacing: var(--body_Small-letter-spacing);
  margin-top: 18px;
  margin-left: 8px;

  color: #3fb00a;
  cursor: pointer;
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
  cursor: pointer;
`;

const ReviewP = styled.div`
  width: 188px;
  height: 60px;
  margin-left: 16px;
  margin-top: 4px;
  cursor: pointer;
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
