import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import RequestPage from '../pages/RequestPage';

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/request" element={<RequestPage />} />
      </Routes>
    </>
  );
}
