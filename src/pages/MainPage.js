import MainPageHeader from '../components/main/MainPageHeader';
import MainPageBanner from '../components/main/MainPageBanner';
import MainPageArticle from '../components/main/MainPageArticleFooter';
import styled from 'styled-components';

export default function Mainpage() {
  return (
    <>
      <MainPageContainer>
        <MainPageHeader />
        <MainPageBanner />
        <MainPageArticle />
      </MainPageContainer>
    </>
  );
}

const MainPageContainer = styled.div`
  width: 100%;
  height: 100%;
`;
