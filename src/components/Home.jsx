import React, { useState } from 'react'
import ImageUpload  from "./ImageUpload";
import ImagePreview from "./ImagePreview";
import { enhancedImageapi } from '../utils/enhancedImage';

const Home = () => {

  const [ uploadImage, setUploadImage] = useState(null)
  const [ enhancedImage, setEnhancedImage] = useState(null)
  const [ loading, setloading] = useState(false);

  const UploadImageHandler = async(file) => {
    setUploadImage(URL.createObjectURL(file));
    setloading(true);
    
    try {
      const enhancedURL =await enhancedImageapi(file);
      setEnhancedImage(enhancedURL);
      setloading(false);
      
    } catch (error) {
      console.log(error);
      alert("Error while enhancing the image.Please try again later.") 
    }
  }
  return (
    <div>
      
    <ImageUpload
    UploadImageHandler ={ UploadImageHandler} />
    <ImagePreview 
        loading= {loading} 
        uploaded = { uploadImage}
        enhanced = {enhancedImage}
    />
    
    
    </div>
  )
}

export default Home
