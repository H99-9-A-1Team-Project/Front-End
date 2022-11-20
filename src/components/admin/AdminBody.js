import { useQuery } from '@tanstack/react-query';
import React from 'react';
import styled from 'styled-components';
import { ReadSignUpList } from '../../api/apiGET';
import AdminBodyItem from './AdminBodyItem';

export default function AdminBody() {
  const { data } = useQuery(['signuplist'], ReadSignUpList, {
    refetchOnWindowFocus: false,
  });

  return (
    <StAdminBodyLayout>
      {data?.map((item) => {
        return <AdminBodyItem item={item} key={item.email} />;
      })}
    </StAdminBodyLayout>
  );
}
const StAdminBodyLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  .container {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-bottom: 4px solid var(--gray6);
  }
  div {
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
