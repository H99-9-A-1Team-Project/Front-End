import Router from './router/Router';
import { useRecoilState } from 'recoil';
import { isLogin } from './store/store';
import { useEffect } from 'react';

function App() {
  const [AppLogin, setAppLogin] = useRecoilState(isLogin);
  useEffect(() => {
    if (sessionStorage.getItem('access_token') !== null) {
      setAppLogin(true);
    } else {
      setAppLogin(false);
    }
  }, [AppLogin]);

  // if (!!document.cookie.match('(^|;) ?' + 'access_token' + '=([^;]*)(;|$)')) {
  //   console.log('쿠키들어감쿠키들어감쿠키들어감쿠키들어감쿠키들어감쿠키들어감쿠키들어감쿠키들어감쿠키들어감쿠키들어감쿠키들어감쿠키들어감쿠키들어감');
  //   sessionStorage.setItem('access_token', document.cookie.match('(^|;) ?' + 'access_token' + '=([^;]*)(;|$)')[2]);
  //   sessionStorage.setItem('refresh_token', document.cookie.match('(^|;) ?' + 'refresh_token' + '=([^;]*)(;|$)')[2]);
  //   sessionStorage.setItem('accountstate', document.cookie.match('(^|;) ?' + 'accountstate' + '=([^;]*)(;|$)')[2]);
  //   sessionStorage.setItem('nickname', document.cookie.match('(^|;) ?' + 'nickname' + '=([^;]*)(;|$)')[2]);
  // }

  return (
    <>
      <Router />
    </>
  );
}

export default App;
