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

export async function ReadImgFootStep() {
  const { data } = await api.get('v1/premises/27?page=1&size=5');
  return data;
}

//상담 상세페이지 조회
export async function ReadConsultDetail(id) {
  const { data } = await api.get(`v1/consult/${id}`);
  return data;
}

//매물 목록 조회
export async function ReadPremisesList() {
  const { data } = await api.get('v1/premises/allpost');
  return data;
}

//삭제 계정 조회
export async function ReadDeleteList(page) {
  // const { data } = await api.get(`v1/survey?page=${page}&size=5`);
  const { data } = await api.get(`v1/survey`);
  return data;
}
