import React , {useState } from 'react'
import logo from "../../assets/logo1.webp"
import arrow from "../../assets/arrow.webp"
import search_icon from "../../assets/search_icon.webp"
import Login from '../../Pages/Login/Login'
import { useNavigate } from 'react-router-dom'

const Navbar = (props) => {

    const [loginPop,setLoginPop] = useState(false)
    const navigate = useNavigate()

    const addProduct = () =>{
        navigate("/products")
    }

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
        <div onClick={()=>setLoginPop(true)} className='flex h-12 p-3 ml-6 cursor-pointer underline hover:no-underline'>
            <h1 className='font-bold text-lg'>Login</h1>
        </div>
        <div  onClick={()=>setLoginPop(true)} className='w-28 flex h-12 p-3 ml-6 cursor-pointer rounded-full border border-yellow-400'>
            <h1 className='font-bold text-lg ml-3'>+SELL</h1>
        </div>
        {loginPop && <Login setLoginPop={setLoginPop}/>}
    </div>
  )
}

export default Navbar
