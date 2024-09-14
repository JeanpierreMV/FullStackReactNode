import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterClient from './pages/RegisterClient';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/registrar-cliente" element={<RegisterClient />} />
      </Routes>
    </Router>
  );
};

export default App;
