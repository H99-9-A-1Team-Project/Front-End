import React from 'react';
import styled from 'styled-components';

export default function OuterLayout({ children }) {
  return <StMainPageLayout>{children}</StMainPageLayout>;
}
const StMainPageLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;
