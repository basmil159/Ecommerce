import React, { useState } from 'react';

const ProductFilter = ({ categories, onFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleFilter = () => {
    onFilter(selectedCategory);
  };

  return (
    <div className="flex items-center mb-4">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded mr-2"
      >
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <button
        onClick={handleFilter}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Filter
      </button>
    </div>
  );
};

export default ProductFilter;
