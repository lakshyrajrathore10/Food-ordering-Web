import React from 'react';
import { assets } from '../assets/assets.js';

const AdminNavbar = () => {
  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-white shadow-md border-b border-gray-200">
      {/* Logo Section */}
      <div className="flex items-center">
        <img 
          src={assets.logo} 
          alt="Admin Logo" 
          className="h-10 w-10 md:h-12 md:w-12 object-contain"
        />
        {/* Added mobile menu button (hamburger) */}
        <button className="ml-4 md:hidden">
          <svg 
            className="w-6 h-6 text-gray-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Right Side - Profile */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Admin Name - Hidden on mobile */}
        <div className="hidden md:block text-right">
          <p className="text-sm font-medium text-gray-700">Admin User</p>
          <p className="text-xs text-gray-500">Super Admin</p>
        </div>
        
        {/* Profile Image with dropdown indicator */}
        <div className="relative group">
          <img 
            src={assets.profile_image} 
            alt="Admin Profile" 
            className="h-8 w-8 md:h-10 md:w-10 rounded-full cursor-pointer border-2 border-gray-300 hover:border-indigo-500 transition-all duration-200"
          />
          {/* Dropdown arrow - hidden on mobile */}
          <svg 
            className="w-3 h-3 md:w-4 md:h-4 absolute -right-1 -bottom-1 text-gray-400 group-hover:text-indigo-600 transition-colors hidden md:block" 
            fill="currentColor" 
            viewBox="0 0 20 20" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          
          {/* Dropdown menu - appears on hover (desktop) and click (mobile) */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block md:group-hover:block">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;