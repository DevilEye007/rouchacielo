import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [checkoutItem, setCheckoutItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedItem = JSON.parse(localStorage.getItem("checkoutItem"));
      console.log("Stored item:", storedItem); // Debugging line
      if (storedItem) {
        setCheckoutItem(storedItem);
      }
    } catch (error) {
      console.error("Failed to parse checkout item", error);
    }
  }, []);

  const handlePayment = () => {
    alert("Proceeding to Payment...");
    localStorage.removeItem("checkoutItem"); // Clear after checkout
    navigate("/"); // Redirect to homepage
  };

  if (checkoutItem === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!checkoutItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No item selected.
      </div>
    );
  }

  const fallbackImage = checkoutItem?.image || "https://via.placeholder.com/150";
  const itemName = checkoutItem?.name || "Unnamed Item";
  const itemPrice = checkoutItem?.price || "0";
  const itemQuantity = checkoutItem?.quantity || "1";

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto">
          <img
            src={fallbackImage}
            alt={itemName}
            className="w-32 h-32 mx-auto"
          />
          <h2 className="text-xl font-semibold mt-3 text-center">{itemName}</h2>
          <p className="text-lg text-center">
            Price: <span className="font-bold">{itemPrice} RS</span>
          </p>
          <p className="text-lg text-center">
            Quantity: <span className="font-bold">{itemQuantity}</span>
          </p>
          <div className="mt-6">
            <button
              onClick={handlePayment}
              className="w-full bg-blue-500 text-white py-3 rounded-md"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
