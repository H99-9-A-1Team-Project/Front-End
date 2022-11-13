import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { NewFootStepHeaderBtnState } from '../../store/store';

export default function NewFootStepHeader() {
  const [newFshBtnState, setNewFshBtnState] = useRecoilState(NewFootStepHeaderBtnState);

  const onItemInfoClick = () => {
    setNewFshBtnState(0);
    console.log(newFshBtnState);
  };

  const onCheckListClick = () => {
    setNewFshBtnState(1);
    console.log(newFshBtnState);
  };

  return (
    <HeaderContainer>
      <ItemInfo
        newFshBtnState={newFshBtnState}
        onClick={() => {
          onItemInfoClick();
        }}
      >
        매물정보
      </ItemInfo>
      <CheckList
        newFshBtnState={newFshBtnState}
        onClick={() => {
          onCheckListClick();
        }}
      >
        체크리스트
      </CheckList>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  height: 60px;
  background-color: orange;
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ItemInfo = styled.div`
  margin-left: 20px;
  font-size: ${({ newFshBtnState }) => `${newFshBtnState === 0 ? '25px' : '20px'}`};
  font-weight: ${({ newFshBtnState }) => `${newFshBtnState === 0 ? 'bold' : 'normal'}`};
  margin-right: 20px;
  cursor: pointer;
`;

const CheckList = styled.div`
  font-size: ${({ newFshBtnState }) => `${newFshBtnState === 1 ? '25px' : '20px'}`};
  font-weight: ${({ newFshBtnState }) => `${newFshBtnState === 1 ? 'bold' : 'normal'}`};

  cursor: pointer;
`;
