import '@/styles/globals.css'

import React from 'react';
import { CartProvider } from '../context/CartContext';

// import '../styles.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}
