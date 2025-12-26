
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Step 1: Expose React and ReactDOM to the global window object.
// UMD libraries like Recharts expect these to be available globally to initialize correctly.
(window as any).React = React;
(window as any).ReactDOM = ReactDOM;

// Step 2: Dynamically load the Recharts script AFTER globals are set.
const loadRecharts = () => {
  const script = document.createElement('script');
  script.src = "https://unpkg.com/recharts/umd/Recharts.min.js";
  script.async = true;
  document.head.appendChild(script);
};

loadRecharts();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
