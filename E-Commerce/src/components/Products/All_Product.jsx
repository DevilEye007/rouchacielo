import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

const All_Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortFilter, setSortFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      let url = "http://localhost:3000/user/getAllProducts";

      if (sortFilter) {
        switch (sortFilter) {
          case "newest":
            url = "http://localhost:3000/products/newest";
            break;
          case "oldest":
            url = "http://localhost:3000/products/oldest";
            break;
          case "price-high":
            url = "http://localhost:3000/products/price-high";
            break;
          case "price-low":
            url = "http://localhost:3000/products/price-low";
            break;
          case "all":
            url = "http://localhost:3000/user/getAllProducts";
            break;
        }
      }

      if (categoryFilter) {
        url = `http://localhost:3000/user/getAllProducts?category=${encodeURIComponent(categoryFilter)}`;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sortFilter, categoryFilter]);

  const handleProductClick = (id) => {
    navigate(`/ProductD/${id}`);
  };

  return (
    <div className="mt-14 mb-12 px-4 sm:px-6 lg:px-8">
      <div className="container">
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p className="text-sm text-primary">Top Selling Products for you</p>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-xs text-gray-400">Discover our best-selling products.</p>
        </div>

        {/* Filters */}
        {/* Filters Section */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6 rounded-lg border p-4 bg-gray-200 dark:bg-gray-800 dark:border-gray-700 transition-all duration-300">
          
          {/* Sort By Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">
              Filter by Sort ▾
            </label>
            <select
              value={sortFilter}
              onChange={(e) => setSortFilter(e.target.value)}
              className="font-bold px-4 py-2 rounded-md border bg-white dark:bg-gray-700 dark:text-white w-full sm:w-auto focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 transition-all duration-300"
            >
              <option value="all">All</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">
              Filter by Category ▾
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="font-bold px-4 py-2 rounded-md border bg-white dark:bg-gray-700 dark:text-white w-full sm:w-auto focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 transition-all duration-300"
            >
              <option value="all">All</option>
              <option value="Casual Wear">Casual Wear</option>
              <option value="Printed Shirt">Printed Shirt</option>
              <option value="Ladies Shirt">Ladies Shirt</option>
            </select>
          </div>
        </div>

        {/* Loading & Error Messages */}
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">Error: {error}</div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${sortFilter}-${categoryFilter}`}
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10">
                {products.map((product) => (
                  <motion.div
                    key={product._id}
                    onClick={() => handleProductClick(product._id)}
                    className="space-y-3 cursor-pointer p-4 bg-white dark:bg-gray-900 shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    layout
                  >
                    <img
                      src={`http://localhost:3000${product.picture}`}
                      alt={product.name}
                      className="h-[200px] sm:h-[250px] w-[150px] object-cover rounded-md"
                    />
                    <div className="text-center">
                      <h3 className="font-semibold text-sm sm:text-base">{product.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{product.category}</p>
                      <div className="flex items-center justify-center gap-1 text-xs sm:text-sm">
                        <FaStar className="text-yellow-400" />
                        <span>{product.ratings}</span>
                      </div>
                      <div className="flex justify-center gap-2 text-xs sm:text-sm">
                        {product.Discounted_price && product.Discounted_price < product.price ? (
                          <>
                            <p className="font-bold text-green-500">{product.Discounted_price}rs</p>
                            <p className="text-red-500 line-through">{product.price}rs</p>
                          </>
                        ) : (
                          <p className="font-bold">{product.price}rs</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default All_Products;
