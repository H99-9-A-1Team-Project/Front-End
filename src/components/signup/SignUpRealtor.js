import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { NextTor, CloseModal } from '../../store/store';
import styled from 'styled-components';
import ProgressBar from './Progress';

function SignUpRealtor() {
  //모달 다음창으로 넘기는 recoilstate
  const [nextModaltor, setNextModalTor] = useRecoilState(NextTor);
  //모달 닫을때 필요한 recoilstate
  const [modalOpen, setModalOpen] = useRecoilState(CloseModal);
  //이미지 미리보기용 state
  const [previewimage, setPreviewImage] = useState('');

  // 모달 닫는 이벤트 핸들러
  const onCloseModal = (e) => {
    setModalOpen(false);
    window.location.reload();
  };

  // 모달 뒤로가기 이벤트 핸들러
  const onPrevRealtorModal = (e) => {
    setNextModalTor(nextModaltor - 1);
    console.log(nextModaltor);
  };

  //이미지 입력 및 미리보기
  const [licenseimage, setLicenseImage] = useState('');
  const onFileChangeHandler = (e) => {
    let reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      console.log(e.target.files[0]);
      setLicenseImage(e.target.files[0]);
    }
    reader.onloadend = () => {
      const resultImage = reader.result;
      setPreviewImage(resultImage);
    };
  };

  //이메일 입력
  //폼에 맞는 이메일 정보 입력 state
  const [email, setEmail] = useState({ mailid: '', atsign: '@', domain: '' });
  //이메일 전체 정보 state (아직 구현중)
  const [mailAdd, setMailAdd] = useState('');
  // 이메일 input별 id 구조분해할당
  const { mailid, domain } = email;

  //이메일 입력 이벤트 핸들러
  const onChangeContent = (e) => {
    const { name, value } = e.target;
    setEmail({ ...email, [name]: value });
    setMailAdd(email(value));
    console.log(email);
  };

  //비밀번호 입력용 state, 이벤트 핸들러
  const [password, setPassword] = useState('');
  const onChangePassword = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  //닉네임 입력용 state, 이벤트 핸들러
  const [nickname, setNickName] = useState('');
  const onChangeNickname = (e) => {
    setNickName(e.target.value);
    console.log(nickname);
  };

  //전화번호 입력용 state, 이벤트 핸들러
  const [phonenum, setPhonenum] = useState('');
  const onChangePhoneNumber = (e) => {
    setPhonenum(e.target.value);
    console.log(phonenum);
  };

  //formdata

  return (
    <div>
      {nextModaltor === 1 ? (
        <>
          <PrograssbarContainer>
            <ProgressBar value={20} max={100} />
          </PrograssbarContainer>
          <ModalInnerContainer>
            <HeadButtonsContainer>
              <div onClick={onPrevRealtorModal}>뒤로가기</div>
              <div onClick={onCloseModal}>취소</div>
            </HeadButtonsContainer>
            <QuestionContainer>
              <Questionbox>공인중개사 자격증을 추가해주세요</Questionbox>
              <QuestionInfo>자격증을 통해 인증 절차가 진행되며, </QuestionInfo>
              <QuestionInfo>인증은 1~2일 내외로 처리됩니다.</QuestionInfo>
            </QuestionContainer>
            <ImageContainer>
              <ImageBox htmlfor="file">
                {/* <ImageButton>+</ImageButton> */}
                <ImageInput type="file" name="file" accept="image/*" id="file" onChange={onFileChangeHandler} />
                <div>{previewimage && <ImagePreview src={previewimage} alt="+" />}</div>
              </ImageBox>
            </ImageContainer>
          </ModalInnerContainer>
        </>
      ) : null}
      {nextModaltor === 2 ? (
        <>
          <PrograssbarContainer>
            <ProgressBar value={40} max={100} />
          </PrograssbarContainer>
          <ModalInnerContainer>
            <HeadButtonsContainer>
              <div onClick={onPrevRealtorModal}>뒤로가기</div> <div onClick={onCloseModal}>취소</div>
            </HeadButtonsContainer>
            <QuestionContainer>
              <Questionbox>이메일을 입력해주세요</Questionbox> <Questionbox>이메일은 아이디로 사용됩니다</Questionbox>
            </QuestionContainer>
            <MailBox>
              <input onChange={onChangeContent} name="mailid" value={mailid} placeholder="이메일 아이디" />@
              <select name="domain" className="box" value={domain} id="domain-list" onChange={onChangeContent}>
                <option value="naver.com">naver.com</option>
                <option value="gmail.com">gmail.com</option>
                <option value="kakao.com">kakao.com</option>
                <option value="hanmail.net">hanmail.net</option>
                <option value="nate.com">nate.com</option>
                <option value="outlook.com">outlook.com</option>
                <option value="yahoo.com">yahoo.com</option>
                <option value="icloud.com">icloud.com</option>
              </select>
            </MailBox>
          </ModalInnerContainer>
        </>
      ) : null}
      {nextModaltor === 3 ? (
        <>
          <PrograssbarContainer>
            <ProgressBar value={60} max={100} />
          </PrograssbarContainer>
          <ModalInnerContainer>
            <HeadButtonsContainer>
              <div onClick={onPrevRealtorModal}>뒤로가기</div>
              <div onClick={onCloseModal}>취소</div>
            </HeadButtonsContainer>
            <QuestionContainer>
              <Questionbox>사용하실 비밀번호를 입력해주세요</Questionbox>
            </QuestionContainer>
            <PasswordBox>
              <input placeholder="비밀번호를 입력해주세요" onChange={onChangePassword} />
            </PasswordBox>
          </ModalInnerContainer>
        </>
      ) : null}
      {nextModaltor === 4 ? (
        <>
          <PrograssbarContainer>
            <ProgressBar value={80} max={100} />
          </PrograssbarContainer>
          <ModalInnerContainer>
            <HeadButtonsContainer>
              <div onClick={onPrevRealtorModal}>뒤로가기</div>
              <div onClick={onCloseModal}>취소</div>
            </HeadButtonsContainer>
            <QuestionContainer>
              <Questionbox>닉네임은 무엇으로 하시겠어요?</Questionbox>
            </QuestionContainer>
            <NickNameBox>
              <input placeholder="닉네임을 입력해주세요" onChange={onChangeNickname} />
            </NickNameBox>
          </ModalInnerContainer>
        </>
      ) : null}
      {nextModaltor === 5 ? (
        <>
          <PrograssbarContainer>
            <ProgressBar value={100} max={100} />
          </PrograssbarContainer>
          <ModalInnerContainer>
            <HeadButtonsContainer>
              <div onClick={onPrevRealtorModal}>뒤로가기</div>
              <div onClick={onCloseModal}>취소</div>
            </HeadButtonsContainer>
            <QuestionContainer>
              <Questionbox>전화번호를 남겨주시면</Questionbox>
              <Questionbox>인증 완료 후 메세지를 보내드릴게요</Questionbox>
            </QuestionContainer>
            <NickNameBox>
              <input placeholder="전화번호를 입력해주세요" onChange={onChangePhoneNumber} />
            </NickNameBox>
          </ModalInnerContainer>
        </>
      ) : null}
    </div>
  );
}

