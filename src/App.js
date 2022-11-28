import Router from './router/Router';
import { useRecoilState } from 'recoil';
import { isLogin } from './store/store';
import { useEffect } from 'react';
import './app.css';

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
      <Router />
    </>
  );
}

export default App;
