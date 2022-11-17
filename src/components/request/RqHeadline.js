import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { rqHeadline, rqHeadlinecount } from '../../store/store';

export default function RqHeadline() {
  const [rqHeadlineText, setRqHeadlineText] = useRecoilState(rqHeadline);

  const [rqHeadlineCount, setRqHeadlineCount] = useRecoilState(rqHeadlinecount);
  useEffect(() => {
    if (window.location.pathname === '/request1') {
      setRqHeadlineText(`상담받으실 매물 주소를\n알려주세요`);
      setRqHeadlineCount(`1/3`);
    }
    if (window.location.pathname === '/request2') {
      setRqHeadlineText(`어떤 것이\n궁금하신가요?`);
      setRqHeadlineCount(`2/3`);
    }
    if (window.location.pathname === '/request3') {
      setRqHeadlineText(`공인중개사님께\n전달할 메세지가 있나요?`);
      setRqHeadlineCount(`3/3`);
    }
    if (window.location.pathname === '/requestcheck') {
      setRqHeadlineText(`거의 완료되었습니다!\n입력된 내용이 맞나요?`);
      setRqHeadlineCount(`3/3`);
    }
  });

  return (
    <RqHeadlineContainer>
      <RqHeadlineText>{rqHeadlineText}</RqHeadlineText>
      <RqHeadlineCount>{rqHeadlineCount}</RqHeadlineCount>
    </RqHeadlineContainer>
  );
}

const RqHeadlineContainer = styled.div`
  height: 48px;
  margin-top: 24px;
  margin-left: 16px;
  display: flex;
  background: none;
`;

const RqHeadlineText = styled.div`
  width: 195px;
  white-space: pre-line;
  font-family: var(--headline-font-family);
  font-size: var(--headline_Medium-font-size);
  font-weight: var(--headline_Medium-font-weight);
  line-height: var(--headline_Medium-line-height);
  letter-spacing: var(--headline_Medium-letter-spacing);
  background: none;
  cursor: default;
`;

const RqHeadlineCount = styled.div`
  margin-left: 110px;
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
  background: none;
  cursor: default;
`;
