import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage.tsx';
import UploadPage from './UploadPage.tsx';
import FileCard from './FileCard.tsx';
import './index.css';

const mockFileFromServer = {
    id: "12345",
    name: "testArchiveName.zip",
    size: "42.5 MB",
    uploadedAt: "2026-07-20"
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/download" element={<FileCard file={mockFileFromServer}/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);