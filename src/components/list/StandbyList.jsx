import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Container from './Container';

export default function StandbyList() {
  const navigate = useNavigate();
  const [listState, setListState] = useState(0);
  const [ansState, setAnsState] = useState(0, 1, 2);

  return (
    <StMyPageBodyWrap>
      <button className="back-button" onClick={() => navigate(-1)}>
        뒤로가기
      </button>
      <form className="search">
        <button className="game-info-search__button">
          <img
            src="data:image/jpeg;base64,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"
            alt=""
          ></img>
        </button>
        <input type="text" name="keyword" placeholder="주소를 입력하여 검색" />
      </form>

      <div className="consulting-wrap">
        <Container listState={listState} ansState={ansState} />
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
  .back-button {
    width: 80px;
  }
  .search {
    display: flex;
    flex-direction: row;
    border: 1px solid black;
    input {
      border-radius: 2px;
      border: none;
      width: 100%;
      line-height: 17px;
      font-size: 14px;
      padding: 12px 62px 11px 12px;
      outline: none;
    }
  }
  .game-info-search__button {
    cursor: pointer;
    font-family: inherit;
    border: 0;
    padding: 0;
    margin: 0;
    background-color: white;
    img {
      vertical-align: middle;
      width: 30px;
    }
  }
  ul {
    display: flex;
    flex-direction: row;
    gap: 20px;
    border-bottom: 1px solid gray;
    padding-bottom: 10px;
  }
  .consulting-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 30px;
  }
  .consulting-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid black;
  }
  .container-header {
    display: flex;
    flex-direction: row;
    img {
      border-radius: 100%;
      width: 40px;
      height: 40px;
    }
  }
  .consulting-inner-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .consulting-box {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  .consulting-box-bottom {
    display: flex;
    flex-direction: row;
    gap: 10px;
    font-size: 14px;
    color: gray;
  }
  .type-second {
    border-left: 1px solid gray;
    padding-left: 10px;
  }
`;
