import React, { useState } from "react";
import { FaLocationArrow, FaUserTie, FaCode } from "react-icons/fa";
import emailjs from "@emailjs/browser"; // Import EmailJS

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_o8c3xn6", // Replace with your EmailJS Service ID
        "template_qt1slwx", // Replace with your EmailJS Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "Lvg2aCFJfEAExM5kw" // Replace with your EmailJS Public Key
      )
      .then(() => {
        alert("🎉 Thank you for reaching out! Your message has been sent, and we'll respond as soon as possible.");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("Failed to send email. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={`${isDarkMode ? "dark" : ""} min-h-screen`}>
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all">
        <div className="container mx-auto py-8">

          {/* Contact Form */}
          <div className="w-full md:w-1/2 mx-auto mb-10">
            <div className="text-center mb-10 max-w-[600px] mx-auto">
              <h1 className="text-3xl font-bold">Contact Us</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Have questions or need help? Fill out the form below and we'll get back to you.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="max-w-[600px] mx-auto bg-white dark:bg-gray-800 p-6 shadow-md rounded-lg space-y-5"
            >
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows="4"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-2 text-white bg-blue-500 dark:bg-blue-700 rounded-md hover:bg-blue-600 dark:hover:bg-blue-800 transition"
                disabled={loading}
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>

          {/* Contact Info Section */}
          <div className="w-full md:w-1/2 mx-auto bg-white dark:bg-gray-800 p-6 shadow-md rounded-lg space-y-5">
            <div className="flex items-center space-x-3">
              <FaLocationArrow className="text-blue-500 dark:text-blue-400 text-2xl" />
              <span className="text-xl font-bold">Jacobabad, Sindh</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaUserTie className="text-blue-500 dark:text-blue-400 text-2xl" />
              <span className="text-lg font-bold">Jawad Ali</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaCode className="text-blue-500 dark:text-blue-400 text-2xl" />
              <span className="text-lg font-bold">Faizan Sultan</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactForm;
