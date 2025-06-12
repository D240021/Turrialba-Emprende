import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
export function ImageGallery({
  images
}) {
  const [currentImage, setCurrentImage] = useState(0);
  const nextImage = () => {
    setCurrentImage(prev => (prev + 1) % images.length);
  };
  const prevImage = () => {
    setCurrentImage(prev => (prev - 1 + images.length) % images.length);
  };
  return <div className="relative w-full h-full">
      {/* Main Image */}
      <div className="relative w-full h-96 overflow-hidden">
        {images.map((image, index) => <img key={index} src={image} alt={`Gallery image ${index + 1}`} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${index === currentImage ? 'opacity-100' : 'opacity-0'}`} />)}
        {/* Navigation Arrows */}
        {images.length > 1 && <>
            <button onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full focus:outline-none" aria-label="Previous image">
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full focus:outline-none" aria-label="Next image">
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </>}
        {/* Image Counter */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          {currentImage + 1} / {images.length}
        </div>
      </div>
      {/* Thumbnails */}
      {images.length > 1 && <div className="flex space-x-2 mt-2 overflow-x-auto">
          {images.map((image, index) => <button key={index} onClick={() => setCurrentImage(index)} className={`flex-shrink-0 w-16 h-16 focus:outline-none ${index === currentImage ? 'ring-2 ring-green-500' : ''}`} aria-label={`View image ${index + 1}`}>
              <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
            </button>)}
        </div>}
    </div>;
}