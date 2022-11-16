import axios from 'axios';
import api from './api';

//회원탈퇴
export async function DeleteUser() {
  const res = await api.delete('v1/user');
  return res;
}
