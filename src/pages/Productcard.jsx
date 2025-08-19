import React, { useState } from "react";
import { HeartOutlined, HeartFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Badge, Button, Rate, Tag } from "antd";

const { Meta } = Card;

const ProductCard = ({ product, isWishlisted, onWishlistToggle }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      hoverable
      className="border-0 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800"
      cover={
        <div 
          className="relative overflow-hidden aspect-square group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
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

export default ProductCard;