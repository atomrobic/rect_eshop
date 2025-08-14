// src/pages/ProductGrid.jsx
import React, { useEffect } from "react";
import ProductCard from "./Productcard";
import useProductStore from "./product_data/product";

const ProductGrid = () => {
  const {
    products,
    fetchProducts,
    toggleWishlist,
    wishlist,
    setSelectedProduct,
  } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const isInWishlist = (product) =>
    wishlist.some((item) => item.id === product.id);

  const setSelectedProductAndNavigate = (product) => {
    setSelectedProduct(product);
    // navigation to details page (if using react-router)
    // navigate(`/products/${product.id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((item) => (
        <ProductCard
          key={item.id}
          item={item}
          toggleWishlist={toggleWishlist}
          isInWishlist={isInWishlist}
          setSelectedProductAndNavigate={setSelectedProductAndNavigate}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
