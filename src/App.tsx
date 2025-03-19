import { BrowserRouter, Routes, Route } from 'react-router-dom';

import TestPage from '@/pages/TestPage';
import HotelListPage from '@/pages/HotelListPage';
import HotelPage from '@/pages/HotelPage';
import MyPage from './pages/MyPage';
import SigninPage from './pages/SigninPage';
import SettingsPage from './pages/settings';
import LikePage from './pages/settings/like';

import useLoadKakao from './hooks/useLoadKakao';
import AuthGuard from './components/auth/AuthGuard';
import Navbar from './components/shared/Navbar';
import PrivateRoute from './components/auth/PrivateRoute';

export default function App() {
  useLoadKakao();

  return (
    <BrowserRouter>
      <AuthGuard>
        <Navbar />
        <Routes>
          <Route path='/' element={<HotelListPage />} />
          <Route path='/hotel/:id' element={<HotelPage />} />
          <Route
            path='/my'
            element={
              <PrivateRoute>
                <MyPage />
              </PrivateRoute>
            }
          />
          <Route path='/signin' element={<SigninPage />} />
          <Route
            path='/settings'
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/settings/like'
            element={
              <PrivateRoute>
                <LikePage />
              </PrivateRoute>
            }
          />
          <Route path='/test' element={<TestPage />} />
        </Routes>
      </AuthGuard>
    </BrowserRouter>
  );
}
