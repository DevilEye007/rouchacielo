import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const Dashboard = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    enableDiscount: false,
    category: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData({
      ...productData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles[0]) {
      setImage(acceptedFiles[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", productData.name);
    data.append("description", productData.description);
    data.append("price", productData.price);
    if (productData.enableDiscount) {
      data.append("Discounted_price", productData.discount);
    }
    data.append("category", productData.category);
    data.append("ratings", productData.ratings);  // Add ratings to the FormData

    if (image) {
      data.append("picture", image);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/user/admin/products",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Product added successfully!");
      console.log(response.data);

      // Reset form after successful submission
      setProductData({
        name: "",
        description: "",
        price: "",
        discount: "",
        enableDiscount: false,
        category: "",
        ratings: "",
      });
      setImage(null);
    } catch (err) {
      setMessage("Error: " + err.response?.data?.error || err.message);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: "image/*",
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 p-8">
      <h1 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h1>
      {message && (
        <p className="text-center text-green-600 mb-4 font-medium">{message}</p>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-xl max-w-lg mx-auto space-y-4"
      >
        {/* Drag-and-Drop Area */}
        <div
          {...getRootProps()}
          className={`p-4 border-2 rounded-lg cursor-pointer text-center ${
            isDragActive
              ? "border-blue-500 bg-gray-100 dark:bg-gray-600"
              : "border-gray-300 dark:border-gray-500"
          }`}
        >
          <input {...getInputProps()} />
          {image ? (
            <div className="flex flex-col items-center">
              <p className="text-sm mb-2">{image.name}</p>
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded"
                className="h-32 w-32 object-cover rounded-md"
              />
            </div>
          ) : (
            <p>
              {isDragActive
                ? "Drop the image here..."
                : "Drag and drop an image, or click to select one"}
            </p>
          )}
        </div>

        {/* Product Name */}
        <div>
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="text-black w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Product Description */}
        <div>
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            rows="3"
            className="text-black w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Product Price */}
        <div>
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            placeholder="Enter product price"
            className="text-black w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold mb-2">Category</label>
          <select
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="text-black w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            <option value="Casual Wear">Casual Wear</option>
            <option value="Printed Shirt">Printed Shirt</option>
            <option value="Ladies Shirt">Ladies Shirt</option>
          </select>
        </div>
        <input
          type="number"
          name="ratings"
          placeholder="Ratings (0-5)"
          min="0"
          max="5"
          value={productData.ratings}
          onChange={handleChange}
          className="text-black block w-full border p-2 rounded"
        />
        {/* Enable Discount */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="enableDiscount"
            checked={productData.enableDiscount}
            onChange={handleChange}
            className="mr-2"
          />
          <label>Enable Discount</label>
        </div>

        {/* Discount */}
        {productData.enableDiscount && (
          <div>
            <label className="block font-semibold mb-2">Discounted_price</label>
            <input
              type="number"
              name="discount"
              value={productData.discount}
              onChange={handleChange}
              placeholder="Enter discount price"
              className="text-black w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Dashboard;

