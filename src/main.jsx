// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; // Use createRoot for React 18+
import App from './App'; // Import the main App component

// Find the root element in public/index.html
const container = document.getElementById('root');
const root = createRoot(container); // Create a root

// Render the App component into the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
