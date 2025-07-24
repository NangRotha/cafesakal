// src/App.jsx
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Menu from './pages/Menu';
import MenuPage from './pages/MenuPage';
import ContactPage from './pages/ContactPage';
import './index.css'; // Corrected import path: ContactPage is in 'pages'

// Main App component that orchestrates the pages
const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-inter antialiased">
      {/* Tailwind CSS CDN - for local development, you'd typically configure PostCSS */}
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <Header /> {/* Render the Header component */}

      {/* Main content sections, acting as "pages" */}
      <HomePage />
      <Menu />
      <MenuPage />
      {/* <ContactPage /> */}

      <Footer /> {/* Render the Footer component */}
    </div>
  );
};

export default App;
