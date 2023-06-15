import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import ProductList from '../components/ProductList';
import ProductSearch from '../components/ProductSearch';
import ProductFilter from '../components/ProductFilter';
import Modal from '../components/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { CartContext } from '../context/CartContext';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const instance = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 1000,
  headers: { 'Access-Control-Allow-Origin': '*' },
});

const HomePage = () => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [signupData, setSignupData] = useState(null);
  const [signinData, setSigninData] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [user, setUser] = useState();

  const { addToCart } = useContext(CartContext);
  const { cartItems } = useContext(CartContext);

  useEffect(() => {
    console.log(cartItems);
  }, [loggedIn]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (category) => {
    setFilterCategory(category);
  };

  const handleSignup = (username, password) => {
    setSignupData({ username, password });
  };

  const handleSignin = (username, password) => {
    setSigninData({ username, password });
  };



  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchProducts = () => {
      instance
        .get('products')
        .then((response) => {
          setProducts([...response.data]);
        })
        .catch((error) => {
          toast.error('Failed to fetch products');
          console.error('Failed to fetch products:', error);
        });
    };

    fetchProducts();
  }, []);
  const getToken = () => {
    return localStorage.getItem('token');
  };
  useEffect(() => {
    const token = getToken();

    if (token) {
      instance
        .get('verify', {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setUser(response.data);
          setLoggedIn(false);
          setIsModalOpen(false);
        })
        .catch((error) => {
          setIsModalOpen(true);
          setLoggedIn(true);
          router.push('/');
        });
    }
  }, []);

  useEffect(() => {
    // Apply filtering when the filterCategory or products change
    const filtered = products.filter((product) => {
      if (filterCategory === '') {
        return true;
      } else {
        return product.category === filterCategory;
      }
    });

    setFilteredProducts(filtered);
  }, [filterCategory, products]);

  return (
    <div className='flex flex-col min-h-screen'>
      <ToastContainer />
      <Header
        setIsModalOpen={setIsModalOpen}
        isOpen={isModalOpen}
        user={user}
        onClose={closeModal}
        setLoggedIn={setLoggedIn}
        onSignin={handleSignin}
      />
      <main className='flex-grow'>
        <div className='container mx-auto p-4'>
          <ProductSearch onSearch={handleSearch} />
          <ProductFilter
            categories={['Category A', 'Category B']} // Add more categories
            onFilter={handleFilter}
          />
          <ProductList
            products={filteredProducts}
            searchTerm={searchTerm}
            signupData={signupData}
            onAddToCart={addToCart}
            signinData={signinData}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
