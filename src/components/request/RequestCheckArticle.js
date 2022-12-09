import React from 'react';
import styled from 'styled-components';
import '../../global/global.css';
import { consultNumber, requireAddress, rqDetailAddress, rqInfo } from '../../store/store';
import { useRecoilState, useRecoilValue } from 'recoil';
import CheckOFF from './source/rq2CheckOFF.png';
import CheckON from './source/rq2CheckON.png';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { SendRequest } from '../../api/apiPOST';
import { useEffect } from 'react';

export default function RequestCheck() {
  const navigate = useNavigate();
  const [rqcRoadAddress, setRqcRoadAddress] = useRecoilState(requireAddress);
  const [rqcDtAddress, setRqcDtAddress] = useRecoilState(rqDetailAddress);
  const [rqcInfo, setRqcInfo] = useRecoilState(rqInfo);
  const consultNum = useRecoilValue(consultNumber);
  const { mutate } = useMutation(SendRequest, {
    onSuccess: (response) => {
      setRqcInfo({ title: '', coordX: '', coordY: '', check1: 0, check2: 0, check3: 0, check4: 0, check5: 0, check6: 0, consultMessage: '' });
      setRqcRoadAddress('도로명 주소 검색');
      setRqcDtAddress('');
      console.log(response);
      navigate('/request');
    },
    onError: (response) => {
      console.log(response);
      console.log('요청보내기 실패');
    },
  });

  const onSend = () => {
    mutate(rqcInfo);
  };

  const onBackRq3 = () => {
    if (rqcInfo.consultMessage === '없음') {
      setRqcInfo({ ...rqcInfo, consultMessage: '' });
    }
    navigate('/request3');
  };
  useEffect(() => {
    if (consultNum >= 2) {
      navigate('/request');
    }
  }, []);
  console.log(consultNum);
  return (
    <RqCheckContainer>
      <HeadlineNav>신청완료 후 수정이 불가능해요</HeadlineNav>
      <AddressBox>
        <BoxHeader>주소</BoxHeader>
        <ModifyBtn
          onClick={() => {
            navigate('/request1');
          }}
        >
          재수정
        </ModifyBtn>
      </AddressBox>
      <BodyP1>도로명 주소</BodyP1>
      <DetailAddressBox>
        <DetailAddress>{rqcRoadAddress}</DetailAddress>
      </DetailAddressBox>
      <BodyP2>이하 상세주소</BodyP2>
      <DetailAddressBox>
        <DetailAddress>{rqcDtAddress}</DetailAddress>
      </DetailAddressBox>
      <CheckBox>
        <BoxHeader>궁금한 사항</BoxHeader>
        <ModifyBtn
          onClick={() => {
            navigate('/request2');
          }}
        >
          재수정
        </ModifyBtn>
      </CheckBox>
      {!!rqcInfo.check1 && (
        <>
          <ContentBox>
            {rqcInfo.check1 === 1 ? <CheckImg src={CheckON} /> : <CheckImg src={CheckOFF} />}
            <ContentP>불법 건축물인지 확인하고 싶어요</ContentP>
          </ContentBox>
          <HozBar />
        </>
      )}
      {!!rqcInfo.check2 && (
        <>
          <ContentBox>
            {rqcInfo.check2 === 1 ? <CheckImg src={CheckON} /> : <CheckImg src={CheckOFF} />}
            <ContentP>건축물의 층별 구조와 용도를 알고싶어요</ContentP>
          </ContentBox>
          <HozBar />
        </>
      )}
      {!!rqcInfo.check3 && (
        <>
          <ContentBox>
            {rqcInfo.check3 === 1 ? <CheckImg src={CheckON} /> : <CheckImg src={CheckOFF} />}
            <ContentP>건축물의 소유자 현황을 알고싶어요</ContentP>
          </ContentBox>
          <HozBar />
        </>
      )}
      {!!rqcInfo.check4 && (
        <>
          <ContentBox>
            {rqcInfo.check4 === 1 ? <CheckImg src={CheckON} /> : <CheckImg src={CheckOFF} />}
            <ContentP>언제 지어졌는지 알고싶어요</ContentP>
          </ContentBox>
          <HozBar />
        </>
      )}
      {!!rqcInfo.check5 && (
        <>
          <ContentBox>
            {rqcInfo.check5 === 1 ? <CheckImg src={CheckON} /> : <CheckImg src={CheckOFF} />}
            <ContentP>전반적인 등기 정보를 알고싶어요</ContentP>
          </ContentBox>
          <HozBar />
        </>
      )}
      {!!rqcInfo.check6 && (
        <>
          <ContentBox>
            {rqcInfo.check6 === 1 ? <CheckImg src={CheckON} /> : <CheckImg src={CheckOFF} />}
            <ContentP>전/월세 계약하는데 안전할지 점검받고 싶어요</ContentP>
          </ContentBox>
        </>
      )}
      <MsgBox>
        <BoxHeader>전달메세지</BoxHeader>
        <ModifyBtn
          onClick={() => {
            onBackRq3();
          }}
        >
          재수정
        </ModifyBtn>
      </MsgBox>
      <CommentBox>
        <CommentArea>{rqcInfo.consultMessage}</CommentArea>
        {/* value={rqcInfo.consultMessage}  */}
      </CommentBox>
      <BtnBox>
        <SendBtn
          onClick={() => {
            onSend();
          }}
        >
          신청하기
        </SendBtn>
      </BtnBox>
    </RqCheckContainer>
  );
}

