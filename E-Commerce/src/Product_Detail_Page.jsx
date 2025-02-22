import React from "react";
import Ab from "./components/Product Detail/ProductDetail";
import TopProduct from "./components/TopProducts/TopProducts"
import AOS from "aos";
import "aos/dist/aos.css";
import Popup from "./components/Popup/Popup";
import Footer from "./components/Footer/Footer";

const Product_Detail_Page = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      <Ab handleOrderPopup={handleOrderPopup} />
      <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
    </div>
  );
};

export default Product_Detail_Page;
