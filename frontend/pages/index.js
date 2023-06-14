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

  useEffect(()=>{
    console.log(cartItems);
  },[loggedIn]);
  
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

  const openModal = () => {
    setIsModalOpen(true);
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
  const getToken = () =>{
    return localStorage.getItem('token');
  }
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
        .catch((error)=>{
          setIsModalOpen(true);
          setLoggedIn(true);
          router.push('/');
        })
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
      <header className='bg-gray-800 text-white py-4 px-8'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <img src='/logo.png' alt='Logo' className='w-8 h-8 mr-2' />
            <h1 className='text-xl font-bold'>My eCommerce Store</h1>
          </div>
          <div className='flex items-center'>
            {loggedIn == true && (
              <button className='bg-gray-200 rounded p-2' onClick={openModal}>
                <svg
                  className='svg-icon'
                  style={{
                    width: '1em',
                    height: '1em',
                    verticalAlign: 'middle',
                    fill: 'currentColor',
                    overflow: 'hidden',
                  }}
                  viewBox='0 0 1024 1024'
                  version='1.1'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M843.282963 870.115556c-8.438519-140.515556-104.296296-257.422222-233.908148-297.14963C687.881481 536.272593 742.4 456.533333 742.4 364.088889c0-127.241481-103.158519-230.4-230.4-230.4S281.6 236.847407 281.6 364.088889c0 92.444444 54.518519 172.183704 133.12 208.877037-129.611852 39.727407-225.46963 156.634074-233.908148 297.14963-0.663704 10.903704 7.964444 20.195556 18.962963 20.195556l0 0c9.955556 0 18.299259-7.774815 18.962963-17.73037C227.745185 718.506667 355.65037 596.385185 512 596.385185s284.254815 122.121481 293.357037 276.195556c0.568889 9.955556 8.912593 17.73037 18.962963 17.73037C835.318519 890.311111 843.946667 881.019259 843.282963 870.115556zM319.525926 364.088889c0-106.287407 86.186667-192.474074 192.474074-192.474074s192.474074 86.186667 192.474074 192.474074c0 106.287407-86.186667 192.474074-192.474074 192.474074S319.525926 470.376296 319.525926 364.088889z' />
                </svg>
              </button>
            )}
            {loggedIn == false && (
              <button className='bg-gray-200 rounded p-2' onClick={openModal}>
                Account
              </button>
            )}
          </div>
        </div>
      </header>

      <Modal
        setIsModalOpen={setIsModalOpen}
        isOpen={isModalOpen}
        user={user}
        onClose={closeModal}

        setLoggedIn={setLoggedIn}
        onSignin={handleSignin}
      ></Modal>
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
      <footer className='bg-gray-800 text-white py-4 px-8'>
        <div className='container mx-auto'>
          <div className='flex justify-between'>
            <div className='w-1/3'>
              <h2 className='text-lg font-bold mb-2'>About Us</h2>
              <p className='text-sm'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className='w-1/3'>
              <h2 className='text-lg font-bold mb-2'>Quick Links</h2>
              <ul className='text-sm'>
                <li>
                  <Link href='/'>Home</Link>
                </li>
                <li>
                  <Link href='/products'>Products</Link>
                </li>
                <li>
                  <Link href='/contact'>Contact Us</Link>
                </li>
              </ul>
            </div>
            <div className='w-1/3'>
              <h2 className='text-lg font-bold mb-2'>Follow Us</h2>
              <ul className='text-sm'>
                <li>
                  <a href='https://twitter.com'>Twitter</a>
                </li>
                <li>
                  <a href='https://facebook.com'>Facebook</a>
                </li>
                <li>
                  <a href='https://instagram.com'>Instagram</a>
                </li>
              </ul>
            </div>
          </div>
          <div className='text-center mt-4'>
            <p className='text-xs'>
              &copy; {new Date().getFullYear()} My eCommerce Store. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
