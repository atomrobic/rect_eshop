import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Share2, Star, ChevronLeft, ChevronRight } from "lucide-react";
import WhatsAppButton from "./product_data/whatsapp";

const ProductCard = ({ item, toggleWishlist, isInWishlist }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef(null);
  const navigate = useNavigate(); // react-router navigation

  // Auto-slide images when hovering
  useEffect(() => {
    if (isHovering && item.image.length > 1) {
      startAutoSlide();
    } else {
      stopAutoSlide();
    }
    return () => stopAutoSlide();
  }, [isHovering, item.image.length]);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % item.image.length);
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + item.image.length) % item.image.length);
    startAutoSlide();
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % item.image.length);
    startAutoSlide();
  };

  const handleIndicatorClick = (index) => {
    setCurrentImageIndex(index);
    startAutoSlide();
  };

  // Navigate to product details page
const goToDetails = () => {
  navigate(`/product/${item.id}`);
};


  return (
    <div
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all relative cursor-pointer"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={goToDetails} // navigate on card click
    >
      {/* Wishlist */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(item);
        }}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full ${
          isInWishlist(item)
            ? "bg-red-500 text-white scale-110"
            : "bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500"
        } transition-all`}
      >
        <Heart className={`w-5 h-5 ${isInWishlist(item) ? "fill-current" : ""}`} />
      </button>

      {/* Image carousel */}
      <div className="relative aspect-square overflow-hidden">
        {item.image.map((img, i) => (
          <img
            key={i}
            src={img}   // Use the Cloudinary URL directly
            alt={item.name}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              i === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Navigation Arrows */}
        {item.image.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image indicators */}
        {item.image.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {item.image.map((_, i) => (
              <div
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  handleIndicatorClick(i);
                }}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  i === currentImageIndex ? "bg-white w-4" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

        {/* Quick view & share */}
        <div className="absolute bottom-3 left-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all">
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToDetails();
            }}
            className="flex-1 bg-white/90 py-2 px-3 rounded-lg text-sm font-medium hover:bg-white transition-colors"
          >
            Quick View
          </button>
          <button
            className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product info */}
      <div className="p-4">
        <div className="flex items-center mb-2 text-yellow-400">
          <Star className="w-4 h-4 fill-current" />
          <span className="ml-1 text-gray-600">{item.rating}</span>
        </div>
        <h3 className="font-semibold text-gray-900 line-clamp-1">{item.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold">${item.price}</span>
          <WhatsAppButton product={item} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
