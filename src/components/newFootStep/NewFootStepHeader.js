import React from 'react';
import styled from 'styled-components';
import Path_left from './sources/path_left.png';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { SendNfsc } from '../../api/apiPOST';
import { nfsData, nfsImgData, nfsPreviewImgData, nfsrPath, nfsImgState, nfsRoadAddress, nfsDetailAddress, NfsToast, nfsRoadEssentialState, nfsDetailEssentialState, nfsImgEssentialState } from '../../store/store';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';
import ToastMsg from '../../global/components/ToastMessage';
import { useEffect } from 'react';
import { useState } from 'react';

export default function NewFootStepAddress() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { handleSubmit } = useForm();
  const nfscData = useRecoilValue(nfsData);
  const nfscImgData = useRecoilValue(nfsImgData);
  const [nfshData, setNfshData] = useRecoilState(nfsData);
  const [nfshImgData, setNfshImgData] = useRecoilState(nfsImgData);
  const [nfshPreviewImgData, setNfshPreviewImgData] = useRecoilState(nfsPreviewImgData);
  const [nfshrPath, setNfshrPath] = useRecoilState(nfsrPath);
  const [nfshImgState, setNfshImgState] = useRecoilState(nfsImgState);
  const [nfshRoadAddress, setNfshRoadAddress] = useRecoilState(nfsRoadAddress);
  const [nfshDetailAddress, setNfshDetailAddress] = useRecoilState(nfsDetailAddress);
  const [ToastState, setToastState] = useRecoilState(NfsToast);
  const setRoadEssential = useSetRecoilState(nfsRoadEssentialState);
  const setDetailEssential = useSetRecoilState(nfsDetailEssentialState);
  const setImgEssential = useSetRecoilState(nfsImgEssentialState);
  const handleToast = () => {
    setToastState(true);
  };

  const { mutate: nfsMutate } = useMutation(SendNfsc, {
    onSuccess: (response) => {
      console.log('zsdd', response);
      handleToast();
    },
    onError: (response) => {
      console.log(response);
    },
  });

  const onSendData = () => {
    if (nfshRoadAddress !== '도로명 주소 검색' && nfshDetailAddress !== '' && nfshImgData.length !== 0) {
      const formData = new FormData();
      const blob = new Blob([JSON.stringify(nfscData)], { type: 'application/json' });
      nfscImgData.map((prop) => formData.append('file', prop));
      formData.append('post', blob);
      nfsMutate(formData);
      onDefault();
    } else {
      if (nfshRoadAddress === '도로명 주소 검색') setRoadEssential(true);
      if (nfshDetailAddress === '') setDetailEssential(true);
      if (nfshImgData.length === 0) setImgEssential(true);
    }
  };

  const onDefault = () => {
    queryClient.invalidateQueries(['premisesData']);
    queryClient.invalidateQueries(['fstsearchData']);
    navigate('/footstepmain');
  };

  return (
    <Container>
      <HeaderBox>
        <ImgPathLeft
          src={Path_left}
          onClick={() => {
            onDefault();
          }}
        />

        <HeadlineBox>
          <HeaderHeadline>발품기록</HeaderHeadline>
          <CreateBtn onClick={() => onSendData()}>추가</CreateBtn>
        </HeadlineBox>
      </HeaderBox>
    </Container>
  );
}

const Container = styled.div`
  height: 64px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--gray6);
`;

const HeaderBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

const ImgPathLeft = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 16px;
  margin-top: 20px;
  cursor: pointer;
`;

const HeadlineBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const HeaderHeadline = styled.p`
  margin-left: 8px;
  margin-top: 20px;
  font-family: var(--body-font-family);
  font-size: var(--body_Large-font-size);
  font-weight: var(--body_Large-font-weight);
  line-height: var(--body_Large-line-height);
  letter-spacing: var(--body_Large-letter-spacing);
  cursor: default;
`;

const CreateBtn = styled.button`
  margin-top: 22px;
  margin-right: 16px;
  width: 40px;
  background-color: white;
  font-family: var(--button-font-family);
  font-size: var(--button_Large-font-size);
  font-weight: var(--button_Large-font-weight);
  line-height: var(--button_Large-line-height);
  letter-spacing: var(--button_Large-letter-spacing);
  border: none;
  color: var(--primary2-400);
  cursor: pointer;
`;
