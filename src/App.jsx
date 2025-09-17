import React from 'react'
import Home from "./components/Home.jsx";
import './App.css'
const App = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='text-center mb-8'>
        <h1 className='text-5xl font-bold text-gray-800 mb-8'> AI Image Enhancer</h1>
        <p className='text-lg-text-gray-500'>
          Upload your Image and let AI enhance your Image</p>
      </div>
     <Home/>
     <div className='text-lg text-gray-500 mt-6'>
      <p> Powered by DevBee</p>
     </div>
    </div>
  )
}

export default App
