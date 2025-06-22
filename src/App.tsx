import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { EntrepreneurshipDetailsPage } from './pages/EntrepreneurshipDetailsPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { Footer } from './components/Footer';

export function App() {
  return (
    <BrowserRouter basename="/Turrialba-Emprende/">
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/entrepreneurship/:id" element={<EntrepreneurshipDetailsPage />} />
            <Route path="/register" element={<RegistrationPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
