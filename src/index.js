import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextprovider } from './context/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextprovider>
      <App />
    </AuthContextprovider>
  </React.StrictMode>
);
