import axios from 'axios';
import api from './api';

export async function ReadCity() {
  const response = await axios.get('https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=*00000000');
  return response.data;
}

export async function ReadWard({ cityCode }) {
  console.log(`https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${cityCode}*`);
  const response = await axios.get(`https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=11${cityCode}*`);
  return response.data;
}

export async function ReadProfile() {
  const response = await api.get('v1/myprofile');
  return response;
}

export async function ReadSignUpList() {
  const response = await api.get('v1/realtor-approval');
  return response;
}
