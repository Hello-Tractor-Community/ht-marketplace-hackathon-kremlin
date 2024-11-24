import React from 'react';
import { Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-footerBgColor text-white px-6 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Us Column */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Your trusted marketplace for agricultural machinery. We connect buyers and sellers of tractors and farm equipment, ensuring quality and reliability in every transaction.
          </p>
        </div>

        {/* Contact Info Column */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-gray-300 text-sm mb-6">
            Follow us and reach us on any of our social media channels below:
          </p>
          
          {/* Social Media Icons */}
          <div className="flex gap-4 mb-6">
            <Facebook className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
            <Instagram className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
            <Youtube className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-300">
              <Phone className="w-4 h-4" />
              <span>0712005461</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Mail className="w-4 h-4" />
              <span>hello@hellotractor.com</span>
            </div>
          </div>
        </div>

        {/* Sign Up Column */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Sign Up</h3>
          <div className="flex items-center gap-4">
            <p className="text-gray-300 text-sm">Ready to Buy or Sell Your Tractor</p>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-600 transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-6xl mx-auto border-t border-gray-800 mt-8 pt-6">
        <p className="text-gray-400 text-sm text-center">
          Copyright ©2024 All rights reserved | Hello Tractor
        </p>
      </div>
    </footer>
  );
};

export default Footer;