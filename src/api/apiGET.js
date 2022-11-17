import axios from 'axios';
import api from './api';

export async function ReadProfile() {
  const response = await api.get('v1/myprofile');
  return response;
}

export async function ReadSignUpList() {
  const { data } = await api.get('v1/realtor-approval');
  return data;
}
