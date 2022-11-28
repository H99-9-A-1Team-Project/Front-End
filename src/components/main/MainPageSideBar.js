import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import x from '../../global/sources/x.png';

export default function MainPageSideBar({ visible, setVisible }) {
  const navigate = useNavigate();

  return (
    <StMainPageSideBarLayout visible={visible} className="StMainPageSideBarLayout">
      <div className="left_layout" onClick={() => setVisible(false)}></div>
      <div className="right_layout">
        <div className="sidebar_img" onClick={() => setVisible(false)}>
          <img src={x} alt="x" />
          닫기
        </div>
        <div className="sidebar_menu_1" onClick={() => navigate('/introduce')}>
          서비스 소개
        </div>
        <div className="sidebar_menu_2">제작팀</div>
        <div className="sidebar_menu_3">설문 참여</div>
      </div>
    </StMainPageSideBarLayout>
  );
}
const StMainPageSideBarLayout = styled.div`
  width: 100%;
  height: 100%;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  /* display: flex; */
  flex-direction: row;
  position: relative;
  z-index: ${(props) => (props.visible ? '1' : '-1')};
  /* right: 360px; */
  transform: ${(props) => (props.visible ? 'translateX(-360px)' : 'none')};
  transition: transform 0.5s;
  .sidebar_img {
    margin-top: 8px;
    border: none;
    cursor: pointer;
  }
  img {
    width: 20px;
    height: 20px;
    margin-right: 4px;
  }
  .left_layout {
    width: 160px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
  .right_layout {
    width: 200px;
    height: 100%;
    background-color: white;
    font-family: var(--headline-font-family);
    font-size: var(--button_Medium-font-size);
    font-weight: var(--button_Medium-font-weight);
    line-height: var(--button_Medium-line-height);
    letter-spacing: var(--button_Medium-letter-spacing);
    div {
      box-sizing: border-box;
      padding: 20px 8px;
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 40px;
      border-top: 1px solid var(--gray6);
      cursor: pointer;
    }
    .sidebar_img {
      margin-top: 8px;
      border: none;
    }
  }
`;
