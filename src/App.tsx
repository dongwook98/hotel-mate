import { BrowserRouter, Routes, Route } from 'react-router-dom';

import TestPage from '@/pages/TestPage';
import HotelListPage from '@/pages/HotelListPage';
import HotelPage from '@/pages/HotelPage';
import MyPage from './pages/MyPage';
import SigninPage from './pages/SigninPage';

import useLoadKakao from './hooks/useLoadKakao';
import AuthGuard from './components/auth/AuthGuard';
import Navbar from './components/shared/Navbar';

export default function App() {
  useLoadKakao();

  return (
    <BrowserRouter>
      <AuthGuard>
        <Navbar />
        <Routes>
          <Route path='/' element={<HotelListPage />} />
          <Route path='/hotel/:id' element={<HotelPage />} />
          <Route path='/my' element={<MyPage />} />
          <Route path='/signin' element={<SigninPage />} />
          <Route path='/test' element={<TestPage />} />
        </Routes>
      </AuthGuard>
    </BrowserRouter>
  );
}
