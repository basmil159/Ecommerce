import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
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
                  <Link href='https://twitter.com'>Twitter</Link>
                </li>
                <li>
                  <Link href='https://facebook.com'>Facebook</Link>
                </li>
                <li>
                  <Link href='https://instagram.com'>Instagram</Link>
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
  )
}

export default Footer