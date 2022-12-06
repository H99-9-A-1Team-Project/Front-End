import api from './api';

//일반회원 회원가입
export async function MemberSignUp(MemberInfo) {
  const { data } = await api.post('v1/signup', MemberInfo);
  return data;
}

//이메일 중복확인
export async function RequestEmail(EmailDouble) {
  const { data } = await api.post('v1/emailconfirm', EmailDouble);
  return data;
}

//공인중개사 회원가입
export async function RealtorSignUpFormDatas(RealtorInfo) {
  const { data } = await api.post('v1/realtor/signup', RealtorInfo, { headers: { 'Content-Type': 'multipart/form-data' } });
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

export async function SendNfsc(datas) {
  const data = await api.post('v1/premises', datas);
}

// 상담 답변 작성하기(이미지)
export async function RequestConsultCommentImage(arg) {
  const { data } = await api.post(`v1/consult/${arg.id}/img`, arg.formData);
  return data;
}

// 상담 답변 작성하기(텍스트)
export async function RequestConsultComment(arg) {
  const { data } = await api.post(`v1/consult/${arg.id}/comment`, arg.contents);
  return data;
}

// 좋아요
export async function RequestLike(arg) {
  const { data } = await api.post(`v1/like/${arg}`, '');
  return data;
}

//회원탈퇴
export async function DeleteUser(arg) {
  const res = await api.post('v1/user', arg);
  return res;
}

