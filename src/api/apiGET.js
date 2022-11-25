import api from './api';

export async function ReadProfile() {
  const response = await api.get('v1/myprofile');
  return response;
}

export async function ReadSignUpList() {
  const { data } = await api.get('v1/realtor-approval');
  return data;
}

export async function ReadRequestList() {
  const { data } = await api.get('v1/myconsult');
  return data;
}

export async function ReadWaitList() {
  const { data } = await api.get('v1/waitcustomer');
  return data;
}
export async function ReadAnsweredList() {
  const { data } = await api.get('v1/replied');
  return data;
}

export async function ReadImgFootStep() {
  const { data } = await api.get('v1/premises/27?page=0&size=5');
  return data;
}
