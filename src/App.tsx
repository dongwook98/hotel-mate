import { BrowserRouter, Routes, Route } from 'react-router-dom';

import TestPage from '@/pages/TestPage';
import HotelListPage from '@/pages/HotelListPage';
import HotelPage from '@/pages/HotelPage';

export default function App() {
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
