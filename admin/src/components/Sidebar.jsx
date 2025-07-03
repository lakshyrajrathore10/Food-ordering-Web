import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  
  // Base styles for nav items
  const navItemStyle = "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-gray-100 hover:text-indigo-600";
  const activeNavItemStyle = "bg-indigo-50 text-indigo-600 font-medium";

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`w-full md:w-64 bg-white shadow-sm border-r border-gray-200 p-4 h-screen fixed md:sticky top-0 overflow-y-auto transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 z-50 md:z-auto`}>
        {/* Mobile Header */}
        <div className="md:hidden mb-4 p-2 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-[120px]">
              <img 
                src={assets.logo} 
                alt="Logo" 
                className="h-7 w-7 object-contain"
              />
              
            </div>
            <button 
              className="p-1 rounded-md hover:bg-gray-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex items-center gap-3 mb-6 px-2">
          
          <h2 className="text-xl font-bold text-gray-800">Admin Dashboard</h2>
        </div>
        
        {/* Navigation Links */}
        <div className="flex flex-col gap-1">
          <NavLink 
            to='/Add'
            className={({ isActive }) => 
              `${navItemStyle} ${isActive ? activeNavItemStyle : 'text-gray-600'}`
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <img src={assets.add_icon} alt="Add Item" className="w-5 h-5" />
            <span className="text-sm md:text-base">Add Item</span>
          </NavLink>

          <NavLink 
            to='/List'
            className={({ isActive }) => 
              `${navItemStyle} ${isActive ? activeNavItemStyle : 'text-gray-600'}`
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <img src={assets.order_icon} alt="List Items" className="w-5 h-5" />
            <span className="text-sm md:text-base">List Items</span>
          </NavLink>

          <NavLink 
            to='/Orders'
            className={({ isActive }) => 
              `${navItemStyle} ${isActive ? activeNavItemStyle : 'text-gray-600'}`
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <img src={assets.order_icon} alt="Orders" className="w-5 h-5" />
            <span className="text-sm md:text-base">Orders</span>
          </NavLink>
        </div>

        {/* Profile Section */}
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center gap-3">
              <img 
                src={assets.profile_image} 
                alt="Profile" 
                className="w-8 h-8 rounded-full border border-gray-300"
              />
              <div className="hidden md:block">
                <p className="text-sm font-medium">Admin User</p>
                
              </div>
              <div className="md:hidden">
                <p className="text-sm font-medium">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Toggle Button */}
      {!isMobileMenuOpen && (
        <div className="fixed top-4 left-4 z-40 md:hidden">
          <div className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-md">
            <img 
              src={assets.logo} 
              alt="Logo" 
              className="h-7 w-7 object-contain"
            />
            <button 
              className="p-1 rounded-md hover:bg-gray-200"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;