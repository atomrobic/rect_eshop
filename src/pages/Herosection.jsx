import React, { useState, useEffect } from "react";

const images = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&h=900&fit=crop",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600&h=900&fit=crop",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1600&h=900&fit=crop",
];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative text-white overflow-hidden h-[400px] md:h-[500px]">
      {/* Carousel Background */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
            index === currentImage ? "opacity-30" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* Overlay for darker effect */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col justify-center items-center h-full text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent animate-in fade-in duration-1000">
          Luxury Redefined
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-in fade-in duration-1000 delay-200">
          Discover premium products crafted for the extraordinary
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in duration-1000 delay-400">
          <button className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-400/25">
            Shop Collection
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300">
            Explore Categories
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
