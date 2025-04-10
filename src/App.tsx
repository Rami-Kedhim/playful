
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UberCorePanel from './components/uberCore/UberCorePanel';

function App() {
  return (
    <Router>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">UberCore Architecture</h1>
        <Routes>
          <Route path="/" element={<UberCorePanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
