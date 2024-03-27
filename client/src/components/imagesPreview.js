import React, { useState, useEffect } from 'react';

function ImagesPreview() {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetch('http://localhost:4000/list-static-images')
      .then(response => response.json())
      .then(data => {
        setImages(data);
        setCurrentImageIndex(0); // Reset to the first image on receiving new data
      })
      .catch(error => console.error('Error fetching images:', error));
  }, []);

  const handleImageClick = () => {
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length); // Move to next image and loop
  };

  return (
    <div className="images-preview cursor-pointer" onClick={handleImageClick}>
      {images.length > 0 && (
        <>
          <img
          className=' rounded-xl'
            src={`/images/${images[currentImageIndex]}`}
            alt="Slideshow"
            style={{ maxWidth: '100%', maxHeight: '90vh' }}
          />
          <div className="text-xs text-gray-500 mt-1 mb-1">Path:{`/images/${images[currentImageIndex]}`}</div>
        </>
      )}
    </div>
  );
}

export default ImagesPreview;
