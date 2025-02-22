import React from "react";
import { Link } from "react-router-dom";
import footerLogo from "../../assets/logo.png";
import Banner from "../../assets/website/Footer.png";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

const FooterLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Product",
    link: "/products",
  },
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Contact",
    link: "/contact",
  },
];

const Footer = () => {
  return (
    <div style={BannerImg} className="text-white dark:text-gray-200">
      <div className="container">
        <div data-aos="zoom-in" className="grid md:grid-cols-3 pb-44 pt-5">
          {/* Company details */}
          <div className="py-8 px-4">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
              <img src={footerLogo} alt="Logo" className="max-w-[70px]" />
              Roucha Cielo
            </h1>
            <p>
              Roucha Cielo the latest T-shirt trends with unbeatable quality and
              prices. Fast shipping, secure payments, and excellent customer
              service.
            </p>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
            <div>
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                  Web Links
                </h1>
                <ul className="flex flex-col gap-3">
                  {FooterLinks.map((link) => (
                    <li
                      className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200 dark:text-gray-400"
                      key={link.title}
                    >
                      <Link to={link.link}>{link.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Social links */}
            <div>
              <div className="flex items-center gap-3 mt-6">
                <a href="https://www.instagram.com/rouchacielo?utm_source=qr&igsh=anpsNXNwaGxqemNx" target="_blank" className="social-link hover:text-[#e1306c] transition-all duration-300 ease-in-out">
                  <FaInstagram className="text-3xl" />
                </a>
                <a href="https://www.facebook.com/share/15jJiVkBnS/" target="_blank" className="social-link hover:text-[#1877f2] transition-all duration-300 ease-in-out">
                  <FaFacebook className="text-3xl" />
                </a>
                <a href="https://wa.me/+923702732629" target="_blank" className="social-link hover:text-[#25d366] transition-all duration-300 ease-in-out">
                  <FaWhatsapp className="text-3xl" />
                </a>
                <a href="https://www.tiktok.com/@roucha.cielo?_t=ZS-8u3Lo7NkVpU&_r=1" target="_blank" className="social-link hover:text-gray-700 transition-all duration-300 ease-in-out">
                  <FaTiktok className="text-3xl" />
                </a>
              </div>
              <div className="mt-6">
                <div className="flex font-bold items-center gap-3">
                  <FaLocationArrow />
                  <p>Jacobabad, Sindh</p>
                </div>
                <div className="flex font-bold items-center gap-3 mt-3">
                  <FaMobileAlt />
                  <p>+92 370 2732629</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright bar */}
      <div className="bg-white text-center py-3 mt-10 dark:bg-gray-900 dark:text-gray-400">
        <p className="text-gray-400">
          ©2025 Roucha Cielo. Designed by <span className="font-semibold">Faizan Sultan</span>. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
