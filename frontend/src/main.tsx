import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage.tsx';
import UploadPage from './UploadPage.tsx';
import FileCard from './FileCard.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/download" element={<FileCard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);