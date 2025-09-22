import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative bg-black text-gray-400 py-12 mt-0 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Questions Section */}
        <div className="mb-8">
          <p className="text-gray-400 text-sm mb-6">
            Questions? Call{" "}
            <a 
              href="tel:+18001234567" 
              className="hover:underline transition-colors duration-200"
            >
              000-800-040-1843
            </a>
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-3 text-sm text-gray-400 mb-8">
          <a 
            href="#" 
            className="hover:underline transition-colors duration-200 hover:text-white"
          >
            FAQ
          </a>
          <a 
            href="#" 
            className="hover:underline transition-colors duration-200 hover:text-white"
          >
            Help Center
          </a>
          <a 
            href="#" 
            className="hover:underline transition-colors duration-200 hover:text-white"
          >
            Account
          </a>
          <a 
            href="#" 
            className="hover:underline transition-colors duration-200 hover:text-white"
          >
            Media Center
          </a>
          <a 
            href="#" 
            className="hover:underline transition-colors duration-200 hover:text-white"
          >
            Investor Relations
          </a>
          <a 
            href="#" 
            className="hover:underline transition-colors duration-200 hover:text-white"
          >
            Jobs
          </a>
          <a 
            href="#" 
            className="hover:underline transition-colors duration-200 hover:text-white"
          >
            Ways to Watch
          </a>
          <a 
            href="#" 
            className="hover:underline transition-colors duration-200 hover:text-white"
          >
            Terms of Use
          </a>
          <a 
            href="#" 
            className="hover:underline transition-colors duration-200 hover:text-white"
          >
            Privacy
          </a>
          <a 
            href="#" 
            className="hover:underline transition-colors duration-200 hover:text-white"
          >
            Cookie Preferences
          </a>
          <a 
            href="#" 
            className="hover:underline transition-colors duration-200 hover:text-white"
          >
            Corporate Information
          </a>
          <a 
            href="#" 
            className="hover:underline transition-colors duration-200 hover:text-white"
          >
            Contact Us
          </a>
          <a 
            href="#" 
            className="hover:underline transition-colors duration-200 hover:text-white"
          >
            Speed Test
          </a>
          <a 
            href="#" 
            className="hover:underline transition-colors duration-200 hover:text-white"
          >
            Legal Notices
          </a>
          <a 
            href="#" 
            className="hover:underline transition-colors duration-200 hover:text-white"
          >
            Only on Setflix
          </a>
          <a 
            href="#" 
            className="hover:underline transition-colors duration-200 hover:text-white"
          >
            Do Not Sell or Share My Personal Information
          </a>
        </div>

        {/* Language Selector */}
        <div className="mb-8">
          <select className="bg-transparent border border-gray-600 text-gray-400 text-sm px-4 py-2 rounded hover:border-white transition-colors duration-200">
            <option value="en" className="bg-gray-800 text-white">
              English
            </option>
            <option value="es" className="bg-gray-800 text-white">
              Español
            </option>
            <option value="fr" className="bg-gray-800 text-white">
              Français
            </option>
            <option value="de" className="bg-gray-800 text-white">
              Deutsch
            </option>
          </select>
        </div>

        {/* Social Icons */}
        <div className="flex justify-start items-center space-x-6 mb-8">
          <a 
            href="#" 
            className="text-gray-400 hover:text-white transition-colors duration-200 text-xl"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a 
            href="#" 
            className="text-gray-400 hover:text-white transition-colors duration-200 text-xl"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a 
            href="#" 
            className="text-gray-400 hover:text-white transition-colors duration-200 text-xl"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a 
            href="#" 
            className="text-gray-400 hover:text-white transition-colors duration-200 text-xl"
            aria-label="YouTube"
          >
            <FaYoutube />
          </a>
        </div>

        {/* Service Code */}
        <div className="mb-6">
          <p className="text-gray-500 text-xs">
            Service Code
          </p>
        </div>

        {/* Copyright */}
        <div className="text-gray-500 text-xs">
          © 1997-{new Date().getFullYear()} Setflix, Inc. All Rights Reserved.
        </div>

        {/* Additional Netflix-style text */}
        <div className="mt-4 text-gray-500 text-xs max-w-2xl">
          <p>
            Setflix India. This page contains mature content that may not be suitable for all audiences. 
            Viewer discretion advised.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;