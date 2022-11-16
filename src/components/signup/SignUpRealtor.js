import React, { useState } from 'react';
import styled from 'styled-components';
import pathLeft from '../signup/sources/article_path_left.png';
import { useRecoilState } from 'recoil';
import { NextTor, CloseModal, ChangeSignUp } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import CompleteModal from './CompleteModal';
import InnerModal from './InnerModal';
import ViewPassword from '../signup/sources/View_password.png';
import HidePassword from '../signup/sources/View_hide_password.png';
import { useMutation } from '@tanstack/react-query';
import { RealtorSignUpFormDatas } from '../../api/apiPOST';

function SignUpRealtor() {
  const welcometext = '사용할 회원 정보를\n 입력해주세요';
  const realtorauth = '공인중개사 자격증을\n 추가해주세요';
  const realtoradmit = '자격증을 통해 인증 절차가 진행되며,\n 인증은 1-2일 내외로 처리됩니다.';
  const navigate = useNavigate();
  //공인중개사 회원 이전과 다음으로 넘어가기 위한 recoilState
  const [nexttor, setNextTor] = useRecoilState(NextTor);

  //이메일 잘못 입력 에러 출력 state
  const [errormail, setErrorMail] = useState('');
  //비밀번호 잘못 입력 에러 출력 state
  const [errorpassword, setErrorPassWord] = useState('');

  //이미지 미리보기용 state
  const [previewimage, setPreviewImage] = useState('');

  // 모달 오픈용 recoilstate
  const [modalOpen, setModalOpen] = useRecoilState(CloseModal);

  //회원가입창의 시작과 전환을 위한 recoilstate
  const [opensignup, setOpenSignUp] = useRecoilState(ChangeSignUp);

  //데이터 전송용 initialstate
  const initialState = {
    email: '',
    password: '',
    nickname: '',
  };

  //데이터 전송을 위한 state
  const [loginData, setLoginData] = useState(initialState);

  //비밀번호 미리보기를 위한 state
  const [secret, setSecret] = useState(true);

  //비밀번호 미리보기 이벤트 핸들러
  const onPreviewPW = (e) => {
    setSecret(!secret);
  };

  const onOpenModal = () => {
    setModalOpen(true);
  };
  const onCloseModal = () => {
    setModalOpen(false);
  };

  const onPrevRealtorPage = () => {
    setNextTor(nexttor - 1);
  };

  const onNextRealtorPage = () => {
    setNextTor(nexttor + 1);
  };

  // 이메일 비밀번호 onchange // 닉네임 생성
  const onChangeEmail = (e) => {
    const { name, value } = e.target;
    // setCheckemail({ ...checkemail, [name]: value });
    setLoginData({ ...loginData, [name]: value });
    // setEmailPassword(loginData.email);
    console.log('def', loginData);
  };
  const onblurChange = () => {
    const Nickname = loginData.email.split('@')[0];
    setLoginData({ ...loginData, nickname: Nickname });
    console.log(loginData);
  };

  //이미지 입력 및 미리보기
  const [licenseimage, setLicenseImage] = useState('');
  const onFileChangeHandler = (e) => {
    let reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      console.log(e.target.files[0]);
      setLicenseImage(e.target.files[0]);
      console.log(licenseimage);
    }
    reader.onloadend = () => {
      const resultImage = reader.result;
      setPreviewImage(resultImage);
      console.log(resultImage);
    };
  };

  // //가입하기 버튼 (페이지 이동 및 모달창 오픈 )
  // const onOpenModalMovePage = () => {
  //   setModalOpen(true);
  //   setOpenSignUp(false);
  //   setNextTor(0);
  //   navigate('/');
  // };

  //mutate
  const { mutate: postFormData } = useMutation(RealtorSignUpFormDatas, {
    onSuccess: (response) => {
      alert('가입신청!');
      navigate('/');
    },
    onError: (error) => {
      alert('가입신청실패!');
    },
  });

  //가입하기
  const onSubmit = () => {
    const blob = new Blob(
      [
        JSON.stringify({
          email: loginData.email,
          password: loginData.password,
          nickname: loginData.nickname,
        }),
      ],
      {
        type: 'application/json',
      }
    );
    const image = document.getElementById('file');
    let formData = new FormData();
    formData.append('content', image.files[0]);
    formData.append('SignUpRealtorRequestDto', blob);
    postFormData(formData);
  };

  // //가입하기
  // const onSubmit = () => {
  //   const formData = new FormData();
  //   formData.append('file', licenseimage);
  //   formData.append('nickname', loginData.nickname);
  //   formData.append('email', loginData.email);
  //   formData.append('password', loginData.password);
  //   postFormData(formData);
  // };

  return (
    <>
      {nexttor === 1 ? (
        <ChoiceContainer>
          <SignUpHeader>
            <BackpageIconBox src={pathLeft} onClick={onPrevRealtorPage} />
            <SignUpTitle>회원가입</SignUpTitle>
          </SignUpHeader>
          <WelcomeQuestionContainer>
            <WelcomeQuestionbox>{welcometext}</WelcomeQuestionbox>
          </WelcomeQuestionContainer>
          <InputContainer>
            <InputName>아이디(이메일)</InputName>

            <>
              <InputText placeholder="lighthouse@gmail.com" name="email" onChange={onChangeEmail} onBlur={onblurChange}></InputText>
              <InputErrorMessageBox>
                <InputErrorMessage> {errormail === '' ? null : errormail}</InputErrorMessage>
              </InputErrorMessageBox>
            </>
            <InputName>비밀번호</InputName>

            <>
              <InputText placeholder="8-30자리 영대*소문자, 숫자, 특수문자 조합" autocomplete="current-password" name="password" onChange={onChangeEmail} type={secret === false ? 'text' : 'password'}></InputText>
              <InputErrorMessageBox>
                <InputErrorMessage>{errorpassword === '' ? null : errorpassword}</InputErrorMessage>
              </InputErrorMessageBox>
              <PasswordViewButtonContainer>
                <PasswordViewButtonImg src={secret === false ? ViewPassword : HidePassword} onClick={onPreviewPW} />
              </PasswordViewButtonContainer>
            </>
          </InputContainer>
          <BlankContainer></BlankContainer>
          <ButtonContainer>
            <ButtonStyle onClick={onNextRealtorPage}>다음</ButtonStyle>
          </ButtonContainer>
        </ChoiceContainer>
      ) : null}
      {nexttor === 2 ? (
        <ChoiceContainer>
          <SignUpHeader>
            <BackpageIconBox src={pathLeft} onClick={onPrevRealtorPage} />
            <SignUpTitle>회원가입</SignUpTitle>
          </SignUpHeader>
          <WelcomeQuestionContainer2>
            <WelcomeQuestionbox2>{realtorauth}</WelcomeQuestionbox2>
            <WelcomeInfobox>{realtoradmit}</WelcomeInfobox>
          </WelcomeQuestionContainer2>
          <AuthPhotoContainer>
            <AutoPhotoOpenView htmlfor="file">
              <ImageInput type="file" name="file" accept="image/*" id="file" onChange={onFileChangeHandler} />
              <>{previewimage && <ImagePreview src={previewimage} alt="+" />}</>
            </AutoPhotoOpenView>
          </AuthPhotoContainer>
          <BlankContainer2></BlankContainer2>
          <ButtonContainer>
            <ButtonStyle
              onClick={() => {
                // onOpenModalMovePage(!modalOpen);
                onSubmit();
              }}
            >
              가입하기
              {modalOpen && (
                <CompleteModal visible={onOpenModal} closeable={true} maskCloseable={true} onClose={onCloseModal}>
                  <InnerModal />
                </CompleteModal>
              )}
            </ButtonStyle>
          </ButtonContainer>
        </ChoiceContainer>
      ) : null}
    </>
  );
}

