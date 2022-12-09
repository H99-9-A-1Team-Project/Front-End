import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import styled from 'styled-components';
import search from '../../global/sources/Search.svg';
import close from '../../global/sources/Close.svg';

import { ReadSearchAnsweredList, ReadSearchMyConsult, ReadSearchWaitList } from '../../api/apiGET';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { searchAnswered, searchConsult, searchState, searchWait } from '../../store/store';
import { useEffect } from 'react';

export default function MyConsultSearch() {
  const [keyword, setKeyword] = useState('');
  const setSearchConsultData = useSetRecoilState(searchConsult);
  const setSearchWaitData = useSetRecoilState(searchWait);
  const setSearchAnsweredData = useSetRecoilState(searchAnswered);
  const [searchStateData, setSearchState] = useRecoilState(searchState);

  const onChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };
  const onSubmitHandler = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (window.location.pathname === '/myconsult') {
      onSearchMyConsult();
    } else {
      onSearchAnsweredConsult();
      onSearchWaitConsult();
    }
    // if (window.location.pathname === '/answeredlist'||) {
    //   onSearchAnsweredConsult();
    // }
    // if (window.location.pathname === '/myconsult') {
    //   onSearchMyConsult();
    // }
  };
  useEffect(() => {
    setSearchState(false);
    setSearchConsultData([]);
    setSearchWaitData([]);
    setSearchAnsweredData([]);
  }, []);
  useEffect(() => {
    if (!keyword) {
      setSearchState(false);
      setSearchConsultData([]);
      setSearchWaitData([]);
      setSearchAnsweredData([]);
    }
  }, [keyword]);

  const { mutate: onSearchMyConsult } = useMutation(() => ReadSearchMyConsult(keyword), {
    onSuccess: (config) => {
      setSearchConsultData(config);
    },
  });
  const { mutate: onSearchWaitConsult } = useMutation(() => ReadSearchWaitList(keyword), {
    onSuccess: (config) => {
      setSearchWaitData(config);
    },
  });
  const { mutate: onSearchAnsweredConsult } = useMutation(() => ReadSearchAnsweredList(keyword), {
    onSuccess: (config) => {
      setSearchAnsweredData(config);
    },
  });

  return (
    <StMyConsultSearchLayout>
      <form
        className="search"
        onSubmit={(e) => {
          onSubmitHandler(e);
          setSearchState(true);
        }}
      >
        <input id="searchinput" type="text" name="keyword" placeholder="주소를 입력하여 검색" value={keyword} onChange={onChangeKeyword} />
        <button className="search-button" type="button">
          {searchStateData ? (
            <img
              className="close_button"
              src={close}
              alt="close"
              onClick={() => {
                setSearchState(false);
                setKeyword('');
              }}
            ></img>
          ) : (
            <img
              src={search}
              alt="search"
              onClick={() => {
                onSubmitHandler();
                setSearchState(true);
              }}
            ></img>
          )}
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
  @media (max-width: 500px) {
    width: 100%;
  }
  .search {
    display: flex;
    flex-direction: row;
    border: 1px solid var(--gray6);
    width: 328px;
    height: 45px;
    border-radius: 8px;
    overflow: hidden;
    @media (max-width: 500px) {
      box-sizing: border-box;
      margin-left: 16px;
      margin-right: 16px;
      width: 100%;
    }
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
