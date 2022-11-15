import axios from 'axios';

export async function RequestSignUp(UserInfo) {
  const { data } = await axios.post(
    'http://lighthouse-env.eba-di8putuk.ap-northeast-2.elasticbeanstalk.com/api/signup',
    UserInfo
  );
  return data;
}
export async function Emailcheck(UserInfo) {
  const { data } = await axios.post(
    'http://lighthouse-env.eba-di8putuk.ap-northeast-2.elasticbeanstalk.com/api/emailconfirm',
    UserInfo
  );
  return data;
}
export async function realtorSignup(UserInfo) {
  const { data } = await axios.post(
    'http://lighthouse-env.eba-di8putuk.ap-northeast-2.elasticbeanstalk.com/api/realtor/signup',
    UserInfo
  );
  return data;
}
export async function loginUser(UserInfo) {
  const res = await axios.post(
    'http://lighthouse-env.eba-di8putuk.ap-northeast-2.elasticbeanstalk.com/api/login',
    UserInfo
  );
  return res;
}
