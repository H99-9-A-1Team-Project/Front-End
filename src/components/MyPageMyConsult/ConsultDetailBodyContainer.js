import React, { useState } from 'react';
import styled from 'styled-components';
import arrow_up from '../../global/sources/Expand_up_light.svg';
import arrow_down from '../../global/sources/Expand_down_light.svg';

export default function ConsultDetailBodyContainer({ data, checkNum }) {
  const [visible, setVisible] = useState(false);

  if (checkNum <= 2) {
    return (
      <ConsultDetailBodyContainerLayout>
        {data[0] ? <div className="check"> 불법 건축물인지 확인하고 싶어요 </div> : null}
        {data[1] ? <div className="check"> 건축물의 층별 구조와 용도를 알고 싶어요 </div> : null}
        {data[2] ? <div className="check"> 건축물의 소유자 현황을 알고 싶어요 </div> : null}
        {data[3] ? <div className="check"> 언제 지어졌는지 알고 싶어요 </div> : null}
        {data[4] ? <div className="check"> 전반적인 등기정보를 알고 싶어요 </div> : null}
        {data[5] ? <div className="check"> 전/월세 계약하는데 안전할지 점검받고 싶어요 </div> : null}
      </ConsultDetailBodyContainerLayout>
    );
  } else {
    return (
      <ConsultDetailBodyContainerLayout>
        <Stdiv1 id="div1" visible={visible}>
          {data[0] ? <div className="check"> 불법 건축물인지 확인하고 싶어요 </div> : null}
          {data[1] ? <div className="check"> 건축물의 층별 구조와 용도를 알고 싶어요 </div> : null}
          {data[2] ? <div className="check"> 건축물의 소유자 현황을 알고 싶어요 </div> : null}
          {data[3] ? <div className="check"> 언제 지어졌는지 알고 싶어요 </div> : null}
          {data[4] ? <div className="check"> 전반적인 등기정보를 알고 싶어요 </div> : null}
          {data[5] ? <div className="check"> 전/월세 계약하는데 안전할지 점검받고 싶어요 </div> : null}
        </Stdiv1>
        <StShowButton onClick={() => setVisible(true)} visible={visible}>
          {checkNum}개의 고민 더보기
          <img src={arrow_down} alt="arrow_down" />
        </StShowButton>
        <StHideButton onClick={() => setVisible(false)} visible={visible}>
          닫기
          <img src={arrow_up} alt="arrow_up" />
        </StHideButton>
      </ConsultDetailBodyContainerLayout>
    );
  }
}
const ConsultDetailBodyContainerLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  .check {
    display: flex;
    align-items: center;
    width: 296px;
    height: 36px;
    font-family: var(--button-font-family);
    font-size: var(--body_Medium-font-size);
    font-weight: var(--body_Medium-font-weight);
    line-height: var(--body_Medium-line-height);
    letter-spacing: var(--body_Medium-letter-spacing);
  }
`;
const Stdiv1 = styled.div`
  height: ${(props) => (props.visible ? 'none' : '72px')};
  overflow: ${(props) => (props.visible ? 'none' : 'hidden')};
`;
const StShowButton = styled.div`
  display: ${(props) => (props.visible ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  font-family: var(--button-font-family);
  font-size: var(--button_Small-font-size);
  font-weight: var(--button_Small-font-weight);
  line-height: var(--button_Small-line-height);
  letter-spacing: var(--button_Small-letter-spacing);
  color: var(--gray3);
  cursor: pointer;
`;
const StHideButton = styled.div`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  font-family: var(--button-font-family);
  font-size: var(--button_Small-font-size);
  font-weight: var(--button_Small-font-weight);
  line-height: var(--button_Small-line-height);
  letter-spacing: var(--button_Small-letter-spacing);
  color: var(--gray3);
  cursor: pointer;
`;
