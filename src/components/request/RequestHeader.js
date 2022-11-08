import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function RequestHeader() {
  const navigate = useNavigate();
  return (
    <>
      <RequestHeaderContainer>
        {/* 뒤로가기 */}
        <BackBtn
          onClick={() => {
            navigate('/');
          }}
        >
          ← 상담 신청하기
        </BackBtn>
      </RequestHeaderContainer>
      <ClassifyLine />
    </>
  );
}

const RequestHeaderContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: left;
`;

const BackBtn = styled.p`
  margin-left: 50px;
  cursor: pointer;
`;

const ClassifyLine = styled.p`
  width: 100%;
  height: 1px;
  background-color: black;
`;
