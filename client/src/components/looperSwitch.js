import React, { useState } from 'react';
import LooperFull from './looperFull'; // Adjust the path as necessary
import LooperLatest from './looperLatest'; // Adjust the path as necessary
import ImagesPreview from './imagesPreview'; // Adjust the path as necessary

function LooperSwitch() {
  const [displayMode, setDisplayMode] = useState('full');

  const handleDisplayModeChange = (mode) => {
    setDisplayMode(mode);
  };

  return (
    <div className="looper-switch">
      <div className='flex gap-4 mb-4'>
        <button 
          className="bg-gray-200 hover:bg-gray-300 transition rounded-xl px-3 py-2 w-full text-xs" 
          onClick={() => handleDisplayModeChange('full')}
        >
          FULL
        </button>
        <button 
          className="bg-gray-200 hover:bg-gray-300 transition rounded-xl px-3 py-2 w-full text-xs" 
          onClick={() => handleDisplayModeChange('latest')}
        >
          CURRENT
        </button>
        <button 
          className="bg-gray-200 hover:bg-gray-300 transition rounded-xl px-3 py-2 w-full text-xs"
          onClick={() => handleDisplayModeChange('image')}
        >
          IMAGE
        </button>
      </div>

      {displayMode === 'full' && <LooperFull />}
      {displayMode === 'latest' && <LooperLatest />}
      {displayMode === 'image' && <ImagesPreview />}
    </div>
  );
}

export default LooperSwitch;
