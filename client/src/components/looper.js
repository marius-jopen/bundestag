import React, { useState, useEffect } from 'react';

function BundestagLooper() {
  const [images, setImages] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayMode, setDisplayMode] = useState('full'); // 'full' or 'current'

  const fetchImages = async () => {
    try {
      const response = await fetch('http://localhost:4000/list-bundestag-images');
      const imageData = await response.json();
      setImages(imageData);

      // Determine the latest folder
      const latestFolderName = imageData.reduce((acc, path) => {
        const folderName = path.split('/')[0];
        return acc.localeCompare(folderName) > 0 ? acc : folderName;
      }, '');

      const latestImages = imageData.filter(path => path.startsWith(latestFolderName));
      setCurrentImages(latestImages);
    } catch (error) {
      console.error("Failed to load images", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    let activeImages = displayMode === 'full' ? images : currentImages;
    
    // If there's only one image, ensure it's set to animate by treating it as multiple
    if (activeImages.length <= 1) {
      activeImages = [...activeImages, ...activeImages]; // Duplicate the single image for animation
    }

    const updateImage = () => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % activeImages.length);
    };

    const loopInterval = setInterval(updateImage, 1000 / 15);
    
    // Cleanup on dismount or mode change
    return () => clearInterval(loopInterval);
  }, [displayMode, images, currentImages, currentIndex]);

  const handleDisplayModeChange = (mode) => {
    setDisplayMode(mode);
    setCurrentIndex(0); // Reset index to ensure it starts from the first image in the new mode
  };

  const displayedImages = displayMode === 'full' ? images : currentImages;
  const currentImageUrl = displayedImages[currentIndex % displayedImages.length];
  const imageUrl = currentImageUrl ? `http://localhost:4000/images/${encodeURIComponent(currentImageUrl)}` : '';

  return (
    <div className="bundestag-looper">
      <div className='flex gap-4 mb-4'>
        <button className="bg-gray-200 hover:bg-gray-300 transition rounded-xl px-3 py-2 w-full text-xs" onClick={() => handleDisplayModeChange('full')}>FULL</button>
        <button className="bg-gray-200 hover:bg-gray-300 transition rounded-xl px-3 py-2 w-full text-xs" onClick={() => handleDisplayModeChange('current')}>CURRENT</button>
      </div>
      {currentImageUrl ? (
        <>
          <img className='rounded-xl' src={imageUrl} alt="Bundestag Gallery" />
          <div className="text-xs text-gray-500 mt-1 mb-1">Path: {currentImageUrl}</div>
        </>
      ) : (
        <div>No images found</div>
        )}
    </div>
  );
}

export default BundestagLooper;