export default SignUpRealtor;

const ChoiceContainer = styled.div`
  width: 360px;
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: pink;
`;

const SignUpHeader = styled.div`
  width: 360px;
  height: 64px;
  left: 0px;
  top: 0px;
  /* position: absolute; */
  display: flex;
  flex-direction: row;
  align-items: center;
  /* padding: 20px 16px; */
  gap: 8px;
  background-color: white;
`;

const BackpageIconBox = styled.img`
  width: 20px;
  height: 20px;
  background-color: white;
  margin-left: 20px;
`;
const SignUpTitle = styled.div`
  background-color: white;
  width: 50px;
  height: 20px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.25px;
`;

const WelcomeQuestionContainer = styled.div`
  width: 360px;
  height: 140px;
  background-color: white;
  display: flex;
  position: relative;
`;

const WelcomeQuestionbox = styled.div`
  width: 183px;
  height: 84px;
  background-color: white;
  position: absolute;
  left: 16px;
  top: 24px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  white-space: pre-line;
`;

const WelcomeQuestionContainer2 = styled.div`
  width: 360px;
  height: 160px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const WelcomeQuestionbox2 = styled.div`
  width: 198px;
  height: 56px;
  background-color: white;
  position: absolute;
  left: 16px;
  top: 24px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  white-space: pre-line;
