
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VerificationPage from './pages/VerificationPage';
import Escorts from './pages/Escorts';
import { Toaster } from '@/components/ui/toaster';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/verification" element={<VerificationPage />} />
          <Route path="/escorts" element={<Escorts />} />
          {/* Add more routes as needed */}
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
