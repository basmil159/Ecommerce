import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, searchTerm }) => {
  const filteredProducts = products.filter((product) => {
    if (searchTerm === '') {
      return true;
    } else {
      return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
