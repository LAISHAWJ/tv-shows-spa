// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Detail } from './pages/Detail';
import './App.css';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>

        <footer className="footer">
          <div>WeverWatch Oficial</div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
