import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { AdminLayouts } from '@/components/Layouts';

const instance = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 1000,
  headers: { 'Access-Control-Allow-Origin': '*' },
});

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be a positive number'),
  description: Yup.string().required('Description is required'),
  image: Yup.string().required('Image URL is required').url('Invalid URL'),
});

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

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

  const emptyProductObj = {
    name: '',
    price: '',
    description: '',
    image: '',
  };

  const onSubmit = (data) => {
    if (isEdit) {
      instance
        .put(`products/${editingProduct._id}`, data)
        .then((response) => {
          console.log(editingProduct);
          setEditingProduct({ ...response.data });
          console.log(editingProduct);
          fetchProducts();
          setIsEdit(false);
          toast.success('Product updated successfully');
        })
        .catch((error) => {
          toast.error('Failed to update product');
          console.error('Failed to update product:', error);
        });
    } else {
      instance
        .post('products', { ...data })
        .then((response) => {
          setProducts([...products, response.data]);
          toast.success('Product added successfully');
        })
        .catch((error) => {
          toast.error('Failed to add product');
          console.error('Failed to add product:', error);
        });
    }
    // window.location.reload(); // Reload the page

    setEditingProduct(null);
  };

  const deleteProduct = (id) => {
    instance
      .delete(`products/${id}`)
      .then(() => {
        const updatedProducts = products.filter(
          (product) => product._id !== id
        );
        setProducts(updatedProducts);
        toast.success('Product deleted successfully');
      })
      .catch((error) => {
        toast.error('Failed to delete product');
        console.error('Failed to delete product:', error);
      });
  };

  const handleEditProductBtn = (productid) => {
    setIsEdit(true);
    // editProduct(product._id);
    const editProduct = products?.filter(
      (product) => product._id === productid
    );
    console.log(editProduct[0], editingProduct, editProduct.length);
    setEditingProduct({ ...editProduct[0] });
    console.log(editingProduct);

    reset(editProduct[0]);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products?.filter(
    (product) =>
      product.name &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const FormCom = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='form-container'>
        <h2>{isEdit ? 'Edit Product' : 'Add Product'}</h2>
        <div className='input-container'>
          <label className='label'>Name:</label>
          <input
            type='text'
            name='name'
            className='input-field'
            {...register('name')}
          />
          {errors.name && <span className='error'>{errors.name.message}</span>}
        </div>
        <div className='input-container'>
          <label className='label'>Price:</label>
          <input
            type='text'
            // name='price'
            className='input-field'
            {...register('price')}
          />
          {errors.price && (
            <span className='error'>{errors.price.message}</span>
          )}
        </div>
        <div className='input-container'>
          <label className='label'>Description:</label>
          <input
            type='text'
            // name='description'
            className='input-field'
            {...register('description')}
          />
          {errors.description && (
            <span className='error'>{errors.description.message}</span>
          )}
        </div>
        <div className='input-container'>
          <label className='label'>Image URL:</label>
          <input
            type='text'
            // name='image'
            className='input-field'
            {...register('image')}
          />
          {errors.image && (
            <span className='error'>{errors.image.message}</span>
          )}
        </div>
        <div className='button-container'>
          <button className='save-btn' type='submit'>
            {isEdit ? 'Save' : 'Add'}
          </button>
          {isEdit && (
            <button
              className='cancel-btn'
              onClick={() => {
                setIsEdit(false);
                setEditingProduct(null);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(emptyProductObj);
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get('products');
        console.log('before: ', products);
        console.log('response: ', response.data);
        setProducts([...response.data]);
        console.log('after: ', products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <AdminLayouts>
      <div className='product-listing-page'>
        <div className='header'>
          <h1 className='title'>Products</h1>
          <div className='search-bar'>
            <input
              type='text'
              placeholder='Search products...'
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <FormCom />

        <table className='product-table'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id}>
                <td>
                  <div className='product-image'>
                    <img src={product.image} alt={product.name} />
                  </div>
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>
                  <button
                    className='edit-btn'
                    onClick={() => {
                      handleEditProductBtn(product._id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className='delete-btn'
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ToastContainer />
      </div>
    </AdminLayouts>
  );
};

export default ProductListingPage;
