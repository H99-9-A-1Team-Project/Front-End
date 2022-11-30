import { useQuery } from '@tanstack/react-query';
import React from 'react';
import styled from 'styled-components';
import { ReadDeleteList } from '../../api/apiGET';
import AdminBodyItem from './AdminBodyItem';

export default function AdminDeleteIdList() {
  const { data } = useQuery(['deletelist'], () => ReadDeleteList(1), {
    refetchOnWindowFocus: false,
    onSuccess: (config) => {
      return config.reverse();
    },
  });
  if (data !== undefined) {
    console.log(data);
  }
  return (
    <StAdminBodyLayout>
      {data.map((item, idx) => {
        return (
          <div className="container">
            {item.check1 && <div>개인정보 노출이 우려됩니다.</div>}
            {item.check2 && <div>매물 계약을 해서 필요가 없습니다.</div>}
            {item.check3 && <div>UX/UI가 불편합니다.</div>}
            {item.surveyMessage && <div>기타사유 : {item.surveyMessage}</div>}
          </div>
        );
      })}
    </StAdminBodyLayout>
  );
}
const StAdminBodyLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: white;
  .container {
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: white;
    border-bottom: 4px solid var(--gray6);
  }
  div {
    width: 100%;
    background-color: white;
  }
  img {
    width: 300px;
    height: 400px;
    margin-bottom: 10px;
  }
  .text-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: left;
    gap: 10px;
    div {
      margin-left: 10px;
    }
  }
  .buttons {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
    margin-bottom: 10px;
    button {
      margin-right: 10px;
    }
  }
`;
