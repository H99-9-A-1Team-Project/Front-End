import React, { useState } from 'react';
import styled from 'styled-components';
import '../../global/global.css';
import RqAt_Path_Right from './sources/rqm_article_right_light2.png';
import RqAt_Question from './sources/RqmAt_Question.png';
import tooltip from './sources/tooltip.png';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ReadRequestList } from '../../api/apiGET';
import Modal from '../../global/components/Modal';
import { rqInfo, requireAddress, rqDetailAddress, consultNumber } from '../../store/store';
import { useRecoilState, useSetRecoilState } from 'recoil';

export default function RequestArticle() {
  const navigate = useNavigate();
  const [consultNum, setConsultNum] = useState(2);
  const [waitNum, setWaitNum] = useState(0);
  const [finishNum, setFinishNum] = useState(0);
  const [toolTipState, setToolTipState] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const setRqhInfo = useSetRecoilState(rqInfo);
  const setRqhAddress = useSetRecoilState(requireAddress);
  const setRqhDetailAddress = useSetRecoilState(rqDetailAddress);
  const setRecoilConsultNum = useSetRecoilState(consultNumber);
  const onClickRequestConsult = () => {
    if (consultNum <= 0) {
      setModalVisible(true);
    } else {
      setRqhInfo({ title: '', coordX: '', coordY: '', check1: 0, check2: 0, check3: 0, check4: 0, check5: 0, check6: 0, consultMessage: '' });
      setRqhAddress('도로명 주소 검색');
      setRqhDetailAddress('');
      navigate('/request1');
    }
  };

  const { data } = useQuery(['requestlist'], ReadRequestList, {
    refetchOnWindowFocus: false,
    onSuccess: (response) => {
      const allNum = response.length;
      const waitList = response.filter((item) => item.answerState === 'WAIT');
      setWaitNum(() => waitList.length);
      setFinishNum(() => allNum - waitList.length);
      setConsultNum(2 - allNum);
      setRecoilConsultNum(allNum);
    },
  });

  const onToolTipClick = () => {
    if (toolTipState === false) setToolTipState(true);
    if (toolTipState === true) setToolTipState(false);
  };

  return (
    <RqArticleContainer>
      <LikeText>
        발품판 매물이 마음에 든다면
        <br />
        안전성을 확인해보세요
      </LikeText>
      <InfoContainer>
        <InfoBox>
          <InfoWrap1>
            <InfoHead1>{consultNum}회</InfoHead1>
            <InfoNav1>미사용</InfoNav1>
          </InfoWrap1>
          <InfoWrap2>
            <InfoHead1>{waitNum}건</InfoHead1>
            <InfoNav1>대기중</InfoNav1>
          </InfoWrap2>
          <InfoWrap3>
            <InfoHead3>{finishNum}건</InfoHead3>
            <InfoNav2>완료</InfoNav2>
          </InfoWrap3>
        </InfoBox>
        <RequestBtn onClick={onClickRequestConsult}>
          매물 상담 신청하기
          <RequestBtnPath src={RqAt_Path_Right} />
        </RequestBtn>
      </InfoContainer>
      <HelpBox
        onClick={() => {
          onToolTipClick();
        }}
      >
        <div>
          <HelpP>미사용은 무엇인가요?</HelpP>
          <HelpImg src={RqAt_Question} />
        </div>
        {toolTipState === true ? <img className="tooltip" src={tooltip} alt="tooltip" /> : null}
      </HelpBox>

      <Modal visible={modalVisible} closable={true} maskClosable={true} setModalVisible={setModalVisible}>
        <div className="modal_div">모든상담을 사용하였어요.</div>
        <div className="modal_div_ment">등대지기를 애정해주셔서 감사합니다! </div>
        <div className="modal_div_ment">현재 등대지기는 베타 서비스로</div>
        <div className="modal_div_ment">2회 무료 상담 서비스를 제공하고 있습니다.</div>
        <div className="modal_div_ment">추가 상담 서비스를 받고싶으시다면</div>
        <div className="modal_div_ment">설문에 참여하시어 의견을 제시해주세요.</div>
        <div className="modal_div_ment">반영하여 더 좋은 모습으로 찾아볼 수 있길</div>
        <div className="modal_div_ment">바라겠습니다.</div>
      </Modal>
    </RqArticleContainer>
  );
}

const RqArticleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 324px;
  background-color: var(--primary2-100);
  .modal_div {
    font-family: var(--headline-font-family);
    font-size: var(--headline_Medium-font-size);
    font-weight: var(--headline_Medium-font-weight);
    line-height: var(--headline_Medium-line-height);
    letter-spacing: var(--headline_Medium-letter-spacing);
    margin-bottom: 20px;
  }
  .modal_div_ment {
    font-family: var(--headline-font-family);
    font-size: var(--body_Large-font-size);
    font-weight: var(--body_Large-font-weight);
    line-height: var(--body_Large-line-height);
    letter-spacing: var(--body_Large-letter-spacing);
  }
`;

const LikeText = styled.div`
  margin-left: 17px;
  margin-top: 24px;
  background: none;
  font-family: var(--headline-font-family);
  font-size: var(--headline_Medium-font-size);
  font-weight: var(--headline_Medium-font-weight);
  line-height: var(--headline_Medium-line-height);
  letter-spacing: var(--headline_Medium-letter-spacing);
  cursor: default;
`;

const InfoContainer = styled.div`
  position: absolute;
  width: 328px;
  height: 176px;
  margin-top: 96px;
  margin-left: 17px;
  border-radius: 8px;
  background-color: white;
`;

const InfoBox = styled.div`
  width: 279px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 28px;
  margin-left: 25px;
  background: none;
`;

const InfoWrap1 = styled.div`
  width: 32px;
  height: 40px;
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  background: none;
`;

const InfoWrap2 = styled.div`
  width: 32px;
  height: 40px;
  display: flex;
  flex-direction: column;
  margin-left: 23px;
  background: none;
`;

const InfoWrap3 = styled.div`
  width: 25px;
  height: 40px;
  display: flex;
  flex-direction: column;
  margin-left: 23px;
  background: none;
  margin-right: 16px;
`;

const InfoHead1 = styled.p`
  color: black;
  background: none;
  font-family: var(--headline-font-family);
  font-size: var(--headline_Small-font-size);
  font-weight: var(--headline_Small-font-weight);
  line-height: var(--headline_Small-line-height);
  letter-spacing: var(--headline_Small-letter-spacing);
  margin-left: 3.5px;
  cursor: default;
`;

const InfoHead3 = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: black;
  background: none;
  margin-left: -2px;
  font-family: var(--headline-font-family);
  font-size: var(--headline_Small-font-size);
  font-weight: var(--headline_Small-font-weight);
  line-height: var(--headline_Small-line-height);
  letter-spacing: var(--headline_Small-letter-spacing);
  cursor: default;
`;

const InfoNav1 = styled.p`
  width: 33px;
  background: none;
  color: var(--gray4);
  margin-top: 4px;
  font-family: var(--body-font-family);
  font-size: var(--body_Small-font-size);
  font-weight: var(--body_Small-font-weight);
  line-height: var(--body_Small-line-height);
  letter-spacing: var(--body_Small-letter-spacing);
  cursor: default;
`;

const InfoNav2 = styled.p`
  width: 33px;
  background: none;
  color: var(--gray4);
  margin-top: 4px;
  margin-left: 1.5px;
  font-family: var(--body-font-family);
  font-size: var(--body_Small-font-size);
  font-weight: var(--body_Small-font-weight);
  line-height: var(--body_Small-line-height);
  letter-spacing: var(--body_Small-letter-spacing);
  cursor: default;
`;

const RequestBtn = styled.button`
  position: absolute;
  width: 280px;
  height: 48px;
  border: none;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: var(--button-font-family);
  font-size: var(--button_Medium-font-size);
  font-weight: var(--button_Medium-font-weight);
  line-height: var(--button_Medium-line-height);
  letter-spacing: var(--button_Medium-letter-spacing);
  background-color: var(--primary2-400);
  box-shadow: var(--Shadow2-box-shadow);
  margin-top: 32px;
  margin-left: 24px;
  cursor: pointer;
`;

const RequestBtnPath = styled.img`
  width: 24px;
  height: 24px;
  background: none;
`;

const HelpBox = styled.div`
  width: 132px;
  height: 36px;
  display: flex;
  flex-direction: column;
  background: none;
  margin-top: 208px;
  margin-left: 214px;
  cursor: pointer;
  div {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: none;
  }
  .tooltip {
    display: flex;
    position: relative;
    width: 192px;
    height: 80px;
    right: 52px;
    bottom: 5px;
  }
`;

const HelpP = styled.div`
  color: var(--gray4);
  font-family: var(--button-font-family);
  font-size: var(--button_Small-font-size);
  font-weight: var(--button_Small-font-weight);
  line-height: var(--button_Small-line-height);
  letter-spacing: var(--button_Small-letter-spacing);
  background: none;
`;

const HelpImg = styled.img`
  width: 20px;
  height: 20px;
  background: none;
  margin-left: 4px;
`;
