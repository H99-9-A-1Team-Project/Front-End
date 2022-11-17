import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import styled from 'styled-components';
import { UpdateRealtorApproval } from '../../api/apiUPDATE';

export default function AdminBodyItem({ item }) {
  const updateRealtorApproval = useMutation((arg) => UpdateRealtorApproval(arg), {
    onSuccess: () => {
      queryClient.invalidateQueries(['signuplist']);
    },
  });
  const queryClient = useQueryClient();
  const onClickReject = () => {
    updateRealtorApproval.mutate({
      accountCheck: 2,
      email: item.email,
    });
  };
  const onClickApprove = () => {
    updateRealtorApproval.mutate({
      accountCheck: 1,
      email: item.email,
    });
  };

  if (item.accountCheck === 0) {
    return (
      <div className="container">
        <div className="img-box">
          <img src={`${item.license}`} alt="license" />
        </div>
        <div className="text-box">
          <div>{item.email}</div>
          <div>{item.nickname}</div>
          <div>{item.createDate}</div>
          <div>대기중</div>
        </div>
        <div className="buttons">
          <Stbutton1 onClick={() => onClickReject()}>거절</Stbutton1>
          <Stbutton1 onClick={() => onClickApprove()}>승인</Stbutton1>
        </div>
      </div>
    );
  }
  if (item.accountCheck === 1) {
    return (
      <div className="container">
        <div className="img-box">
          <img src={`${item.license}`} alt="license" />
        </div>
        <div className="text-box">
          <div>{item.email}</div>
          <div>{item.nickname}</div>
          <div>{item.createDate}</div>
        </div>
        <div className="buttons">
          <Stbutton1 onClick={() => onClickReject()}>거절</Stbutton1>
          <Stbutton2 onClick={() => onClickApprove()}>승인</Stbutton2>
        </div>
      </div>
    );
  }
  if (item.accountCheck === 2) {
    return (
      <div className="container">
        <div className="img-box">
          <img src={`${item.license}`} alt="license" />
        </div>
        <div className="text-box">
          <div>{item.email}</div>
          <div>{item.nickname}</div>
          <div>{item.createDate}</div>
        </div>
        <div className="buttons">
          <Stbutton2 onClick={() => onClickReject()}>거절</Stbutton2>
          <Stbutton1 onClick={() => onClickApprove()}>승인</Stbutton1>
        </div>
      </div>
    );
  }
}

const Stbutton1 = styled.button`
  background-color: white;
`;
const Stbutton2 = styled.button`
  background-color: gray;
`;
