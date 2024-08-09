import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './assets/css/PPTelegraf/PPTelegraf-Regular.otf';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <CartProvider>
        <App />
    </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
