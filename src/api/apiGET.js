import axios from 'axios';
import api from './api';

export async function ReadCity() {
  const response = await axios.get(
    'https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=*00000000'
  );
  return response.data;
}

export async function ReadWard({ cityCode }) {
  console.log(`https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${cityCode}*`);
  const response = await axios.get(
    `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=11${cityCode}*`
  );
  return response.data;
}

export async function ReadProfile() {
  const response = await axios.get('http://localhost:3003/api/myprofile');
  return response.data.data;
}

export async function ReadConsultingList() {
  const response = await axios.get('http://localhost:3003/api/consulting');
  return response.data.data;
}
