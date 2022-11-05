import styled from 'styled-components';

export default function MyPageBody() {
  return (
    <StMyPageBodyWrap>
      <div className="body-header">
        <div className="user-container">
          <img
            className="profile-img"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANQAAAB3CAMAAABMiJ5qAAAAA1BMVEWgoKAG03+7AAAAL0lEQVR4nO3BMQEAAADCoPVPbQhfoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAyYwMAAfzHSmYAAAAASUVORK5CYII="
            alt="profile-img"
          />
          <div className="user-name-box">
            <div>Username</div>
            <div>편집버튼</div>
          </div>
          <div>email</div>
        </div>
      </div>
      <div className="body-body">
        <div className="body-name">상담</div>

        <div className="body-content">
          진행중인 상담
          {true ? <div className="body-content-num">+23</div> : null}
          {/* 진행중인상담 true/false */}
        </div>
        <div className="body-name">계정</div>
        <div className="body-content">로그아웃</div>
        <div className="body-content">회원탈퇴</div>
      </div>
    </StMyPageBodyWrap>
  );
}

const StMyPageBodyWrap = styled.div`
  width: 600px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 50px auto;
  gap: 30px;
  border: 1px solid black;
  .body-header {
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-bottom: 1px solid gray;
  }
  .user-name-box {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
  .body-body {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .body-name {
    font-weight: bold;
  }
  .body-content {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 90%;
    border: 1px solid gray;
    margin: auto;
  }
  .body-content-num {
    border: 1px solid gray;
    border-radius: 10px;
  }
`;
