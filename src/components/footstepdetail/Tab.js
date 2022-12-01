import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { TabState } from '../../store/store';

export default function Tab() {
  const [tabStates, setTabStates] = useRecoilState(TabState);
  const onTab = () => {
    if (tabStates === 0) setTabStates(1);
    if (tabStates === 1) setTabStates(0);
  };
  return (
    <Container>
      <TabBox>
        <Tabs
          tabStates={tabStates}
          onClick={() => {
            onTab();
          }}
        >
          기본정보
        </Tabs>
        <Tabs2
          tabStates={tabStates}
          onClick={() => {
            onTab();
          }}
        >
          발품 체크리스트
        </Tabs2>
      </TabBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

const TabBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const Tabs = styled.div`
  width: 180px;
  height: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ tabStates }) => `${tabStates === 0 ? 'var(--primary2-400)' : 'black'}`};
  border-top: 1px solid var(--gray6);
  border-bottom: ${({ tabStates }) => `${tabStates === 0 ? '2px solid var(--primary2-400);' : '1px solid var(--gray6)'}`};
  font-family: var(--button-font-family);
  font-size: var(--button_Large-font-size);
  font-weight: var(--button_Large-font-weight);
  line-height: var(--button_Large-line-height);
  letter-spacing: var(--button_Large-letter-spacing);
  cursor: pointer;
`;

const Tabs2 = styled.div`
  width: 180px;
  height: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ tabStates }) => `${tabStates === 1 ? 'var(--primary2-400)' : 'black'}`};
  border-top: 1px solid var(--gray6);
  border-bottom: ${({ tabStates }) => `${tabStates === 1 ? '2px solid var(--primary2-400);' : '1px solid var(--gray6)'}`};
  font-family: var(--button-font-family);
  font-size: var(--button_Large-font-size);
  font-weight: var(--button_Large-font-weight);
  line-height: var(--button_Large-line-height);
  letter-spacing: var(--button_Large-letter-spacing);
  cursor: pointer;
`;
