import React, { useCallback, useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
const carouselImages = [{
  url: './img/volcan-turrialba.png',
  alt: 'Imagen panorámica del volcán turrialba.',
  caption: 'Explora la belleza natural de Turrialba'
}, {
  url: './img/plantacion-cafe.png',
  alt: 'Foto de plantaciones de café desde en enfoque superior.',
  caption: 'Descubre la producción local de café'
}, {
  url: './img/artesania-turrialba.png',
  alt: 'Señoras turrilbeñas fabricando productos artesanales.',
  caption: 'Experimenta la artesanía local'
}];
export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % carouselImages.length);
  }, []);
  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + carouselImages.length) % carouselImages.length);
  };
const scrollToElement = (elementId: string) => {
  const target = document.getElementById(elementId);
  if (!target) return;

  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 800; // milisegundos
  let startTime: number | null = null;

  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function easeInOutQuad(t: number, b: number, c: number, d: number) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
};


  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);
  return <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      {/* Carousel */}
      <div className="relative h-full">
        {carouselImages.map((image, index) => <div key={index} className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
            <img src={image.url} alt={image.alt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>)}
        {/* Caption */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Emprendedores de Turrialba & Jiménez
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl">
            {carouselImages[currentSlide].caption}
          </p>
          <div className="flex space-x-4">
            <Link to="/register" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Registrar Negocio
            </Link>
<a
  href="#emprendimientos"
  onClick={(e) => {
    e.preventDefault();
    scrollToElement('emprendimientos');
  }}
  className="bg-white hover:bg-gray-100 text-green-800 font-bold py-3 px-6 rounded-lg transition-colors"
>
  Explorar Directorio
</a>



          </div>
        </div>
        {/* Navigation Arrows */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full focus:outline-none" aria-label="Previous slide">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full focus:outline-none" aria-label="Next slide">
          <ChevronRightIcon className="w-6 h-6" />
        </button>
        {/* Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {carouselImages.map((_, index) => <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'}`} aria-label={`Go to slide ${index + 1}`}></button>)}
        </div>
      </div>
    </section>;
}