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
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    /* display: none;  스크롤바가 안보이게 할수 있음(기능은 살아있음) */
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    height: 20%; /* 스크롤바의 길이 */
    background: var(--gray5); /* 스크롤바의 색상 */
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background: none; /*스크롤바 뒷 배경 색상*/
  }
`;
