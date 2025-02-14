import React from 'react'
import { Link } from 'react-router-dom'
import "./BannerHome.css";
const Footer = () => {
  return (
    <footer className="foot   relative text-gray-400 mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */} 
        {/* <div className="mb-6 text-center text-white text-xl font-bold">Setflix</div> */}

        {/* Links */}
        <div className="grid text-center grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm text-gray-400">
          <a href="#" className="hover:underline">
            FAQ
          </a>
          <a href="#" className="hover:underline">
            Help Center
          </a>
          <a href="#" className="hover:underline">
            Account
          </a>
          <a href="#" className="hover:underline">
            Media Center
          </a>
          <a href="#" className="hover:underline">
            Investor Relations
          </a>
          <a href="#" className="hover:underline">
            Jobs
          </a>
          <a href="#" className="hover:underline">
            Ways to Watch
          </a>
          <a href="#" className="hover:underline">
            Terms of Use
          </a>
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <a href="#" className="hover:underline">
            Cookie Preferences
          </a>
          <a href="#" className="hover:underline">
            Corporate Information
          </a>
          <a href="#" className="hover:underline">
            Contact Us
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center items-center space-x-4 mt-6">
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-facebook-f"></i> {/* Facebook */}
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-twitter"></i> {/* Twitter */}
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-instagram"></i> {/* Instagram */}
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-youtube"></i> {/* YouTube */}
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm mt-6 text-gray-500">
          © {new Date().getFullYear()} Setflix, Inc. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
