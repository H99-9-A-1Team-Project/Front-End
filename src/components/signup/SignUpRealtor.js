import React, { useState } from 'react';
import styled from 'styled-components';
import pathLeft from '../signup/sources/article_path_left.png';
import Plus from '../signup/sources/plus.png';
import { useRecoilState } from 'recoil';
import { NextTor, CloseModal, ChangeSignUp, itsNotOK, itsNotOK2, LoginDatas } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import CompleteModal from './CompleteModal';
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

  //이메일 확인할 usestate
  const [checkemail, setCheckemail] = useState('');

  //비밀번호 확인할 usestate
  const [checkpassword, setCheckPassword] = useState('');

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

  //데이터 전송을 위한 state
  const [loginData, setLoginData] = useRecoilState(LoginDatas);

  //버튼 활성화 및 오류메시지 색상 활성화를 위한 state
  const [valid, setValid] = useRecoilState(itsNotOK);
  const [psvalid, setPsValid] = useRecoilState(itsNotOK2);
  const isValidLogin = !(valid && psvalid);
  const [isEmail, setIsEmail] = useState();
  const [isPassword, setIsPassword] = useState();

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
    setValid(false);
    setPsValid(false);
    setPreviewImage('');
  };

  const onNextRealtorPage = () => {
    setNextTor(nexttor + 1);
    setValid(false);
    setPsValid(false);
  };

  // 이메일 비밀번호 onchange // 닉네임 생성
  const onChangeEmail = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    console.log('def', loginData);
    const emailData = loginData.email;
    const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (exptext.test(emailData) == false) {
      setCheckemail('잘못된 이메일 형식입니다.');
      setIsEmail(false);
      setValid(false);
      // emailData.focus();
    } else {
      setCheckemail('알맞은 형식입니다 :) ');
      setIsEmail(true);
      setValid(true);
    }
  };

  const onblurChange = () => {
    const Nickname = loginData.email.split('@')[0];
    setLoginData({ ...loginData, nickname: Nickname });
    console.log(loginData);
  };

  const onChangePassword = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    console.log('ABC', loginData);
    const passwordData = loginData.password;
    const expword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,30}$/;
    if (expword.test(passwordData) == false) {
      setCheckPassword('잘못된 비밀번호 형식입니다');
      setIsPassword(false);
      setPsValid(false);
      // passwordData.focus();
    } else {
      setCheckPassword('알맞은 형식입니다 :)');
      setIsPassword(true);
      setPsValid(true);
    }
  };

  //이미지 입력 및 미리보기

  const [licenseimage, setLicenseImage] = useState('');
  const onFileChangeHandler = (e) => {
    let reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setLicenseImage(e.target.files[0]);
    }
    reader.onloadend = () => {
      const resultImage = reader.result;
      setPreviewImage(resultImage);
    };
  };

  //가입하기 버튼 (모달창 오픈 )
  const onOpenModalMovePage = () => {
    setModalOpen(true);
  };

  //mutate
  const { mutate: postFormData } = useMutation(RealtorSignUpFormDatas, {
    onSuccess: (response) => {
      setModalOpen(true);
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
    setLicenseImage(image);
    let formData = new FormData();
    formData.append('license', image.files[0]);
    formData.append('content', blob);
    postFormData(formData);
  };
  const isVaildPhoto = !previewimage;

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
            <InputBox>
              <InputName>아이디(이메일)</InputName>

              <>
                <InputText
                  placeholder="lighthouse@gmail.com"
                  name="email"
                  onChange={onChangeEmail}
                  onBlur={onblurChange}
                  style={{
                    border: isEmail === false ? '1px solid #d14343 ' : 'none',
                  }}
                ></InputText>
                <InputErrorMessageBox>{isEmail === false ? <InputErrorMessage>{checkemail === '' ? null : checkemail}</InputErrorMessage> : <InputMessage>{checkemail === '' ? null : checkemail}</InputMessage>}</InputErrorMessageBox>
              </>
            </InputBox>
            <InputBoxPassword>
              <InputName>비밀번호</InputName>

              <InputText
                placeholder="8-30자리 영대*소문자, 숫자, 특수문자 조합"
                autocomplete="current-password"
                name="password"
                onChange={onChangePassword}
                type={secret === false ? 'text' : 'password'}
                style={{
                  border: isPassword === false ? '1px solid #d14343 ' : 'none',
                }}
              ></InputText>
            </InputBoxPassword>
            <ErrorMsgPreview>
              <InputErrorMessageBoxPassword>
                {isPassword === false ? <InputErrorMessage>{checkpassword === '' ? null : checkpassword}</InputErrorMessage> : <InputMessage>{checkpassword === '' ? null : checkpassword}</InputMessage>}
              </InputErrorMessageBoxPassword>
              <PasswordViewButtonImg src={secret === false ? ViewPassword : HidePassword} onClick={onPreviewPW} />
            </ErrorMsgPreview>
          </InputContainer>
          <BlankContainer></BlankContainer>
          <ButtonContainer>
            <ButtonStyle type="submit" disabled={isValidLogin} onClick={onNextRealtorPage}>
              다음
            </ButtonStyle>
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
              <InfoInput>
                <InfoImage src={Plus} />
                <InfoText>사진 추가</InfoText>
              </InfoInput>
              {previewimage && <ImagePreview src={previewimage} alt="+" />}
            </AutoPhotoOpenView>
          </AuthPhotoContainer>
          <BlankContainer2></BlankContainer2>
          <ButtonContainer>
            <ButtonStyle
              type="submit"
              disabled={isVaildPhoto}
              onClick={() => {
                onOpenModalMovePage(!modalOpen);
                onSubmit();
              }}
            >
              가입하기
              {modalOpen && <CompleteModal visible={onOpenModal} closeable={true} maskCloseable={true} onClose={onCloseModal}></CompleteModal>}
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--white);
`;

const SignUpHeader = styled.div`
  width: 360px;
  min-height: 64px;
  left: 0px;
  top: 0px;
  /* position: absolute; */
  display: flex;
  flex-direction: row;
  align-items: center;
  /* padding: 20px 16px; */
  gap: 8px;
  background-color: var(--white);
`;

const BackpageIconBox = styled.img`
  width: 20px;
  height: 20px;
  background-color: var(--white);
  margin-left: 20px;
`;
const SignUpTitle = styled.div`
  background-color: var(--white);
  width: 70px;
  height: 20px;
  font-style: normal;
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
`;

const WelcomeQuestionContainer = styled.div`
  width: 360px;
  min-height: 120px;
  display: flex;
  position: relative;
  background-color: var(--white);
`;

const WelcomeQuestionbox = styled.div`
  width: 183px;
  height: 84px;
  background-color: var(--white);
  position: absolute;
  left: 16px;
  top: 24px;
  font-style: normal;
  font-family: var(--headline-font-family);
  font-size: var(--headline_Large-font-size);
  font-weight: var(--headline_Large-font-weight);
  line-height: var(--headline_Large-line-height);
  display: flex;

  white-space: pre-line;
`;

const WelcomeQuestionContainer2 = styled.div`
  width: 360px;
  min-height: 140px;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  margin-bottom: 24px;
`;

const WelcomeQuestionbox2 = styled.div`
  width: 198px;
  height: 56px;
  background-color: var(--white);
  /* background-color: blue; */
  position: absolute;
  left: 16px;
  top: 24px;
  font-style: normal;
  font-family: var(--headline-font-family);
  font-size: var(--headline_Large-font-size);
  font-weight: var(--headline_Large-font-weight);
  line-height: var(--headline_Large-line-height);
  white-space: pre-line;
`;
const WelcomeInfobox = styled.div`
  width: 206px;
  height: 40px;
  /* background-color: red; */
  left: 16px;
  top: 96px;
  position: absolute;
  font-style: normal;
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
  color: var(--black);
  background-color: var(--white);
`;

const AuthPhotoContainer = styled.div`
  width: 360px;
  min-height: 156px;
  background-color: var(--white);
  display: flex;
  justify-content: center;
  position: relative;
`;

const AutoPhotoOpenView = styled.label`
  width: 126px;
  height: 156px;
  background-color: var(--white);
  /* background-color: red; */
  left: 16px;
  box-sizing: border-box;
  position: absolute;
  border: 1px solid var(--primary2-400);
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
  background-color: var(--white);
`;
const InfoInput = styled.div`
  width: 126px;
  min-height: 156px;
  position: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--primary2-400);
  background-color: var(--white);
  border-radius: 8px;
  gap: 8px;
