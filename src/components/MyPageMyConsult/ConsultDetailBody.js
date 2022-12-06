import React, { useState } from 'react';
import styled from 'styled-components';
import ConsultDetailBodyContainer from './ConsultDetailBodyContainer';
import { ReactComponent as Pin } from '../../global/sources/Pin_fill.svg';
import { useQuery } from '@tanstack/react-query';
import { ReadConsultDetail } from '../../api/apiGET';

export default function ConsultDetailBody({ id }) {
  const [checkNum, setCheckNum] = useState(0);
  const { data } = useQuery(['consultdetail'], () => ReadConsultDetail(id), {
    refetchOnWindowFocus: false,
    onSuccess: (config) => {
      const checkList = config.checks.filter((item) => item === true);
      setCheckNum(checkList.length);
      if (config.consultMessage === null) {
        config.consultMessage = '전달메세지가 없습니다.';
      }
    },
  });
  return (
    data && (
      <ConsultDetailBodyLayout>
        <div className="answer_body_wrap">
          <div className="answer_body_title_wrap">
            <div className="title">주소</div>
            <div className="title_body">
              <Pin fill="rgba(60, 110, 239, 1)" style={{ marginRight: '8px' }} />
              {data.title}
            </div>
          </div>
          <div className="answer_body_info_wrap">
            <div className="title">{checkNum}개의 고민</div>
            <ConsultDetailBodyContainer data={data.checks} checkNum={checkNum} />
          </div>
          <div className="answer_body_message_wrap">
            <div className="title">전달메세지</div>
            <div className="message">{data.consultMessage}</div>
          </div>
        </div>
        <div className="date">{data.createdAt}</div>
      </ConsultDetailBodyLayout>
    )
  );
}
const ConsultDetailBodyLayout = styled.div`
  width: 360px;
  min-height: fit-content;
  background-color: var(--primary2-100);
  display: flex;
  flex-direction: column;

  .answer_body_wrap {
    width: 328px;
    min-height: fit-content;
    background-color: white;
    margin: 24px 16px 4px 16px;
    border-radius: 8px;
    .title {
      font-family: var(--button-font-family);
      font-size: var(--headline_Small-font-size);
      font-weight: var(--headline_Small-font-weight);
      line-height: var(--headline_Small-line-height);
      letter-spacing: var(--headline_Small-letter-spacing);
    }
    .answer_body_title_wrap,
    .answer_body_info_wrap,
    .answer_body_message_wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 16px 16px 0 16px;
      padding-bottom: 16px;
    }
  }
  .answer_body_title_wrap {
    border-bottom: 1px solid var(--gray6);
    .title_body {
      margin-top: 8px;
      display: flex;
      flex-direction: row;
      align-items: center;
      font-family: var(--button-font-family);
      font-size: var(--body_Large-font-size);
      font-weight: var(--body_Large-font-weight);
      line-height: var(--body_Large-line-height);
      letter-spacing: var(--body_Large-letter-spacing);
      img {
        width: 24px;
        height: 24px;
        margin-right: 8px;
      }
    }
  }
  .answer_body_info_wrap {
    border-bottom: 1px solid var(--gray6);
  }
  .answer_body_message_wrap {
    .title {
      margin-bottom: 8px;
    }
    .message {
      margin: 8px 0;
      font-family: var(--button-font-family);
      font-size: var(--body_Medium-font-size);
      font-weight: var(--body_Medium-font-weight);
      line-height: var(--body_Medium-line-height);
      letter-spacing: var(--body_Medium-letter-spacing);
    }
  }
  .date {
    margin-bottom: 24px;
    margin-left: 16px;
    font-family: var(--button-font-family);
    font-size: var(--body_Small-font-size);
    font-weight: var(--body_Small-font-weight);
    line-height: var(--body_Small-line-height);
    letter-spacing: var(--body_Small-letter-spacing);
    color: var(--primary2-200);
  }
`;
