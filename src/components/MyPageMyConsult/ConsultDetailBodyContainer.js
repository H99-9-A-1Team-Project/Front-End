import React, { useState } from 'react';
import styled from 'styled-components';

export default function ConsultDetailBodyContainer({ data, checkNum }) {
  const [visible, setVisible] = useState(false);
  if (document.getElementById('layout')?.scrollHeight >= 73) console.log(document.getElementById('layout')?.scrollHeight);
  if (checkNum <= 2) {
    return (
      <ConsultDetailBodyContainerLayout id="layout">
        {data.check1 ? <div className="check"> 불법 건축물인지 확인하고 싶어요 </div> : null}
        {data.check2 ? <div className="check"> 건축물의 층별 구조와 용도를 알고 싶어요 </div> : null}
        {data.check3 ? <div className="check"> 건축물의 소유자 현황을 알고 싶어요 </div> : null}
        {data.check4 ? <div className="check"> 언제 지어졌는지 알고 싶어요 </div> : null}
        {data.check5 ? <div className="check"> 전반적인 등기정보를 알고 싶어요 </div> : null}
        {data.check6 ? <div className="check"> 전/월세 계약하는데 안전할지 점검받고 싶어요 </div> : null}
      </ConsultDetailBodyContainerLayout>
    );
  } else {
    return (
      <ConsultDetailBodyContainerLayout id="layout">
        {data.check1 ? <div className="check"> 불법 건축물인지 확인하고 싶어요 </div> : null}
        {data.check2 ? <div className="check"> 건축물의 층별 구조와 용도를 알고 싶어요 </div> : null}
        {data.check3 ? <div className="check"> 건축물의 소유자 현황을 알고 싶어요 </div> : null}
        {data.check4 ? <div className="check"> 언제 지어졌는지 알고 싶어요 </div> : null}
        {data.check5 ? <div className="check"> 전반적인 등기정보를 알고 싶어요 </div> : null}
        {data.check6 ? <div className="check"> 전/월세 계약하는데 안전할지 점검받고 싶어요 </div> : null}
        <div cla>더보기</div>
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
