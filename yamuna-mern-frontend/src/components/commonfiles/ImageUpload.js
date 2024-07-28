import React, { useState } from 'react';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission and image upload logic here
    console.log('Image uploaded:', selectedImage);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          {/* <label htmlFor="imageUpload" style={{ textAlign: 'left',marginBottom: 3 }}>Upload Image:</label> */}
          <input
          className='commontextinpustyle'
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        {preview && (
          <div>
            <img src={preview} alt="Preview" style={{ width: '200px', height: '200px' }} />
          </div>
        )}
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ImageUpload;
