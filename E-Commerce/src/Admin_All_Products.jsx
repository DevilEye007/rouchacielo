import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaTrash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Admin_All_Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://localhost:3000/user/getAllProducts");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (id) => {
    navigate(`/ProductD/${id}`);
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation(); // Prevent triggering the product click event

    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`http://localhost:3000/user/admin/products/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete product");

        alert("Product deleted successfully");
        setProducts(products.filter((product) => product._id !== id)); // Remove deleted product
      } catch (err) {
        alert("Error deleting product: " + err.message);
      }
    }
  };

  return (
    <div className="mt-10 mb-8 px-3 sm:px-5 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-6 max-w-[600px] mx-auto">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Products</h1>
          <p className="text-sm md:text-base text-gray-500">
            Browse our best-selling products, updated in real-time.
          </p>
        </div>

        {/* Loading & Error Messages */}
        {loading ? (
          <div className="text-center text-lg font-semibold">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">Error: {error}</div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key="products-list"
              className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4  gap-4 sm:gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {products.map((product) => (
                <motion.div
                  key={product._id}
                  onClick={() => handleProductClick(product._id)}
                  className="relative space-y-2 sm:space-y-3 cursor-pointer p-3 sm:p-4 bg-white dark:bg-gray-900 shadow-lg rounded-lg transition-all duration-300 hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Delete Button */}
                  <button
                    onClick={(e) => handleDelete(product._id, e)}
                    className="absolute top-0.5 right-0.5 sm:top-4 sm:right-3 bg-red-500 hover:bg-red-600 text-white p-1.5 sm:p-2 rounded-full transition-all duration-200"
                  >
                    <FaTrash className="text-base sm:text-lg" />
                  </button>

                  {/* Product Image */}
                  <img
                    src={`http://localhost:3000${product.picture}`}
                    alt={product.name}
                    className="h-[150px] sm:h-[180px] md:h-[220px] w-[150px] object-contain rounded-md"
                  />

                  {/* Product Details */}
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base">{product.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{product.category}</p>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400 text-sm sm:text-base" />
                      <span className="text-xs sm:text-sm">{product.ratings}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      {product.Discounted_price && product.Discounted_price < product.price ? (
                        <>
                          <p className="text-xs sm:text-sm font-semibold text-green-600">
                            {product.Discounted_price}rs
                          </p>
                          <p className="text-xs sm:text-sm text-gray-500 line-through">{product.price}rs</p>
                        </>
                      ) : (
                        <p className="text-xs sm:text-sm font-semibold">{product.price}rs</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Admin_All_Products;
