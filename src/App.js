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
    console.log(AppLogin);
  }, [AppLogin]);

  return (
    <>
      <button>테스트123</button>
      <Router />
    </>
  );
}

export default App;