`;
const InfoImage = styled.img`
  background-color: var(--white);
`;
const InfoText = styled.div`
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  color: var(--primary2-400);
  background-color: var(--white);
`;

const ImagePreview = styled.img`
  width: 126px;
  min-height: 156px;
  border-radius: 8px;
  object-fit: contain;
  position: relative;
  display: flex;
  background-color: var(--white);
  border: 1px solid var(--primary2-400);
  border-radius: 8px;
  //   justify-content: center;
  //   align-items: center;
`;

const InputContainer = styled.div`
  width: 360px;
  min-height: 188px;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const InputBox = styled.div`
  width: 328px;
  height: 82px;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 14px;
`;
const InputBoxPassword = styled.div`
  width: 328px;
  height: 64px;
  background-color: var(--white);
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
  background-color: var(--white);
  font-style: normal;
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
`;

const InputText = styled.input`
  width: 328px;
  height: 44px;
  border-radius: 8px;
  border: none;
  background-color: var(--white);
  :focus {
    outline: none;
  }
`;

const InputErrorMessageBox = styled.div`
  width: 328px;
  height: 16px;
  background-color: var(--white);
  display: flex;
  align-items: center;
`;
const InputErrorMessageBoxPassword = styled.div`
  width: 304px;
  height: 16px;
  background-color: var(--white);
  display: flex;
  align-items: flex-end;
`;

