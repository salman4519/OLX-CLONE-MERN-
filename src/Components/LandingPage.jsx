import React, { useEffect, useState } from 'react'
import Navbar from "./Navbar/Navbar"
import Menubar from './menubar'
import Home from "../Pages/Home/Home"
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {

  const [prod,setProd] = useState([])
  const [search,setSearch] = useState("")
  const [menu,setMenu] = useState("")
  const navigate = useNavigate()


   useEffect(() => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        navigate('/home'); // Redirect to home if a token exists
      }
    }, [navigate]);

  return (
    <div>
      <Navbar setSearch={setSearch}/>
      <Menubar setMenu={setMenu}/>
      <Home products={prod} search={search} menu={menu}/>
      <Footer/>
    </div>
  )
}

export default LandingPage;