const RqCheckContainer = styled.div`
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const HeadlineNav = styled.div`
  margin-left: 16px;
  margin-top: 16px;
  background: none;
  font-family: var(--button-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
  cursor: default;
`;

const AddressBox = styled.div`
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: none;
  margin-top: 34px;
`;

const BoxHeader = styled.div`
  margin-top: 11px;
  margin-left: 16px;
  font-family: var(--headline-font-family);
  font-size: var(--headline_Small-font-size);
  font-weight: var(--headline_Small-font-weight);
  line-height: var(--headline_Small-line-height);
  letter-spacing: var(--headline_Small-letter-spacing);
  background: none;
  cursor: default;
`;

const ModifyBtn = styled.div`
  width: 54px;
  height: 40px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  cursor: pointer;
  color: var(--primary2-400);
  font-family: var(--button-font-family);
  font-size: var(--button_Medium-font-size);
  font-weight: var(--button_Medium-font-weight);
  line-height: var(--button_Medium-line-height);
  letter-spacing: var(--button_Medium-letter-spacing);
`;

const BodyP1 = styled.p`
  margin-top: 6px;
  margin-left: 17px;
  background: none;
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
  cursor: default;
`;

const BodyP2 = styled.p`
  margin-top: 16px;
  margin-left: 17px;
  background: none;
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
  cursor: default;
`;

const DetailAddressBox = styled.div`
  margin-left: 17px;
  width: 328px;
  height: 44px;
  border: 1px solid var(--gray6);
  border-radius: 4px;
  background: none;
`;

const DetailAddress = styled.div`
  width: 304px;
  height: 44px;
  margin-left: 12px;
  display: flex;
  align-items: center;
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
  background: none;
  cursor: default;
`;

const CheckBox = styled.div`
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: none;
  margin-top: 16px;
`;

const HozBar = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--gray6);
  margin-top: 8px;
`;

const CheckImg = styled.img`
  width: 24px;
  height: 24px;
  background: none;
  margin-top: 12px;
`;

const ContentBox = styled.div`
  width: 328px;
  height: 48px;
  display: flex;
  flex-direction: row;
  margin-left: 16px;
  margin-top: 8px;
  background: none;
  cursor: pointer;
`;

const ContentP = styled.div`
  margin-left: 15px;
  margin-top: 16px;
  background: none;
  font-family: var(--button-font-family);
  font-size: var(--button_Medium-font-size);
  font-weight: var(--button_Medium-font-weight);
  line-height: var(--button_Medium-line-height);
  letter-spacing: var(--button_Medium-letter-spacing);
`;

const MsgBox = styled.div`
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: none;
  margin-top: 12px;
`;

const CommentBox = styled.div`
  width: 328px;
  height: 158px;
  margin-left: 16px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid var(--gray6);
  border-radius: 8px;
`;

const CommentArea = styled.div`
  width: 304px;
  height: 126px;
  background-color: white;
  border: none;
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
  cursor: default;
  margin-top: 16px;
  margin-left: 12px;
`;

const BtnBox = styled.div`
  background: none;
`;

const SendBtn = styled.button`
  width: 328px;
  height: 60px;
  margin-left: 16px;
  margin-top: 24px;
  margin-bottom: 32px;
  color: white;
  background-color: var(--primary2-400);
  font-family: var(--button-font-family);
  font-size: var(--button_Large-font-size);
  font-weight: var(--button_Large-font-weight);
  line-height: var(--button_Large-line-height);
  letter-spacing: var(--button_Large-letter-spacing);
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;