const InputMessage = styled.div`
  width: 328px;
  height: 12px;
  font-style: normal;
  font-family: var(--body-font-family);
  font-size: var(--body_Small-font-size);
  font-weight: var(--body_Small-font-weight);
  line-height: var(--body_Small-line-height);
  letter-spacing: var(--body_Small-letter-spacing);
  color: var(--gray5);
  background-color: var(--white);
`;

const InputErrorMessage = styled.div`
  width: 328px;
  height: 12px;
  font-style: normal;
  font-family: var(--body-font-family);
  font-size: var(--body_Small-font-size);
  font-weight: var(--body_Small-font-weight);
  line-height: var(--body_Small-line-height);
  letter-spacing: var(--body_Small-letter-spacing);
  color: #d14343;
  background-color: var(--white);
`;

const PasswordViewButtonImg = styled.img`
  width: 24px;
  height: 24px;
  background-color: var(--white);
`;

const ErrorMsgPreview = styled.div`
  width: 328px;
  height: 24px;
  background-color: var(--white);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;
const BlankContainer = styled.div`
  width: 360px;
  height: 100%;
  background-color: var(--white);
`;
const BlankContainer2 = styled.div`
  width: 360px;
  height: 100%;
  background-color: var(--white);
`;
const ButtonContainer = styled.div`
  width: 360px;
  min-height: 92px;
  background-color: var(--white);
  display: flex;
  justify-content: center;
  /* background-color: green; */
`;

const ButtonStyle = styled.button`
  width: 328px;
  height: 60px;
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-family: var(--button-font-family);
  font-size: var(--button_Large-font-size);
  font-weight: var(--button_Large-font-weight);
  line-height: var(--button_Large-line-height);
  letter-spacing: var(--button_Large-letter-spacing);
  :disabled {
    background-color: var(--gray5);
  }
  :enabled {
    background-color: var(--primary2-400);
    color: var(--white);
  }
`;
