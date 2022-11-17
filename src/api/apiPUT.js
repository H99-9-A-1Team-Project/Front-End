import axios from 'axios';
import api from './api';

export async function UpdateRealtorApproval(arg) {
  const { data } = await api.put('v1/realtor-approval', arg);
  return data;
}
