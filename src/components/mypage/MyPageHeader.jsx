import styled from 'styled-components';

export default function MyPageHeader() {
  return (
    <StMyPageHeaderWrap>
      <div
        onClick={() => {
          '/';
        }}
      >
        뒤로
      </div>
      <div>프로필</div>
    </StMyPageHeaderWrap>
  );
}

const StMyPageHeaderWrap = styled.div`
  width: 100%;
  height: 80px;
  border-bottom: 1px solid gray;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
`;
