import { BrowserRouter, Routes, Route } from 'react-router-dom';

import TestPage from '@/pages/TestPage';
import HotelListPage from '@/pages/HotelListPage';
import HotelPage from '@/pages/HotelPage';
import useLoadKakao from './hooks/useLoadKakao';

export default function App() {
  useLoadKakao();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HotelListPage />} />
        <Route path='/hotel/:id' element={<HotelPage />} />
        <Route path='/test' element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  );
}
