import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import useProductStore from "./product_data";
import useProductStore from "./product_data/product"; // ✅ FIXED import

import Header from "./Header";
import MobileMenu from "./Mobilemenu";
import HeroSection from "./Herosection";
import ProductGrid from "./ProductGrid";

const StyleHub = () => {
  const { products, fetchProducts, toggleWishlist, wishlist, setSelectedProduct } = useProductStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  const categories = ["All", "Men", "Women", "Kids", "Accessories"];

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const isInWishlist = (product) => wishlist.some((item) => item.id === product.id);
  const setSelectedProductAndNavigate = (product) => {
    setSelectedProduct(product);
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        wishlist={wishlist}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      {mobileMenuOpen && (
        <MobileMenu
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          wishlist={wishlist}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      )}
      <HeroSection />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <ProductGrid
          products={products}
          toggleWishlist={toggleWishlist}
          isInWishlist={isInWishlist}
          setSelectedProductAndNavigate={setSelectedProductAndNavigate}
        />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default StyleHub;
