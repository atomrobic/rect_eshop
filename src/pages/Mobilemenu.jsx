import { ShoppingBag } from "lucide-react";

const MobileMenu = ({ categories, activeCategory, setActiveCategory, wishlist, setMobileMenuOpen }) => {
  return (
    <div className="mobile-menu-container md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t z-50">
      <div className="px-4 py-4 space-y-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setMobileMenuOpen(false);
            }}
            className={`block w-full text-left px-4 py-3 rounded-lg ${
              activeCategory === cat
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            {cat}
          </button>
        ))}
        <div className="pt-4 border-t flex justify-between items-center">
          <button className="flex items-center text-gray-600">
            <ShoppingBag className="w-5 h-5 mr-2" /> Cart ({wishlist.length})
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
