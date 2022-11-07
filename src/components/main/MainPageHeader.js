import styled from 'styled-components';

export default function MainPageHeader() {
  return (
    <>
      <HeaderContainer>
        <HeaderLogo>등대지기</HeaderLogo>
        <HeaderMenuMyPage>마이페이지</HeaderMenuMyPage>
        <HeaderMenuChatting>채팅</HeaderMenuChatting>
        <HeaderMenuSignUp>회원가입</HeaderMenuSignUp>
      </HeaderContainer>
    </>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  height: 113px;
  background-color: aqua;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HeaderLogo = styled.div`
  margin-left: 50px;
  font-size: 50px;
  cursor: default;
`;

const HeaderMenuMyPage = styled.span`
  margin-left: 20px;
  font-size: 17px;
  cursor: pointer;
`;

const HeaderMenuChatting = styled.span`
  margin-left: 20px;
  font-size: 17px;
  cursor: pointer;
`;

const HeaderMenuSignUp = styled.span`
  margin-left: 20px;
  font-size: 17px;
  cursor: pointer;
`;
