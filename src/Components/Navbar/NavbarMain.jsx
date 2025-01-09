import React , {useState } from 'react'
import logo from "../../assets/logo1.webp"
import arrow from "../../assets/arrow.webp"
import search_icon from "../../assets/search_icon.webp"
import Login from '../../Pages/Login/Login'
import { Link, useNavigate } from 'react-router-dom'
import { Logout } from '@mui/icons-material'

const Navbar = (props) => {

    const [loginPop,setLoginPop] = useState(false)
    const navigate = useNavigate()

    const addProduct = () =>{
        navigate("/products")
    }
    const logout = () => {
        // Remove the token from localStorage
        localStorage.removeItem('jwtToken');
      
        // Optionally, reset the user state if you're using Context, Redux, or state management
      
        // Redirect to login page
        navigate('/login');
      };

  return (
    <div className='flex w-full p-4 items-center justify-between shadow-md bg-slate-100'>
        <img src={logo} className='w-12 h-9 ml-2' />
        <div className="flex border-2 h-12 border-spacing-1 w-64 border-black ml-5 items-center bg-white">
            <img src={search_icon} className='w-6 h-5' />
            <input placeholder='Location ' className='ml-5 outline-none'/>
            <img src={arrow} className='w-8 h-7' />
        </div>
        <div className='flex h-12 ml-4 border-2 border-black items-center bg-white'>
            <input onChange={(e)=> props?.setSearch(e.target.value) } placeholder='Find Cars, Mobile phones and more' className='ml-3 w-96 outline-none'/>
            <img src={search_icon} className='w-7 h-6' />
        </div>
        <div className='flex h-12 p-3 ml-5 cursor-pointer'>
            <h1 className='font-semibold'>ENGLISH</h1>
            <img src={arrow} className='w-8 h-7' />
        </div>
        <div onClick={logout} className='flex h-12 p-3 ml-6 cursor-pointer underline hover:no-underline'>
            <h1 className='font-bold text-lg'>Logout</h1>
        </div>
        <div  className='w-28 flex h-12 p-3 ml-6 cursor-pointer rounded-full border border-yellow-400'>
            <h1 onClick={()=>addProduct()} className='font-bold text-lg ml-3'>+SELL</h1>
        </div>
        <Link to='/myproducts'><div  className='w-38 flex h-12 p-3 ml-3 cursor-pointer rounded-full border border-cyan-950'>
            <h1  className='font-bold text-lg ml-3'>My Products</h1>
        </div></Link>
        
    </div>
  )
}

export default Navbar
