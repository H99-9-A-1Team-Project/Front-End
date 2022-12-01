import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import x from '../../global/sources/x.png';
import { sideTabBar } from '../../store/store';

export default function MainPageSideBar() {
  const navigate = useNavigate();
  const [visible, setVisible] = useRecoilState(sideTabBar);

  return (
    <StMainPageSideBarLayout visible={visible} className="StMainPageSideBarLayout">
      <div className="left_layout" onClick={() => setVisible(false)}></div>
      <div className="right_layout">
        <div
          className="sidebar_menu_1"
          onClick={() => {
            navigate('/introduce');
            setVisible(false);
          }}
        >
          서비스 소개
        </div>
        <div className="sidebar_menu_3">설문 참여</div>
      </div>
    </StMainPageSideBarLayout>
  );
}
const StMainPageSideBarLayout = styled.div`
  height: 100%;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  z-index: 1;
  right: 360px;
  flex-direction: row;
  position: relative;
  /* display: flex; */
  /* z-index: ${(props) => (props.visible ? '1' : '-1')}; */
  /* transform: ${(props) => (props.visible ? 'translateX(-360px)' : 'translateX(0)')}; */
  /* transition: transform 0.5s; */
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
    .sidebar_menu_1 {
      margin-top: 16px;
      border-top: none;
    }
  }
`;
