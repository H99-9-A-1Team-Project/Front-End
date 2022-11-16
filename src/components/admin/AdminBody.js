import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReadSignUpList } from '../../api/apiGET';

export default function AdminBody() {
  const [List, setList] = useState([]);
  const { mutate: getSignUpList } = useMutation(ReadSignUpList, {
    onSuccess: (config) => {
      setList(config.data);
    },
  });

  useEffect(() => {
    getSignUpList();
  }, []);
  return (
    <StAdminBodyLayout>
      <div className="container">
        <div className="img-box">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWao3-8NkHtjRsz4NxObzKLTiFXfBhIkA-g-nw0rQMqw&s" alt="" />
        </div>
        <div className="text-box">
          <div>이메일</div>
          <div>닉네임</div>
          <div>신청일</div>
        </div>
        <div className="buttons">
          <button>거절</button>
          <button>승인</button>
        </div>
      </div>
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
