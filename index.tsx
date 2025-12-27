
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Step 1: Robustly expose React and ReactDOM to the global window object.
// UMD bundles like Recharts check for these globals (case-sensitive variants) to initialize components.
(window as any).React = React;
(window as any).ReactDOM = ReactDOM;
(window as any)['react'] = React;
(window as any)['react-dom'] = ReactDOM;

// Step 2: Dynamically load the Recharts script ONLY after globals are established.
const loadRecharts = () => {
  const script = document.createElement('script');
  script.src = "https://unpkg.com/recharts/umd/Recharts.min.js";
  script.async = true;
  script.id = "recharts-umd-script";
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
