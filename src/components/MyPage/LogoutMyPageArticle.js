import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../../global/global.css';
import arrow from '../../global/sources/Expand_right_light.svg';

export default function LogoutMyPageArticle() {
  const navigate = useNavigate();
  const onLinkto = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLScBo334v9MmxoFzl_xJ74m51UTAuU_rVoAfheLlNXFZK_iCJA/viewform');
  };
  return (
    <Container>
      <div className="head-article-container">
        <div className="div1">
          <span className="span" onClick={() => navigate('/login')}>
            로그인
          </span>
          <span className="span1"> 혹은</span>
        </div>
        <div className="div2">
          <span className="span" onClick={() => navigate('/signup')}>
            회원가입
          </span>
          <span className="span1">이 필요해요</span>
        </div>
      </div>
      <div className="body-article-container">
        <div className="info-1">등대지기 A to Z</div>
        <div className="info-2" onClick={() => navigate('/introduce')}>
          서비스 소개
          <img src={arrow} alt="arrow" />
        </div>

        <div className="info-3" onClick={() => onLinkto()}>
          설문 참여
          <img src={arrow} alt="arrow" />
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .head-article-container {
    margin: 0;
    padding: 0;
    width: 100%;
    background-color: white;
    font-family: var(--headline-font-family);
    font-size: var(--headline_Large-font-size);
    font-weight: var(--headline_Large-font-weight);
    line-height: var(--headline_Large-line-height);
    letter-spacing: var(--headline_Large-letter-spacing);
    border-bottom: 4px solid var(--gray6);
    border-top: 1px solid var(--gray6);
    div {
      background-color: white;
      margin-left: 19px;
    }
    .div1 {
      padding-top: 24px;
      margin-bottom: 11px;
    }
    .div2 {
      padding-bottom: 24px;
    }
    span {
      background-color: white;
    }
    .span {
      text-decoration-line: underline;
      color: var(--primary2-400);
      cursor: pointer;
    }
  }
  .body-article-container {
    display: flex;
    flex-direction: column;
    background-color: white;
    .info-1 {
      color: var(--gray4);
      background-color: white;
      padding-left: 16px;
      padding-top: 24px;
      padding-bottom: 8px;
      font-family: var(--headline-font-family);
      font-size: var(--body_Medium-font-size);
      font-weight: var(--body_Medium-font-weight);
      line-height: var(--body_Medium-line-height);
      letter-spacing: var(--body_Medium-letter-spacing);
    }
    .info-2,
    .info-3 {
      color: var(--gray2);
      background-color: white;
      padding: 12px 0 12px 0;
      width: 328px;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      font-family: var(--headline-font-family);
      font-size: var(--button_Medium-font-size);
      font-weight: var(--button_Medium-font-weight);
      line-height: var(--button_Medium-line-height);
      letter-spacing: var(--button_Medium-letter-spacing);
      cursor: pointer;
      img {
        background-color: white;
      }
    }
  }
`;
