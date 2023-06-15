import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartContext } from '../../context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CartPage = () => {
  const { cartItems } = useContext(CartContext);
  const [quantity, setQuantity] = useState([]);

  const instance = axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 1000,
    headers: { 'Access-Control-Allow-Origin': '*' },
  });

  let quantityArray = [];
  cartItems.map((cartItem) => {
    quantityArray.push(cartItem.quantity);
  });

  const handleDecrement = (index) => {
    // Decrease the quantity by 1 for the specific cart item
    cartItems.map((cartItem) => {
      if (cartItem._id === cartItemId && cartItem.quantity > 1) {
        cartItem.quantity = cartItem.quantity - 1;
      }
    });
    // Update the cartItems state with the updatedCartItems
    // You need to implement the logic to update the cartItems in the CartContext
  };

  const handleIncrement = (index) => {
    // Increase the quantity by 1 for the specific cart item
    cartItems.map((cartItem) => {
      if (cartItem._id === cartItemId) {
        cartItem.quantity = cartItem.quantity + 1;
        setQuantity();
      }
    });
    console.log(cartItems, index);
    // Update the cartItems state with the updatedCartItems
    // You need to implement the logic to update the cartItems in the CartContext
  };

  useEffect(() => {
    cartItems.map((cartItem) => {
      cartItem.quantity = cartItem.quantity;
    });
  }, []);
  return (
    <div className='flex flex-col min-h-screen justify-between'>
      <Header />
      <div className='container mx-auto p-4 h-full'>
      <ToastContainer />
        <h1 className='text-2xl font-bold mb-4'>Cart</h1>
      </div>
      <div className='container mx-auto p-4 h-full'>
        {cartItems.length === 0 ? (
          <p>No items in the cart</p>
        ) : (
          <ul>
            {cartItems.map((cartItem, index) => (
              <li
                key={cartItem._id}
                className='flex h-[50px] items-center justify-between px-8 border-b-2'
              >
                <img
                  src={cartItem.image}
                  alt={cartItem.name}
                  className='w-12 h-12 object-contain'
                />
                <h3>{cartItem.name}</h3>
                <span>Price: ${cartItem.price}</span>
                <p className='w-64'>
                  <button
                    className='p-2 text-lg font-bold'
                    onClick={() => handleDecrement(index)}
                  >
                    -
                  </button>
                  <input
                    type='number'
                    className='bg-slate-100 w-12'
                    value={cartItem.quantity}
                    readOnly
                  />
                  <button
                    className='p-2 text-lg font-bold'
                    onClick={() => handleIncrement(index)}
                  >
                    +
                  </button>
                </p>
                <button>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
