import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { NextTor } from '../../store/store';

function SignUpRealtor() {
  const [nextModaltor, setNextModalTor] = useRecoilState(NextTor);
  const [choiceBool, setChoiceBool] = useState(false);
  const [early, setEarly] = useState(false);

  const onPrevRealtorModal = () => {
    setNextModalTor(nextModaltor - 1);
    setChoiceBool(false);
    setEarly(true);
    console.log(nextModaltor);
  };
  return (
    <div>
      {nextModaltor === 1 ? <div>이미지</div> : null}
      {nextModaltor === 2 ? <div>이메일</div> : null}
      {nextModaltor === 3 ? <div>비밀번호</div> : null}
      {nextModaltor === 4 ? <div>닉네임</div> : null}
      {nextModaltor === 5 ? <div>전화번호</div> : null}
    </div>
  );
}

export default SignUpRealtor;
