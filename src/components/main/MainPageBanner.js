import styled from 'styled-components';

export default function MainPageBanner() {
  return (
    <HeaderBannerContainer>
      <HeaderBannerImg></HeaderBannerImg>
    </HeaderBannerContainer>
  );
}

const HeaderBannerContainer = styled.div`
  width: 100%;
  height: 700px;
`;

const HeaderBannerImg = styled.img`
  width: 100%;
  height: 772px;
  background-color: orange;
`;
