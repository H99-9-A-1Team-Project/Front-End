import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function RequestProgress() {
  const [rqProgressBar, setRqProgressBar] = useState(1);
  useEffect(() => {
    if (window.location.pathname === '/request1') {
      setRqProgressBar(1);
    }
    if (window.location.pathname === '/request2') {
      setRqProgressBar(2);
    }
    if (window.location.pathname === '/request3') {
      setRqProgressBar(3);
    }
    if (window.location.pathname === '/requestcheck') {
      setRqProgressBar(3);
    }
  }, [rqProgressBar]);
  return (
    <>
      <ProgressContainer>
        <RqProgress value={rqProgressBar} max="3" />
      </ProgressContainer>
    </>
  );
}

const ProgressContainer = styled.div`
  height: 4px;
  display: flex;
  background-color: orange;
`;

const RqProgress = styled.progress`
  width: 100%;
  height: 4px;
  background-color: white;

  ::-webkit-progress-bar {
    background-color: white;
  }

  ::-webkit-progress-value {
    background-color: orange;
  }
`;
