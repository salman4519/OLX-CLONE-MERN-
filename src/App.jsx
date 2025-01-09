import React, { useState } from 'react'
import MainPart from './Components/MainPart'
import Details from './Components/Details'
import { Routes,Route } from 'react-router-dom'
import SellForm from './Components/SellForm'
import { ToastContainer, toast } from 'react-toastify';
import SignIn from './Components/SignIn'
import SignUp from './Components/SignUp'
import MyProducts from './Components/MyProducts'
import LandingPage from './Components/LandingPage'

const App = () => {
  const [user, setUser] = useState(null);
  return (
   <>
   <ToastContainer/>
   <Routes>
    <Route path='/' element={<LandingPage/>}/>
    <Route path='/home' element={<MainPart/>}/>
    <Route path='/details' element={<Details/>}/>
    <Route path='/products' element={<SellForm/>}/>
    <Route path='/login' element={<SignIn setUser={setUser}/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/myproducts' element={<MyProducts/>}/>
   </Routes>
   </>
  )
}

export default App
