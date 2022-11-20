import axios from 'axios';
import api from './api';

export async function UpdateRealtorApproval(arg) {
  const { data } = await api.put('v1/realtor-approval', arg);
  return data;
}

export async function UpdateRealtorProfile(arg) {
  const { data } = await api.put('v1/realtor/profile', arg,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function UpdateUserProfile(arg) {
  const { data } = await api.put('v1/user/edit-nickname', arg);
  return data;
}