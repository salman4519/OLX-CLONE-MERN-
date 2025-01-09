import React from 'react'

const Menubar = (props) => {
  return (
    <div className='flex shadow-sm h-10 p-2'>
      <h1 className='ml-48 cursor-pointer' onClick={()=>props?.setMenu("Shirt")}>Shirt</h1>
      <h1 className='ml-5 cursor-pointer' onClick={()=>props?.setMenu("Jacket")}>Jacket</h1>
      <h1 className='ml-5 cursor-pointer' onClick={()=>props?.setMenu("Phones")}>Mobile phones</h1>
      <h1 className='ml-5 cursor-pointer' onClick={()=>props?.setMenu("House")}>House</h1>
      <h1 className='ml-5 cursor-pointer' onClick={()=>props?.setMenu("Scooters")}>Scooters</h1>
      <h1 className='ml-5 cursor-pointer' onClick={()=>props?.setMenu("Bike")}>Bike</h1>
      <h1 className='ml-5 cursor-pointer' onClick={()=>props?.setMenu("")}>All</h1>
    </div>
  )
}

export default Menubar
