import styled from 'styled-components';

export default function MyPageLayout({ children }) {
  return <StMyPageLayout>{children}</StMyPageLayout>;
}

const StMyPageLayout = styled.div`
  width: 100%;
  max-width: 1920px;
  max-height: 938px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
