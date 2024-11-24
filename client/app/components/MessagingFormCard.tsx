'use client';
import React, { useState } from 'react';

const MessagingFormCard = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-md w-full">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-600" />
        
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              Messaging Form
            </h2>
            <p className="text-sm text-gray-500">
              Tell us what&apos;s on your mind about our tractors today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Input */}
            <div>
              <label 
                htmlFor="fullName" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                FULL NAME
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 
                         focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 
                         outline-none transition-colors placeholder:text-gray-400"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 
                         focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 
                         outline-none transition-colors placeholder:text-gray-400"
                required
              />
            </div>

            {/* Message Input */}
            <div>
              <label 
                htmlFor="message" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                MESSAGE
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your Inquiry and Negotiation"
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 
                         focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 
                         outline-none transition-colors placeholder:text-gray-400 resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium
                       hover:bg-orange-600 active:bg-orange-700 
                       transition-colors duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessagingFormCard;