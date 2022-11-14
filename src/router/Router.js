import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import SignUp from '../pages/SignUp';
import Request from '../pages/RequestMain';
import './route.css';
export default function Router() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="request" element={<Request />} />
      </Routes>
    </div>
  );
}
