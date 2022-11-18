import React from 'react';
import styled from 'styled-components';
import search from './sources/search.png';

export default function MyConsultSearch() {
  return (
    <StMyConsultSearchLayout>
      <form className="search">
        <input type="text" name="nnn" placeholder="주소를 입력하여 검색" />
        <button className="search-button">
          <img src={search} alt=""></img>
        </button>
      </form>
    </StMyConsultSearchLayout>
  );
}

const StMyConsultSearchLayout = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  margin: 24px auto 8px auto;
  .search {
    display: flex;
    flex-direction: row;
    border: 1px solid var(--gray6);
    width: 328px;
    height: 45px;
    border-radius: 8px;
    overflow: hidden;
    input {
      border-radius: 2px;
      border: none;
      width: 100%;
      line-height: 17px;
      font-size: 14px;
      padding: 12px 62px 11px 12px;
      outline: none;
      background-color: white;
      ::placeholder {
        font-family: var(--button-font-family);
        font-size: var(--button_Medium-font-size);
        font-weight: var(--button_Medium-font-weight);
        line-height: var(--button_Medium-line-height);
        letter-spacing: var(--button_Medium-letter-spacing);
        color: var(--gray2);
      }
    }
  }
  .search-button {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-family: inherit;
    border: 0;
    padding: 0;
    margin: 0;
    background-color: white;
    img {
      height: 24px;
      width: 24px;
      background-color: white;
      margin-right: 20px;
    }
  }
`;
