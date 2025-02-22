import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 sm:p-8 text-center max-w-sm sm:max-w-md w-full">
        <CheckCircle className="text-green-500 w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4" />
        <h1 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          Order Placed Successfully!
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6">
          Thank you for your purchase. Your order is being processed and will be shipped shortly.
        </p>

        {/* Continue Shopping Button - Mobile Responsive */}
        <button
          onClick={() => navigate("/products")}
          className="w-full py-2 sm:py-3 rounded-xl text-white bg-green-500 hover:bg-green-600 transition dark:bg-green-600 dark:hover:bg-green-700 text-sm sm:text-base"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
