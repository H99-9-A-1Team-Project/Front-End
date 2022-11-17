import axios from 'axios';
import { func } from 'prop-types';
import api from './api';

//일반회원 회원가입
export async function MemberSignUp(MemberInfo) {
  const { data } = await api.post('v1/signup', MemberInfo);
  return data;
}

//이메일 중복확인
export async function RequestEmail(EmailDouble) {
  const { data } = await api.post('api/emailconfirm', EmailDouble);
  return data;
}

//공인중개사 회원가입
export async function RealtorSignUpFormDatas(RealtorInfo) {
  const { data } = await api.post('api/realtor/signup', RealtorInfo);
  return data;
}

// 로그인
export async function EmailLoginData(EmailData) {
  const data = await api.post('v1/login', EmailData);
  console.log(data);
  return data;
}

// 상담 신청하기
export async function SendRequest(datas) {
  const data = await api.post('v1/advicerequest', datas);
  return data;
}
