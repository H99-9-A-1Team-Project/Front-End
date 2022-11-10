import axios from 'axios';
import api from '../api/api';

//일반회원 회원가입
export async function MemberSignUp(MemberInfo) {
  const { data } = await axios.api.post('api/member/signup', MemberInfo);
  return data;
}

//이메일 중복확인
export async function RequestEmail(EmailDouble) {
  const { data } = await axios.post('api/emailconfirm', EmailDouble);
  return data;
}

//닉네임 중복확인
export async function RequestNickName(NickNameDouble) {
  const { data } = await axios.post('api/member/signup', NickNameDouble);
  return data;
}

//공인중개사 회원가입
export async function RealtorSignUpFormDatas(RealtorInfo) {
  const { data } = await axios.post('api/realtor/signup', RealtorInfo);
  return data;
}

//로그인 (일반회원, 공인중개사, 관리자 - api url 경로 동일)
export async function EmailLoginData(EmailData) {
  const data = await api.post('api/login', EmailData);
  return data;
}
