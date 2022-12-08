import React, { useState } from 'react';
import styled from 'styled-components';
import pathLeft from '../../global/sources/Expand_left_light.svg';
import Plus from '../../global/sources/Add.svg';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { NextTor, CloseModal, ChangeSignUp, itsNotOK, itsNotOK2, LoginDatas, toastVisible, TextToast } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import CompleteModal from './CompleteModal';
import ViewPassword from '../../global/sources/View_outlined.svg';
import HidePassword from '../../global/sources/View_hide.svg';
import { useMutation } from '@tanstack/react-query';
import { RealtorSignUpFormDatas, RequestEmail } from '../../api/apiPOST';
import InnerModal from '../signup/InnerModal';
import imageCompression from 'browser-image-compression';

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

  //비밀번호 양식 다시 짚어줄 useState
  const [checkvalid, setCheckValid] = useState('');

  //이메일 중복여부 확인 state
  const [doubleEmail, setDoubleEmail] = useState({
    email: '',
  });

  //이메일 중복확인 완료 state
  const [okemail, setOkEmail] = useState('');

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

  // toast 띄우는 state
  const setVisible = useSetRecoilState(toastVisible);

  // toast 에 들어갈 문구 recoilstate
  const [toasttext, setToastText] = useRecoilState(TextToast);

  //회원가입 오류 출력 state
  const [reject, setReject] = useState('');

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
  //모달 열고 닫기
  const onOpenModal = () => {
    setModalOpen(true);
  };
  const onCloseModal = () => {
    setModalOpen(false);
    navigate('/');
  };

  //페이지 넘기기
  const onPrevRealtorPage = () => {
    setNextTor(nexttor - 1);
    setValid(false);
    setPsValid(false);

    setPreviewImage('');
  };
  const onPrevRealtorChoicePage = () => {
    navigate('/signup');
    setNextTor(0);
  };

  const onNextRealtorPage = () => {
    setNextTor(nexttor + 1);
    setValid(false);
    setPsValid(false);
    setLoginData(loginData);
  };

  // 이메일 비밀번호 onchange // 닉네임 생성
  const onChangeEmail = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    const Email = e.target.value;
    const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (exptext.test(Email) == true) {
      setCheckemail('알맞은 형식입니다 :) ');
      setIsEmail(true);
      setValid(true);
    }

    if (e.target.value === '') {
      setCheckemail('');
      setIsEmail('');
    }
  };

  const onblurChange = () => {
    const Email = loginData.email;
    const Nickname = loginData.email.split('@')[0];
    setLoginData({ ...loginData, nickname: Nickname });
    setDoubleEmail({ ...loginData, email: Email });
    const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (exptext.test(Email) == false) {
      setCheckemail('잘못된 이메일 형식입니다.');
      if (Email === '') {
        setCheckemail('이메일을 입력하세요');
      }
      setIsEmail(false);
      setValid(false);
    } else {
      setCheckemail('알맞은 형식입니다 :) ');
      setIsEmail(true);
      setValid(true);
    }
  };

  //이메일 중복확인
  const { mutate: memberEmail } = useMutation(RequestEmail, {
    onSuccess: (response) => {
      setOkEmail('가입이 가능한 이메일입니다');
      onNextRealtorPage();
      setDoubleEmail('');
    },
    onError: (err) => {
      setCheckemail('이미 가입된 이메일입니다');
      setIsEmail(false);
      setDoubleEmail('이미 가입된 이메일입니다');
    },
  });
  const onCheckEmailDouble = () => {
    setOkEmail('');
    memberEmail(doubleEmail);
    setLoginData(loginData);
  };

  const onChangePassword = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    const passwordData = e.target.value;
    const expword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$^&*-]).{8,}$/;
    if (expword.test(passwordData) == false) {
      setCheckPassword('잘못된 비밀번호 형식입니다');
      setCheckValid('8-30자리 영대・소문자, 숫자, 특수문자 조합');
      if (e.target.value === '') {
        setCheckPassword('비밀번호를 입력하세요');
        setIsPassword('');
        setCheckValid('');
      }
      setIsPassword(false);
      setPsValid(false);
    } else {
      setCheckPassword('알맞은 형식입니다 :)');
      setCheckValid('');
      setIsPassword(true);
      setPsValid(true);
    }
  };

  const onClick = () => {
    doubleEmail === '' ? onNextRealtorPage() : onCheckEmailDouble();
  };
  const onActiveEnter = (e) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  //이미지 미리보기

  const [licenseimage, setLicenseImage] = useState('');
  const onFileChangeHandler = (e) => {
    let reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = () => {
      const resultImage = reader.result;
      setPreviewImage(resultImage);
      console.log(resultImage);
    };
  };

  //mutate
  const { mutate: postFormData } = useMutation(RealtorSignUpFormDatas, {
    onSuccess: (response) => {},
    onError: (error) => {
      setVisible(true);
      setToastText(error.response.data.errorMessage);
    },
  });

  //가입하기 (이미지 압축)
  const onSubmit = async (e) => {
    const blob0 = new Blob(
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
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(image.files[0], options);
      console.log('압축결과', compressedFile);
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        const base64data = reader.result;
        onHandlingDataForm(base64data);
      };
    } catch (error) {
      console.log(error);
    }
    const onHandlingDataForm = async (dataURI) => {
      const byteString = atob(dataURI.split(',')[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ia], {
        type: 'image/jpeg',
      });
      const file = new File([blob], 'image.jpg');
      setLicenseImage(...licenseimage, file);
      let formData = new FormData();
      formData.append('license', file);
      formData.append('content', blob0);
      postFormData(formData);
    };
  };

  const isVaildPhoto = !previewimage;
  return (
    <>
      {nexttor === 0 ? (
        <ChoiceContainer>
          <SignUpHeader>
            <BackpageIconBox src={pathLeft} onClick={onPrevRealtorChoicePage} />
            <SignUpTitle>회원가입</SignUpTitle>
          </SignUpHeader>
          <WelcomeQuestionContainer>
            <WelcomeQuestionbox>{welcometext}</WelcomeQuestionbox>
          </WelcomeQuestionContainer>
          <InputContainer>
            <InputBox>
              <InputName>아이디(이메일)</InputName>

              <>
                <InputTextBox>
                  <InputText
                    placeholder="lighthouse@gmail.com"
                    name="email"
                    onChange={onChangeEmail}
                    onBlur={onblurChange}
                    style={{
                      border: isEmail === false ? '1px solid #d14343 ' : 'none',
                    }}
                  ></InputText>
                </InputTextBox>
                {okemail === '' ? (
                  <InputErrorMessageBox>{isEmail === false ? <InputErrorMessage>{checkemail === '' ? null : checkemail}</InputErrorMessage> : <InputMessage>{checkemail === '' ? null : checkemail}</InputMessage>}</InputErrorMessageBox>
                ) : (
                  <InputErrorMessageBox>{errormail === '' ? <InputMessage>{okemail}</InputMessage> : <InputErrorMessage>{errormail}</InputErrorMessage>}</InputErrorMessageBox>
                )}
              </>
            </InputBox>
            <InputBoxPassword>
              <InputName>비밀번호</InputName>
              <InputTextBox>
                <InputText
                  placeholder="8-30자리 영대・소문자, 숫자, 특수문자 조합"
                  autocomplete="current-password"
                  name="password"
                  onChange={onChangePassword}
                  onKeyDown={(e) => onActiveEnter(e)}
                  type={secret === false ? 'text' : 'password'}
                  style={{
                    border: isPassword === false ? '1px solid #d14343 ' : 'none',
                  }}
                ></InputText>
              </InputTextBox>
            </InputBoxPassword>
            <PasswordContainer>
              <ErrorMsgPreview>
                <InputErrorMessageBoxPassword>
                  <InputErrorMessageBox>{isPassword === false ? <InputErrorMessage>{checkpassword === '' ? null : checkpassword}</InputErrorMessage> : <InputMessage>{checkpassword === '' ? null : checkpassword}</InputMessage>}</InputErrorMessageBox>
                </InputErrorMessageBoxPassword>
                <InputErrorMessageBoxPassword>
                  <InputErrorMessageValid>{isPassword === false ? <InputErrorMessage>{checkvalid === '' ? null : checkvalid}</InputErrorMessage> : <InputMessage>{checkvalid === '' ? null : checkvalid}</InputMessage>}</InputErrorMessageValid>
                </InputErrorMessageBoxPassword>
              </ErrorMsgPreview>
              <PasswordViewButtonImg src={secret === false ? ViewPassword : HidePassword} onClick={onPreviewPW} />
            </PasswordContainer>
          </InputContainer>
          <BlankContainer></BlankContainer>
          <ButtonContainer>
            <ButtonStyle
              type="button"
              disabled={isValidLogin}
              onClick={() => {
                doubleEmail === '' ? onNextRealtorPage() : onCheckEmailDouble();
              }}
            >
              다음
            </ButtonStyle>
          </ButtonContainer>
        </ChoiceContainer>
      ) : null}
      {nexttor === 1 ? (
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
              {previewimage && <ImagePreview src={previewimage} />}
            </AutoPhotoOpenView>
          </AuthPhotoContainer>
          <BlankContainer2></BlankContainer2>
          <ButtonContainer>
            <ButtonStyle
              // type="submit"
              type="button"
              disabled={isVaildPhoto}
              onClick={() => {
                onOpenModal();
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
  width: 24px;
  height: 24px;
  background-color: var(--white);

  margin-left: 16px;

  cursor: pointer;
`;
const SignUpTitle = styled.div`
  background-color: var(--white);
  width: 296px;
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

const InputTextBox = styled.div`
  width: 328px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const InputText = styled.input`
  width: 304px;
  height: 44px;
  border-radius: 8px;
  padding-left: 8px;
  border: none;
  background-color: var(--white);
  :focus {
    outline: none;
  }
`;

const InputErrorMessageBox = styled.div`
  width: 304px;
  height: 16px;
  margin-top: 4px;
  margin-bottom: 2px;
  display: flex;
`;

const InputErrorMessageValid = styled.div`
  width: 265px;
  height: 16px;
  margin-top: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const InputErrorMessageBoxPassword = styled.div`
  width: 265px;
  height: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  background-color: transparent;
`;

const PasswordViewButtonImg = styled.img`
  width: 24px;
  height: 24px;
  background-color: var(--white);
  margin-right: 2px;
  margin-top: 2px;
`;

const ErrorMsgPreview = styled.div`
  width: 304px;
  height: 24px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const PasswordContainer = styled.div`
  width: 304px;
  height: 40px;
  display: flex;
  flex-direction: row;
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
  cursor: pointer;
  :disabled {
    background-color: var(--gray5);
  }
  :enabled {
    background-color: var(--primary2-400);
    color: var(--white);
  }
`;