`;
const WelcomeInfobox = styled.div`
  width: 206px;
  height: 40px;
  /* background-color: red; */
  left: 16px;
  top: 96px;
  position: absolute;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.25px;
  color: #000000;
  background-color: white;
`;

const AuthPhotoContainer = styled.div`
  width: 360px;
  height: 156px;
  background-color: white;
  display: flex;
  justify-content: center;
  position: relative;
`;

const AutoPhotoOpenView = styled.label`
  width: 126px;
  height: 156px;
  background-color: white;
  left: 16px;
  box-sizing: border-box;
  position: absolute;
  border: 1px solid #3c6eef;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageInput = styled.input`
  width: 30px;
  height: 30px;
  position: absolute;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: none;
  background-color: blue;
  border-radius: 8px;
`;

const ImagePreview = styled.img`
  width: 126px;
  height: 156px;
  border-radius: 8px;
  object-fit: contain;
  position: relative;
  display: flex;
  //   justify-content: center;
  //   align-items: center;
`;

const InputContainer = styled.div`
  width: 360px;
  height: 188px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const InputName = styled.div`
  width: 328px;
  height: 20px;
  display: flex;
  justify-content: left;
  background-color: white;
  font-size: 14px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.25px;
`;
const InputText = styled.input`
  width: 328px;
  height: 44px;
  border-radius: 8px;
  border: none;
  background-color: white;
`;

const InputTextError = styled.input`
  width: 328px;
  height: 44px;
  border-radius: 8px;
  background-color: white;
  border: 1px solid #d14343;
`;
const InputErrorMessageBox = styled.div`
  width: 328px;
  height: 16px;
  background-color: white;
  display: flex;
  align-items: center;
`;
const InputErrorMessage = styled.div`
  width: 328px;
  height: 12px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #d14343;
  background-color: white;
`;

const PasswordViewButtonContainer = styled.div`
  width: 328px;
  height: 24px;
  background-color: white;
  display: flex;
  justify-content: right;
`;

const PasswordViewButtonImg = styled.img`
  width: 24px;
  height: 24px;
  background-color: white;
`;

const BlankContainer = styled.div`
  width: 360px;
  height: 344px;
  background-color: white;
`;
const BlankContainer2 = styled.div`
  width: 360px;
  height: 328px;
  background-color: white;
`;
const ButtonContainer = styled.div`
  width: 360px;
  height: 92px;
  background-color: white;
  display: flex;
  justify-content: center;
  /* background-color: green; */
`;

const ButtonStyle = styled.div`
  width: 328px;

  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: #c5c8cb;
  :hover {
    background-color: #3c6eef;
    color: white;
  }
`;
