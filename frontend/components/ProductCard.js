import React, { useState } from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  const [hovered, setHovered] = useState(false);
  const handleAddToCart = () => {
    // Call the onAddToCart function and pass the product ID
    onAddToCart({...product,quantity: 1,});
    addToCart();

  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const addToCart = () => {
    // Implement the logic to add the product to the cart here
    console.log('Add to Cart clicked for product:', {...product,quantity: 1,});
  };

  return (
    <div
      className="relative overflow-hidden bg-white rounded-lg shadow-md"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {hovered && (
        <button
          className="absolute top-2 right-2 z-10 bg-blue-500 text-white px-2 py-1 rounded"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      )}

      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-gray-900 font-semibold">{product.name}</h3>
        <p className="text-gray-700">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
