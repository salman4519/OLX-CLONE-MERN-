import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar/NavbarMain';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editProduct, setEditProduct] = useState({});
  const navigate = useNavigate();

  // Fetch products for the current user
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // Correct token key
        const response = await axios.get('http://localhost:5000/my-products', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();


  }, []);
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      // If no token, redirect to login page
      navigate('/');
    } else {
      // Make API call to get protected data if token is present
      getHomeData();
    }
  }, [navigate]); // Fix: Added navigate to dependencies

  const getHomeData = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get('/home', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error accessing home data:', error);
      navigate('/'); // Redirect to login if token is invalid
    }
  };

  // Handle delete product
  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem('jwtToken'); // Correct token key
      await axios.delete(`http://localhost:5000/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Remove deleted product from the state
      setProducts(products.filter((product) => product._id !== productId));
      toast.success("Product deleted successfully")
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Handle edit product
  const handleEdit = (product) => {
    setIsEditMode(true);
    setEditProduct(product);
  };

  // Handle save edit
  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem('jwtToken'); // Correct token key
      const { _id, productName, description, price } = editProduct;
      const response = await axios.put(
        `http://localhost:5000/products/${_id}`,
        { productName, description, price },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the products state with the edited product
      setProducts(
        products.map((product) =>
          product._id === _id ? response.data.product : product
        )
      );

      setIsEditMode(false);
      setEditProduct({});

      toast.sucess("Product edited Successfully")
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-semibold mb-6">My Products</h2>

        {isEditMode ? (
          <div className="bg-white p-4 rounded-lg shadow-lg mb-6 ml-48 mr-48">
            <h3 className="text-xl font-semibold mb-4">Edit Product</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={editProduct.productName || ''}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, productName: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
              <textarea
                placeholder="Description"
                value={editProduct.description || ''}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    description: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
              <input
                type="number"
                placeholder="Price"
                value={editProduct.price || ''}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, price: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
              <button
                onClick={handleSaveEdit}
                className="w-full py-2 bg-cyan-950 text-white rounded-lg hover:bg-cyan-900"
              >
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white p-4 rounded-lg shadow-lg border"
              >
                <img
                  src={product.imageUrl || 'default-image.jpg'}
                  alt={product.productName}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold">{product.productName}</h3>
                <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                <p className="text-lg font-semibold">₹{product.price}</p>

                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-cyan-950 text-white px-4 py-2 rounded-lg hover:bg-cyan-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyProducts;
