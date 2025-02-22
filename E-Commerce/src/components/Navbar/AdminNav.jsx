import React, { useState, useEffect } from "react";
import DarkLogo from "../../assets/Logo.png";
import LightLogo from "../../assets/Dark_Logo.png";
import { Link } from "react-router-dom";


const AdminNav = ({ handleOrderPopup }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      {/* Upper Navbar */}
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-center items-center">
          {/* Logo */}
          <div className="flex gap-2 items-center justify-center">
            <img
              src={theme === "dark" ? DarkLogo : LightLogo}
              alt="Logo"
              className="w-20"
            />
            <a href="#" className="font-bold text-2xl sm:text-3xl">
              Roucha Cielo
            </a>
          </div>

          {/* Search Bar and Buttons */}
          <div className="flex justify-between items-center gap-4 ml-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
