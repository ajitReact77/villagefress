import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// 🆕 Only register service worker in production environment
import {register} from './serviceWorkerRegistration.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Only register service worker in production to avoid StackBlitz errors
if (import.meta.env.PROD) {
  register();
}