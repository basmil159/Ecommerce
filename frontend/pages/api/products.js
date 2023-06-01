const products = [
    { id: 1, name: 'Product 1', category: 'Category A', price: 19.99, image: 'product1.jpg' },
    { id: 2, name: 'Product 2', category: 'Category B', price: 29.99, image: 'product2.jpg' },
    { id: 3, name: 'Product 3', category: 'Category A', price: 9.99, image: 'product3.jpg' },
    // Add more product data
  ];
  
  export default function handler(req, res) {
    res.status(200).json(products);
  }
  