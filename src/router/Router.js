import { Routes, Route } from 'react-router-dom';
import Mainpage from '../pages/MainPage';

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Mainpage />} />
      </Routes>
    </>
  );
}
