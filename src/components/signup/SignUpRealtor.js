import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { NextTor, CloseModal } from '../../store/store';
import styled from 'styled-components';
import ProgressBar from './Progress';
import { useMutation } from '@tanstack/react-query';
import { RealtorSignUpFormDatas, RequestEmail, RequestNickName } from '../../api/apiPOST';

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
    setNextModalTor(0);
  };

  // 모달 뒤로가기 이벤트 핸들러
  const onPrevRealtorModal = (e) => {
    setNextModalTor(nextModaltor - 1);
    console.log(nextModaltor);
  };

  //공인중개사회원 모달 다음으로 넘기는 버튼용 함수
  const onNextRealtorModal = () => {
    setNextModalTor(nextModaltor + 1);
    console.log(nextModaltor);
  };

  //데이터 전송 후 toast message

  //이미지 입력 및 미리보기
  const [licenseimage, setLicenseImage] = useState('');
  const onFileChangeHandler = (e) => {
    let reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      console.log(e.target.files[0]);
    }
    reader.onloadend = () => {
      const resultImage = reader.result;
      setPreviewImage(resultImage);
    };
    const file = e.target.files[0];
    setLicenseImage(file);
    console.log(file);
  };

  //이메일 입력
  //폼에 맞는 이메일 정보 입력 state
  const [emailinput, setEmailInput] = useState({ mailid: '', atsign: '@', domain: '' });
  //이메일 전체 정보 state
  const [mailAdd, setMailAdd] = useState('');
  // 이메일 input별 id 구조분해할당
  const { mailid, domain } = emailinput;

  //중복된 이메일 확인 서버응답용 state
  const [emailapprove, setEmailApprove] = useState('');
  //중복된 이메일에 대한 경고용 state
  const [emailreject, setEmailReject] = useState('');

  //닉네임 중복확인을 위한 닉네임 전송용 state
  const [checknickname, setCheckNickName] = useState('');
  //중복된 닉네임 확인 서버 응답용 state
  const [nicknameapprove, setNickNameApprove] = useState('');
  //중복된 닉네임에 대한 경고용 state
  const [nicknamereject, setNickNameReject] = useState('');
  //회원가입 승인 버튼을 위한 state
  const [admit, setAdmit] = useState(true);

  //회원가입 실패용 errormessage state
  const [errorsignup, setErrorSignUp] = useState('');

  //이메일 아이디 입력 이벤트 핸들러
  const onChangeEmail = (e) => {
    const { name, value } = e.target;
    setEmailInput({ ...emailinput, [name]: value });
    const mail = Object.values(emailinput);
    const Email = mail.join('');
    setMailAdd(Email);
  };

  //비밀번호 입력용 state, 이벤트 핸들러
  const [password, setPassword] = useState('');
  const onChangePassword = (e) => {
    setPassword(e.target.value);
    // console.log(password);
  };

  //닉네임 입력용 state, 이벤트 핸들러
  const [nickname, setNickName] = useState('');
  const onChangeNickname = (e) => {
    setNickName(e.target.value);
    // console.log(nickname);
  };

  //이메일 중복확인
  const { mutate: ConfirmEmail } = useMutation(RequestEmail, {
    onSuccess: (temp) => {
      setEmailApprove('사용할 수 있는 이메일입니다');
      setAdmit(true);
    },
    onError: (temp) => {
      // setNextTor(2);
      setEmailReject('이미 가입된 회원입니다');
    },
  });

  //닉네임 중복확인
  const { mutate: ConfirmNickName } = useMutation(RequestNickName, {
    onSuccess: (temp) => {
      setNickNameApprove('사용할 수 있는 닉네임입니다.');
      setAdmit(false);
    },
    onError: (temp) => {
      setNickNameReject('중복된 닉네임입니다');
    },
  });

  //이메일만 전송
  const onCheckEmail = (e) => {
    ConfirmEmail(mailAdd);
  };

  //닉네임만 전송
  const onCheckNickName = (e) => {
    ConfirmNickName(checknickname);
  };

  // 공인중개사 회원가입 데이터 전송
  const { mutate: postRealtorSignUp } = useMutation(RealtorSignUpFormDatas, {
    onSuccess: (response) => {
      alert('가입완료!');
    },
    onError: (error) => {
      setNextModalTor(4);
      setErrorSignUp(error.data.error.message);
      alert(errorsignup);
    },
  });

  //formdata
  const onSubmitData = (e) => {
    const formData = new FormData();
    formData.append('email', mailAdd);
    formData.append('password', password);
    formData.append('nickname', nickname);
    formData.append('file', licenseimage);
    postRealtorSignUp(formData);
  };

  return (
    <div>
      {nextModaltor === 1 ? (
        <>
          <PrograssbarContainer>
            <ProgressBar value={25} max={100} />
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
            <Buttondiv onClick={onNextRealtorModal}>다음</Buttondiv>
          </ModalInnerContainer>
        </>
      ) : null}
      {nextModaltor === 2 ? (
        <>
          <PrograssbarContainer>
            <ProgressBar value={50} max={100} />
          </PrograssbarContainer>
          <ModalInnerContainer>
            <HeadButtonsContainer>
              <div onClick={onPrevRealtorModal}>뒤로가기</div> <div onClick={onCloseModal}>취소</div>
            </HeadButtonsContainer>
            <QuestionContainer>
              <Questionbox>이메일을 입력해주세요</Questionbox> <QuestionInfo>이메일은 아이디로 사용됩니다</QuestionInfo>
            </QuestionContainer>
            <MailContainer>
              <MailBox>
                <MailInput onChange={onChangeEmail} name="mailid" value={mailid} placeholder="이메일 아이디" />@
                <MailSelect name="domain" className="box" value={domain || ''} id="domain-list" onChange={onChangeEmail}>
                  <option value="" disabled>
                    선택해주세요
                  </option>
                  <option value="naver.com">naver.com</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="kakao.com">kakao.com</option>
                  <option value="hanmail.net">hanmail.net</option>
                  <option value="nate.com">nate.com</option>
                  <option value="outlook.com">outlook.com</option>
                  <option value="yahoo.com">yahoo.com</option>
                  <option value="icloud.com">icloud.com</option>
                </MailSelect>
              </MailBox>
              <MessageBox>{emailapprove === '' ? <Message>{emailreject}</Message> : <Message>{emailapprove}</Message>}</MessageBox>
            </MailContainer>
            <Buttondiv
              onClick={() => {
                admit === false ? onCheckEmail() : onNextRealtorModal();
              }}
            >
              다음
            </Buttondiv>
          </ModalInnerContainer>
        </>
      ) : null}
      {nextModaltor === 3 ? (
        <>
          <PrograssbarContainer>
            <ProgressBar value={75} max={100} />
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
              <>
                <PasswordInput placeholder="비밀번호를 입력해주세요" onChange={onChangePassword} type="password" autocomplete="off" />
              </>
            </PasswordBox>
            <Buttondiv onClick={onNextRealtorModal}>다음</Buttondiv>
          </ModalInnerContainer>
        </>
      ) : null}
      {nextModaltor === 4 ? (
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
              <Questionbox>닉네임은 무엇으로 하시겠어요?</Questionbox>
            </QuestionContainer>
            <NickNameContainer>
              <NickNameBox>
                <NickNameInput placeholder="닉네임을 입력해주세요" onChange={onChangeNickname} />
                <MessageBox>{nicknameapprove === '' ? <Message>{nicknamereject}</Message> : <Message>{nicknameapprove}</Message>}</MessageBox>
              </NickNameBox>
            </NickNameContainer>
            <Buttondiv
              onClick={() => {
                admit === true ? onCheckNickName() : onSubmitData();
              }}
            >
              시작하기
            </Buttondiv>
          </ModalInnerContainer>
        </>
      ) : null}
    </div>
  );
}

