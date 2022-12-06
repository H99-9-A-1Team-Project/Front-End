import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import styled from 'styled-components';
import search from '../../global/sources/Search.svg';
import { ReadSearchAnsweredList, ReadSearchMyConsult, ReadSearchWaitList } from '../../api/apiGET';

export default function MyConsultSearch() {
  const [keyword, setKeyword] = useState('');
  const [a, b] = useState(false);
  const onChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (window.location.pathname === '/waitlist') {
      onSearchWaitConsult();
    }
    if (window.location.pathname === '/answeredlist') {
      onSearchAnsweredConsult();
    }
    if (window.location.pathname === '/myconsult') {
      onSearchMyConsult();
    }
  };
  const { data: searchMyConsult, mutate: onSearchMyConsult } = useMutation(() => ReadSearchMyConsult(keyword), {
    onSuccess: (config) => {
      console.log(config);
    },
  });
  const { data: searchWaitConsult, mutate: onSearchWaitConsult } = useMutation(() => ReadSearchWaitList(keyword), {
    onSuccess: (config) => {
      console.log(config);
    },
  });
  const { data: searchAnsweredConsult, mutate: onSearchAnsweredConsult } = useMutation(() => ReadSearchAnsweredList(keyword), {
    onSuccess: (config) => {
      console.log(config);
    },
  });
  return (
    <StMyConsultSearchLayout>
      <form className="search" onSubmit={onSubmitHandler}>
        <input type="text" name="keyword" placeholder="주소를 입력하여 검색" onChange={onChangeKeyword} />
        <button className="search-button">
          <img src={search} alt="" onClick={onSubmitHandler}></img>
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
