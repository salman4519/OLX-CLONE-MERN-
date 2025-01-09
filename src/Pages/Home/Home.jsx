import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products/list'); 
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="ml-5 mr-5 grid grid-cols-4 gap-4 ">
      {products
        ?.filter((data) =>
          data?.productName?.toLowerCase().includes(
            (props?.search || props?.menu || '').toLowerCase()
          )
        )
        .map((data) => (
          <Link
            to="/details"
            state={{ data: data }}
            key={data?._id} // Use `_id` from MongoDB as the unique key
          >
            <div className="border border-spacing-1 p-2 ml-3 mt-3 ">
              <img
                src={data?.imageUrl} // Use the `imageUrl` field from the database
                alt={data?.productName}
                className="w-60 h-48 object-cover ml-10 "
              />
              <h1 className="font-bold text-xl">₹{data?.price}</h1>
              <h1 className="text-sm">{data?.productName}</h1>
              {/* <h1 className="text-sm">{data?.category || 'No category'}</h1> */}
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Home;
