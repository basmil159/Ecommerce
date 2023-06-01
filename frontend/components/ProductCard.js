import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded shadow p-4 mb-4 hover:scale-[1.01]">
      <img src={product.image} alt={product.name} className="border w-full h-32 object-cover mb-2" />
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="text-gray-500">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
