import axios from 'axios';
import api from './api';

//공인중개사 회원가입 승인/거부
export async function UpdateRealtorApproval(arg) {
  const { data } = await api.put('v1/realtor-approval', arg);
  return data;
}
//공인중개사 프로필 수정
export async function UpdateRealtorProfile(arg) {
  const { data } = await api.put('v1/realtor/profile', arg, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
}
//일반유저 닉네임 수정
export async function UpdateUserProfile(arg) {
  const { data } = await api.put('v1/user/edit-nickname', arg);
  return data;
}
//answerState "Answer"=>Finish
export async function UpdateConsultAnswerState(payload) {
  const { data } = await api.put(`v1/consult/${payload.id}`, payload.state);
  return data;
}
