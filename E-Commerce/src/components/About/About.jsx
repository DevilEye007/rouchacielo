import React, { useState } from "react";

const About = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`${isDarkMode ? "dark" : ""} min-h-screen`}>
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all">
        <div className="container mx-auto py-12 px-6">

          {/* About Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold" data-aos="fade-up">
              About Us
            </h1>
            <p
              className="text-sm text-gray-500 font-bold dark:text-gray-400 mt-2"
              data-aos="fade-up"
            >
              Learn more about who we are and what we do.
            </p>
          </div>

          {/* Content Section */}
          <div
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl space-y-6 max-w-3xl mx-auto"
            data-aos="fade-up"
          >
            <h2 className="text-2xl font-semibold">
              Our Mission
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              At <span className="font-bold text-red dark:text-red">Our Company</span>, 
              our mission is to provide exceptional products and services that make a positive impact 
              on the lives of our customers. We strive to innovate, inspire, and lead the industry with 
              our commitment to quality and excellence.
            </p>

            <h2 className="text-2xl font-semibold">
              Our Vision
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              We envision a world where technology seamlessly integrates into 
              daily life, enhancing productivity and creating meaningful connections. 
              Our goal is to drive this transformation by delivering cutting-edge 
              solutions and creating memorable experiences for our users.
            </p>

            <h2 className="text-2xl font-semibold">
              Why Choose Us?
            </h2>
            <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>Commitment to Quality</li>
              <li>Innovative and Customer-Centric Approach</li>
              <li>Dedicated Support Team</li>
              <li>Proven Track Record of Success</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
