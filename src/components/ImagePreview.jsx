import React, { useState, useEffect } from 'react'
import Loading from "./Loading";

const ImagePreview = (props) => {
  const [enhancedLoaded, setEnhancedLoaded] = useState(false);

  useEffect(() => {
    // Reset loaded state when a new enhanced image is provided
    setEnhancedLoaded(false);
  }, [props.enhanced]);

  return (
    <div className='mt-8 grid-cols-1 md:grid-cols-2 gap-6 w-full max-x-4xl'>
      {/* Original Image */}
      <div className='bg-white shadow-lg rounded-xl ovreflow-hidden mb-10'>
        <h2 className='flex text-xl font-semibold text-center bg-gray-800 text-white py-2'>
          Original Image
        </h2>

        {props.uploaded ? (
          <img src={props.uploaded} alt="" className='w-full h-full object-cover' />
        ) : (
          <div className='flex items-center justify-center h-80 bg-gray-200'>
            No Image Selected
          </div>
        )}
      </div>

      {/*EnhancerImage*/}
      <div className='bg-white shadow-lg rounded-xl ovreflow-hidden'>
        <h2 className='text-xl font-semibold text-center bg-blue-800 text-white py-2'>
          Enhanced Image
        </h2>
        {props.loading && !enhancedLoaded ? (
          <Loading />
        ) : props.enhanced ? (
          <img
            src={props.enhanced}
            alt="enhancedImage"
            className='w-full h-full object-cover'
            onLoad={() => setEnhancedLoaded(true)}
            style={{ display: enhancedLoaded ? 'block' : 'none' }}
          />
        ) : (
          <div className='flex items-center justify-center h-80 bg-gray-200'>
            No Enhanced Image
          </div>
        )}
        {/* Show image after loaded */}
        {props.enhanced && !enhancedLoaded && props.loading && (
          <div className='flex items-center justify-center h-80 bg-gray-200'>
            {/* Optionally, keep the loader here */}
          </div>
        )}
      </div>

    </div>
    
  )
}

export default ImagePreview
