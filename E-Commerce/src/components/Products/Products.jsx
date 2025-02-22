import React from "react";
import Img1 from "../../assets/Product/Tshirt.jpg";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "Product Name",
    rating: "4.5",
    color: "Blue",
    aosDelay: "0",
  },
  {
    id: 2,
    img: Img1,
    title: "Product Name",
    rating: "4.7",
    color: "Red",
    aosDelay: "200",
  },
  {
    id: 3,
    img: Img1,
    title: "Product Name",
    rating: "4.6",
    color: "Green",
    aosDelay: "400",
  },
  {
    id: 4,
    img: Img1,
    title: "Product Name",
    rating: "4.8",
    color: "Yellow",
    aosDelay: "600",
  },
];

const Products = () => {
  const navigate = useNavigate();

  // Navigate to detailed product page
  const handleProductClick = (id) => {
    navigate(`/ProductD/${id}`); // Assuming /product/:id is your product detail route
  };

  const handleViewAll = () => {
    navigate("/products");
  };

  return (
    <div className="mt-14 mb-12">
      <div className="container">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-primary">
            Top Selling Products for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Products
          </h1>
          {/* <p data-aos="fade-up" className="text-xs text-gray-400">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
            asperiores modi Sit asperiores modi
          </p> */}
        </div>
        {/* Body section */}
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-5">
            {/* card section */}
            {ProductsData.map((data) => (
              <div
                key={data.id}
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                className="space-y-3 cursor-pointer hover:shadow-md hover:scale-105 transition-transform duration-200"
                // onClick={() => handleProductClick(data.id)} // Click event for product card
                onClick={handleViewAll}
              >
                <img
                  src={data.img}
                  alt={data.title}
                  className="h-[220px] w-[150px] object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold">{data.title}</h3>
                  <p className="text-sm text-gray-600">{data.color}</p>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span>{data.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* view all button */}
          <div className="flex justify-center">
            <button
              onClick={handleViewAll}
              className="text-center mt-10 cursor-pointer bg-primary text-white py-1 px-5 rounded-md"
            >
              View All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
