import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

 function Carosuel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);

  // Sample cards - replace with your own content
  const cards = [
    {

      id: 1,
      name: 'kivilak',
      description: "My whole family goes to Bright Smile Dental. They're great with kids and adults alike. Highly recommend for anyone looking for quality dental care!",
      date: '2022/12/13',
      rating: 4.8,

    },
     {

      id: 1,
      name: 'Chaurangha',
      description: "My whole family goes to Bright Smile Dental. They're great with kids and adults alike. Highly recommend for anyone looking for quality dental care!",
      date: '2023/06/12',
      rating: 4.8,

    },
    {

      id: 1,
      name: 'Janith',
      description: "Outstanding service from start to finish. The office is modern and clean, and they really take the time to explain every step of the treatment.",
      date: '2019/12/18',
      rating: 4.8,



    }

  ];

  // Responsive cards per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, cards.length - cardsPerView);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex >= maxIndex ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, maxIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && canGoPrevious) goToPrevious();
      if (e.key === 'ArrowRight' && canGoNext) goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canGoPrevious, canGoNext]);

  return (
    <div className=" bg-green-600 flex items-center justify-center p-4 md:p-8 overflow-x-hidden">
      <div className="w-full max-w-7xl">
        <div className="mb-8 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-white mb-2">What Our Patients Say</h1>
          <p className="text-green-200 font-2xl">Real stories from our satisfied patients</p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Cards Wrapper */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)` 
              }}
            >
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="shrink-0"
                  style={{ width: `calc(${100 / cardsPerView}% - ${(cardsPerView - 1) * 24 / cardsPerView}px)` }}
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow group">
                    {/* Card Image
                    <div className={`${card.image} h-48 relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
                    </div> */}

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-white">{card.name}</h3>
                        <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm text-yellow-500 font-semibold">{card.date}</span>
                        </div>
                      </div>
                      <p className="text-cyan-800 mb-4">{card.description}</p>
                      <div className='flex flex-col'>
                        <h1>{card.name}</h1>
                        <h1 className='text-cyan-800'>{card.date}</h1>

                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            disabled={!canGoPrevious}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg transition-all ${
              !canGoPrevious ? 'opacity-40 cursor-not-allowed' : 'hover:scale-110'
            }`}
            aria-label="Previous cards"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>

          <button
            onClick={goToNext}
            disabled={!canGoNext}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg transition-all ${
              !canGoNext ? 'opacity-40 cursor-not-allowed' : 'hover:scale-110'
            }`}
            aria-label="Next cards"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="flex gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-green-500 w-8' 
                    : 'bg-gray-600 w-2 hover:bg-gray-500'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        
        </div>
      </div>
    </div>
  );
}

export default Carosuel;