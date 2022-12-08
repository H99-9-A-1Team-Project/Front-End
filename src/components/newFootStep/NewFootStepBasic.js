import React from 'react';
import styled from 'styled-components';
import { nfsrPath, nfsData } from '../../store/store';
import { useRecoilValue, useRecoilState } from 'recoil';
import '../../global/global.css';

export default function NewFootStepBasic() {
  const BasicState = useRecoilValue(nfsrPath);
  const [nfscData, setNfscData] = useRecoilState(nfsData);

  const onChangeData = (e) => {
    const { name, value } = e.target;
    setNfscData({ ...nfscData, [name]: value });
    console.log(nfscData);
  };

  return (
    <>
      {BasicState.basic === true ? (
        <Container>
          <Headline>매물 가격</Headline>
          <InputBox>
            <DataInput placeholder="전,월세 가격" name="price" onChange={onChangeData} />
          </InputBox>
          <Headline>관리비</Headline>
          <InputBox>
            <DataInput placeholder="관리비를 입력해주세요" name="expenses" onChange={onChangeData} />
          </InputBox>
          <Headline>방 크기</Headline>
          <InputBox>
            <DataInput placeholder="1평당 대략 3.3제곱미터에요" name="size" onChange={onChangeData} />
          </InputBox>
          <Headline>한줄 평</Headline>
          <InputBox2>
            <DataInput placeholder="전체적으로 매물이 어떠셨나요?" name="review" onChange={onChangeData} />
          </InputBox2>
        </Container>
      ) : null}
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0 auto;
`;

const Headline = styled.div`
  margin-left: 16px;
  margin-top: 24px;
  color: #2a224f;
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
`;

const InputBox = styled.div`
  margin-left: 16px;
  width: 328px;
  height: 45.8px;
  border: 1px solid #edf0f3;
  border-radius: 8px;
`;

const InputBox2 = styled.div`
  margin-left: 16px;
  margin-bottom: 32px;
  width: 328px;
  height: 45.5px;
  border: 1px solid #edf0f3;
  border-radius: 8px;
`;

const DataInput = styled.input`
  width: 304px;
  height: 44px;
  border: none;
  outline: none;
  margin-left: 12px;
  ::-webkit-input-placeholder {
    color: var(--gray4);
    font-family: var(--body-font-family);
    font-size: var(--body_Medium-font-size);
    font-weight: var(--body_Medium-font-weight);
    line-height: var(--body_Medium-line-height);
    letter-spacing: var(--body_Medium-letter-spacing);
  }
`;
