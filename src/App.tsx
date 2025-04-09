
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EscortsModule } from '@/modules/escorts/EscortsModule';
import PersonasPage from '@/pages/Personas';
import ProfilePage from '@/pages/ProfilePage';
import PersonaProfile from '@/pages/PersonaProfile';
// Import other pages as needed

function App() {
  return (
    <Router>
      <EscortsModule>
        <Routes>
          <Route path="/" element={<PersonasPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/persona/:username" element={<PersonaProfile />} />
          {/* Add more routes as needed */}
        </Routes>
      </EscortsModule>
    </Router>
  );
}

export default App;