export default SignUpRealtor;

const ModalInnerContainer = styled.div`
  width: 440px;
  height: 330px;
  /* background-color: pink; */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  /* background-color: red; */
  margin-left: auto;
  margin-right: auto;
`;
const PrograssbarContainer = styled.div`
  width: 480px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  progress {
    width: 100%;
    height: 20px;
    border: none;
    color: beige;
    -webkit-appearance: none;
    appearance: none;
    ::-webkit-progress-bar {
      background-color: lightgray;
    }
    ::-webkit-progress-value {
      background-color: beige;
    }
  }
`;

const HeadButtonsContainer = styled.div`
  width: 440px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const QuestionContainer = styled.div`
  width: 480px;
  height: 80px;
  display: flex;
  flex-direction: column;
  font-size: x-large;
  /* background-color: aqua; */
`;

const Questionbox = styled.div`
  width: 480px;
  height: 50px;
  display: flex;
  justify-content: left;
  align-items: left;
  margin-left: 30px;
`;

const QuestionInfo = styled.div`
  font-size: medium;
  margin-left: 30px;
  margin-right: 30px;
`;

const ImageContainer = styled.div`
  width: 480px;
  height: 120px;
  display: flex;
  justify-content: left;
  margin-top: 20px;
  /* background-color: red; */
`;

const ImageButton = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50px;
  background-color: gray;
  display: flex;
  justify-content: center;
  font-size: xx-large;
  color: white;
`;

const ImageBox = styled.label`
  width: 100px;
  height: 150px;
  border-radius: 20px;
  margin-left: 20px;
  background-color: beige;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const ImageInput = styled.input`
  width: 30px;
  height: 30px;
  position: absolute;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: none;
  background-color: blue;
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 150px;
  border-radius: 20px;
  object-fit: contain;
  position: relative;
`;

const MailBox = styled.div`
  width: 480px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: red; */
`;

const PasswordBox = styled.div`
  width: 480px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: red; */
`;

const NickNameBox = styled.div`
  width: 480px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: red; */
`;
