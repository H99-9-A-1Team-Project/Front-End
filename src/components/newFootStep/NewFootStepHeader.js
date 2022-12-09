import React from 'react';
import styled from 'styled-components';
import Path_left from './sources/path_left.png';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { SendNfsc } from '../../api/apiPOST';
import { nfsData, nfsImgData, nfsRoadAddress, nfsDetailAddress, NfsToast, nfsRoadEssentialState, nfsDetailEssentialState, nfsImgEssentialState } from '../../store/store';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';

export default function NewFootStepAddress() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const nfscData = useRecoilValue(nfsData);
  const nfscImgData = useRecoilValue(nfsImgData);
  const nfshImgData = useRecoilValue(nfsImgData);
  const nfshRoadAddress = useRecoilValue(nfsRoadAddress);
  const nfshDetailAddress = useRecoilValue(nfsDetailAddress);
  const setToastState = useSetRecoilState(NfsToast);
  const setRoadEssential = useSetRecoilState(nfsRoadEssentialState);
  const setDetailEssential = useSetRecoilState(nfsDetailEssentialState);
  const setImgEssential = useSetRecoilState(nfsImgEssentialState);
  const handleToast = () => {
    setToastState(true);
  };

  const { mutate: nfsMutate } = useMutation(SendNfsc, {
    onSuccess: (response) => {
      queryClient.invalidateQueries(['qqq']);
      handleToast();
      navigate('/footstepmain');
    },
    onError: (response) => {},
  });

  const onSendData = () => {
    if (nfshRoadAddress !== '도로명 주소 검색' && nfshDetailAddress !== '' && nfshImgData.length !== 0) {
      const formData = new FormData();
      const blob = new Blob([JSON.stringify(nfscData)], { type: 'application/json' });
      nfscImgData.map((prop) => formData.append('file', prop));
      formData.append('post', blob);
      nfsMutate(formData);

      // onDefault();
    } else {
      if (nfshRoadAddress === '도로명 주소 검색') setRoadEssential(true);
      if (nfshDetailAddress === '') setDetailEssential(true);
      if (nfshImgData.length === 0) setImgEssential(true);
    }
  };

  // const onDefault = () => {

  // };

  return (
    <Container>
      <HeaderBox>
        <ImgPathLeft
          src={Path_left}
          onClick={() => {
            navigate('/footstepmain');
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
  position: fixed;
  background-color: white;
  border-bottom: 1px solid var(--gray6);
  @media (max-width: 500px) {
    width: 100%;
    position: static;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const HeaderBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  @media (max-width: 500px) {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
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
  @media (max-width: 500px) {
    align-items: center;
    margin-top: 20px;
  }
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
  @media (max-width: 500px) {
    margin: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const CreateBtn = styled.button`
  margin-top: 22px;
  margin-left: 207px;
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
  @media (max-width: 500px) {
    margin: 0;
    margin-right: 22px;
  }
`;
