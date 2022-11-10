import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { CloseModal } from '../../store/store';
import SignUp from '../signup/SignUp';
import SignUpModalLayout from '../signup/SignUpModalLayout';
import { useNavigate } from 'react-router-dom';

export default function MainPageHeader() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useRecoilState(CloseModal);
  const onOpenModal = () => {
    setModalOpen(true);
  };
  const onCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <HeaderContainer>
        <HeaderLogo
          onClick={() => {
            navigate('/');
          }}
        >
          등대지기
        </HeaderLogo>
        <HeaderMenuMyPage onClick={() => navigate('/mypage')}>마이페이지</HeaderMenuMyPage>
        <HeaderMenuFootStepMain onClick={() => navigate('/footstep')}>발품 기록하기</HeaderMenuFootStepMain>
        <HeaderMenuSignUp
          type="button"
          onClick={() => {
            setModalOpen(!modalOpen);
          }}
        >
          회원가입
          {modalOpen && (
            <SignUpModalLayout visible={onOpenModal} closeable={true} maskCloseable={true} onClose={onCloseModal}>
              <SignUp />
            </SignUpModalLayout>
          )}
        </HeaderMenuSignUp>
      </HeaderContainer>
    </>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  height: 113px;
  background-color: aqua;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HeaderLogo = styled.div`
  margin-left: 50px;
  font-size: 50px;
  cursor: pointer;
`;

const HeaderMenuMyPage = styled.span`
  margin-left: 20px;
  font-size: 17px;
  cursor: pointer;
`;

const HeaderMenuFootStepMain = styled.span`
  margin-left: 20px;
  font-size: 17px;
  cursor: pointer;
`;

const HeaderMenuSignUp = styled.span`
  margin-left: 20px;
  font-size: 17px;
  cursor: pointer;
`;
