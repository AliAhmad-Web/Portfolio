// Application entry point. Renders the React app inside StrictMode with HelmetProvider for SEO meta tags.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './index.css'; // Global Tailwind styles and custom CSS.
import App from './App.jsx'; // Root component containing all sections.

// Mount the app to the root div in index.html.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
);