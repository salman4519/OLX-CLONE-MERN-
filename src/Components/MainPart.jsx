import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar/Navbar";
import Menubar from './menubar';
import Home from "../Pages/Home/Home";
import Footer from './Footer';
import NavbarMain from "./Navbar/NavbarMain";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Main = () => {
  const navigate = useNavigate(); // Fix: Invoke useNavigate() correctly
  const [prod, setProd] = useState([]);
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState("");

  // Function to fetch products from fake API
  const getProducts = async () => {
    const resp = await fetch('https://fakestoreapi.com/products');
    const json = await resp.json();
    setProd(json);
  };

  // Fetch products only once when the component is mounted
  useEffect(() => {
    getProducts();
  }, []); // Fix: Empty dependency array to prevent infinite loop

  // Protect the route and check for token on mount
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

  return (
    <div>
      <NavbarMain setSearch={setSearch} />
      <Menubar setMenu={setMenu} />
      <Home products={prod} search={search} menu={menu} />
      <Footer />
    </div>
  );
};

export default Main;
