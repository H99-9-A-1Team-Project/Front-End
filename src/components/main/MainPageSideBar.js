import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
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
  position: absolute;
  top: 0vh;
  height: 100%;
  z-index: 1;
  flex-direction: row;
  opacity: ${(props) => (props.visible ? '1' : '0')};
  pointer-events: ${(props) => (props.visible ? 'auto' : 'none')};
  display: flex;
  transition: opacity 0.2s;
  @media (max-width: 500px) {
    width: 100%;
  }
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
    @media (max-width: 500px) {
      width: 40%;
    }
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
    @media (max-width: 500px) {
      width: 60%;
    }
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
