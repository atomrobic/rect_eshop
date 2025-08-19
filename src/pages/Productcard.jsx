import React, { useState, useEffect } from "react";
import { HeartOutlined, HeartFilled, ShoppingCartOutlined, PauseOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Card, Badge, Button, Rate, Tag } from "antd";

const { Meta } = Card;

const ProductCard = ({ product, isWishlisted, onWishlistToggle }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [showControls, setShowControls] = useState(false);

  // Handle auto-scroll
  useEffect(() => {
    let interval;
    if (isAutoScrolling) {
      interval = setInterval(() => {
        setImageIndex((prev) => (prev + 1) % product.image.length);
      }, 2000); // Change image every 2 seconds
    }
    return () => clearInterval(interval);
  }, [isAutoScrolling, product.image.length]);

  const handleCardClick = () => {
    setIsAutoScrolling(!isAutoScrolling);
    setShowControls(true);
  };

  const handleManualChange = (direction) => {
    setImageIndex(prev => {
      if (direction === 'next') {
        return (prev + 1) % product.image.length;
      } else {
        return (prev - 1 + product.image.length) % product.image.length;
      }
    });
    // Reset the auto-scroll timer when manually changing
    if (isAutoScrolling) {
      setIsAutoScrolling(false);
      setTimeout(() => setIsAutoScrolling(true), 1000);
    }
  };

  return (
    <Card
      hoverable
      className="border-0 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 relative"
      cover={
        <div 
          className="relative overflow-hidden aspect-square group cursor-pointer"
          onClick={handleCardClick}
          onMouseEnter={() => {
            setIsHovered(true);
            setShowControls(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            if (!isAutoScrolling) setShowControls(false);
          }}
        >
          {/* Main Image */}
          <img
            src={product.image[imageIndex]}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? 'scale-105' : ''}`}
          />
          
          {/* Badge */}
          {product.badge && (
            <Tag 
              color={
                product.badge === "Sale" ? "red" : 
                product.badge === "New" ? "blue" : 
                product.badge === "Bestseller" ? "gold" : "purple"
              }
              className="absolute top-3 left-3 z-10 border-0 font-semibold px-3 py-1 rounded-full shadow-lg"
            >
              {product.badge}
            </Tag>
          )}
          
          {/* Quick Actions Overlay */}
          <div className={`absolute inset-0 bg-black/30 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`}>
            <Button 
              shape="circle" 
              size="large"
              className="bg-white/90 hover:bg-white transition-all"
              icon={<ShoppingCartOutlined className="text-gray-800" />}
              onClick={(e) => {
                e.stopPropagation();
                // Add to cart logic here
              }}
            />
            <Button 
              shape="circle" 
              size="large"
              className="bg-white/90 hover:bg-white transition-all"
              icon={
                isWishlisted ? 
                <HeartFilled className="text-red-500" /> : 
                <HeartOutlined className="text-gray-800" />
              }
              onClick={(e) => {
                e.stopPropagation();
                onWishlistToggle(product);
              }}
            />
          </div>

          {/* Image Navigation Controls */}
          {(showControls || isAutoScrolling) && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-4 z-20">
              <Button 
                shape="circle" 
                size="small"
                className="bg-black/50 text-white border-0 hover:bg-black/70"
                icon={<CaretLeftOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleManualChange('prev');
                }}
              />
              
              <Button 
                shape="circle" 
                size="small"
                className="bg-black/50 text-white border-0 hover:bg-black/70"
                icon={isAutoScrolling ? <PauseOutlined /> : <CaretRightOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAutoScrolling(!isAutoScrolling);
                }}
              />
              
              <Button 
                shape="circle" 
                size="small"
                className="bg-black/50 text-white border-0 hover:bg-black/70"
                icon={<CaretRightOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleManualChange('next');
                }}
              />
            </div>
          )}

          {/* Image Indicator Dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1 z-10">
            {product.image.map((_, index) => (
              <div 
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setImageIndex(index);
                }}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all ${index === imageIndex ? 'bg-yellow-400 w-4' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </div>
      }
      bodyStyle={{ padding: '16px' }}
    >
      <Meta
        title={
          <div className="flex justify-between items-start">
            <span className="text-white font-medium text-lg">{product.name}</span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-sm">
                ${product.originalPrice}
              </span>
            )}
          </div>
        }
        description={
          <div className="mt-2">
            <div className="flex justify-between items-center">
              <span className="text-yellow-400 text-xl font-bold">
                ${product.price}
              </span>
              
              <div className="flex items-center">
                <Rate 
                  disabled 
                  allowHalf 
                  defaultValue={product.rating} 
                  className="text-xs" 
                  character={<StarFilled className="text-yellow-400" />}
                />
                <span className="text-gray-400 text-xs ml-1">
                  ({product.reviews})
                </span>
              </div>
            </div>
            
            {product.colors && (
              <div className="mt-3 flex gap-2">
                {product.colors.map((color, index) => (
                  <div 
                    key={index}
                    className="w-4 h-4 rounded-full border border-gray-600"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            )}
            
            <Button 
              type="primary" 
              block 
              className="mt-4 bg-gradient-to-r from-yellow-500 to-yellow-600 border-0 font-medium h-10 hover:from-yellow-600 hover:to-yellow-700 transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              Add to Cart
            </Button>
          </div>
        }
      />
    </Card>
  );
};

const StarFilled = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    width="1em" 
    height="1em" 
    fill="currentColor"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const CaretLeftOutlined = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    width="1em" 
    height="1em" 
    fill="currentColor"
  >
    <path d="M14.71 6.71a.996.996 0 0 0-1.41 0L8.71 11.3a.996.996 0 0 0 0 1.41l4.59 4.59a.996.996 0 1 0 1.41-1.41L10.83 12l3.88-3.88c.39-.39.38-1.03 0-1.41z" />
  </svg>
);

export default ProductCard;