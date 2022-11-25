import styled from 'styled-components';

export default function Layout({ children }) {
  return <StLayout>{children}</StLayout>;
}

const StLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border: 1px solid aqua;
  overflow-y: auto;
`;
