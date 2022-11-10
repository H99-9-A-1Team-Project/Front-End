import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import default_profile from '../../sources/images/default_profile.png';
import ToastUiEditor from './ToastUiEditor';
import ToastUiViewer from './ToastUiViewer';

export default function ConsultingDetailComponent() {
  const navigate = useNavigate();

  return (
    <StMyPageBodyWrap>
      <button className="back-button" onClick={() => navigate(-1)}>
        뒤로가기
      </button>
      <div className="user-container">
        <div className="user-container-header">
          <div>주소</div>
          <div>건축물 대장</div>
        </div>
        <div>요청메세지</div>
        <div>
          요청 메세지요청 메세지요청 메세지요청 메세지요청 메세지요청 메세지요청 메세지요청 메세지요청 메세지요청
          메세지요청 메세지요청 메세지요청 메세지요청
        </div>
        <div>2022.10.21</div>
      </div>
      <div className="realtor-container">
        <div className="realtor-container-header">
          <div className="realtor-container-header-inner">
            <div>답변</div>
            <img src={default_profile} alt="profile-img" />
            <div>username님의 답변입니다.</div>
          </div>
          <div className="realtor-date">2022.10.21</div>
        </div>
        <div className="realtor-container-body">
          {false ? (
            <div>
              text text text text text text text text text text text text text text text text text text text text text
              text text text text text text text
              <p></p>
              <img src={default_profile} alt="" />
              <p></p>
              text text text text text text text text text text text text text text text text text text text text text
              text text text text text text text text text text text text text text text text text text text text text
              text text text text text text text text text text text text text text
              <p></p>
              <img src={default_profile} alt="" />
              <p></p>
              text text text text text text text text text text text text text text text text text text text text text
              text text text text text text text text text text text text text text text text text text text text text
              text text text text text text text text text text text text text text
            </div>
          ) : (
            <ToastUiEditor />
          )}
        </div>
      </div>
      {/* 뷰어 활용해서 렌더잉 */}
      {/* <ToastUiViewer /> */}
    </StMyPageBodyWrap>
  );
}

const StMyPageBodyWrap = styled.div`
  width: 800px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 50px auto;
  gap: 10px;
  border: 1px solid black;
  padding: 10px;
  .back-button {
    width: 80px;
  }
  .editor {
    width: 90%;
  }
  .user-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    border-bottom: 1px solid gray;
  }
  .user-container-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .realtor-container {
    display: flex;
    flex-direction: column;
    margin-top: 0;
  }
  .realtor-container-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    img {
      border-radius: 100%;
      width: 40px;
      height: 40px;
    }
  }
  .realtor-container-header-inner {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }
  .realtor-container-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
