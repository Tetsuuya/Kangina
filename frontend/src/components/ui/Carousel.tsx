import { useState, useEffect, useRef } from 'react';
import images from '../../utils/ImportedImages';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const timerRef = useRef(null);
  const slideContainerRef = useRef(null);
  const isTransitioning = useRef(false);

  
  useEffect(() => {
    const lastImage = images[images.length - 1];
    const firstImage = images[0];
    setSlides([lastImage, ...images, firstImage]);
    setCurrentIndex(1); 
  }, []);

  // Handle infinite loop transition
  useEffect(() => {
    if (!slideContainerRef.current) return;

    const handleTransitionEnd = () => {
      isTransitioning.current = false;
      
      if (currentIndex >= slides.length - 1) {
        slideContainerRef.current.style.transition = 'none';
        setCurrentIndex(1);
        setTimeout(() => {
          if (slideContainerRef.current) {
            slideContainerRef.current.style.transition = 'transform 700ms ease-in-out';
          }
        }, 10);
      }
      
      if (currentIndex <= 0) {
        slideContainerRef.current.style.transition = 'none';
        setCurrentIndex(slides.length - 2);
        setTimeout(() => {
          if (slideContainerRef.current) {
            slideContainerRef.current.style.transition = 'transform 700ms ease-in-out';
          }
        }, 10);
      }
    };

    const container = slideContainerRef.current;
    container.addEventListener('transitionend', handleTransitionEnd);
    
    return () => {
      container.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [currentIndex, slides.length]);

  // Auto-slide functionality
  useEffect(() => {
    if (slides.length > 0) {
      startAutoSlide();
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [slides.length]);

  const startAutoSlide = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      if (!isTransitioning.current) {
        isTransitioning.current = true;
        setCurrentIndex(prevIndex => prevIndex + 1);
      }
    }, 4000);
  };

  const stopAutoSlide = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // Actual index for indicator dots
  const getActualIndex = () => {
    if (currentIndex === 0) return images.length - 1;
    if (currentIndex === slides.length - 1) return 0;
    return currentIndex - 1;
  };

  // Indicator dot click handler
  const goToSlide = (index) => {
    if (!isTransitioning.current) {
      isTransitioning.current = true;
      setCurrentIndex(index + 1); 
      startAutoSlide();
    }
  };

  if (slides.length === 0) return <div className="w-full h-64 bg-gray-200 rounded-lg shadow-xl"></div>;

  return (
    <div 
      className="relative overflow-hidden w-full rounded-lg shadow-3xl"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      <div 
        ref={slideContainerRef}
        className="flex transition-transform duration-700 ease-in-out" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((img, index) => (
          <img key={index} src={img} alt={`Slide ${index}`} className="w-full flex-shrink-0" />
        ))}
      </div>

      {/* Indicator dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === getActualIndex() ? 'bg-white scale-125' : 'bg-gray-400 bg-opacity-60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;