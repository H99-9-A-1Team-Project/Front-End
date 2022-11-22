import api from './api';

//프로필 조회
export async function ReadProfile() {
  const response = await api.get('v1/myprofile');
  return response;
}
//공인중개사 회원가입 목록 조회
export async function ReadSignUpList() {
  const { data } = await api.get('v1/realtor-approval');
  return data;
}
//일반유저 상담 목록 조회
export async function ReadRequestList() {
  const { data } = await api.get('v1/myconsult');
  return data;
}
//공인중개사 대기중 상담 목록 조회
export async function ReadWaitList() {
  const { data } = await api.get('v1/waitcustomer');
  return data;
}
//공인중개사 답변한 상담 목록 조회
export async function ReadAnsweredList() {
  const { data } = await api.get('v1/replied');
  return data;
}
//상담 상세페이지 조회
export async function ReadConsultDetail(id) {
  const { data } = await api.get(`v1/consult/${id}`);
  return data;
}