export default SignUpRealtor;

const ModalInnerContainer = styled.div`
  width: 440px;
  height: 420px;
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
  height: 100px;
  display: flex;
  justify-content: left;
  margin-top: 20px;
  /* background-color: red; */
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
  /* background-color: blue; */
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 150px;
  border-radius: 20px;
  object-fit: contain;
  position: relative;
`;

const MailContainer = styled.div`
  width: 480px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MailBox = styled.div`
  width: 480px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: red; */
`;

const MailInput = styled.input`
  width: 180px;
  height: 40px;
  border: none;
  background-color: beige;
`;

const MailSelect = styled.select`
  width: 180px;
  height: 40px;
  background-color: beige;
  border: none;
`;

const MessageBox = styled.div`
  width: 400px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Message = styled.div`
  width: 400px;
  height: 20px;
  display: flex;
  align-items: center;
  font-size: small;
`;

const PasswordBox = styled.form`
  width: 480px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: red; */
`;

const PasswordInput = styled.input`
  width: 440px;
  height: 40px;
  background-color: beige;
  border: none;
`;

const NickNameContainer = styled.div`
  width: 480px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NickNameBox = styled.div`
  width: 480px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: red; */
`;

const NickNameInput = styled.input`
  width: 440px;
  height: 40px;
  background-color: beige;
  border: none;
`;

const Buttondiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  border-radius: 10px;
  background-color: lightgray;
  margin-top: 100px;
  margin-left: 300px;
`;
