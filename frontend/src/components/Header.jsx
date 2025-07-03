import React from 'react';
import headerImg from '../assets/header_img.png'; 

const Header = () => {
  return (
    <header className="bg-gradient-to-b from-amber-200 to-white pt-8 md:pt-12 pb-16 md:pb-24">
      <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16">
          {/* Left side - Text content */}
          <div className="w-full lg:w-1/2 space-y-6 md:space-y-8 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Savor the Flavors <br />
              <span className="text-orange-500">Delivered to Your Door</span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 px-4 sm:px-0 lg:pr-10">
              Discover culinary delights from your favorite local restaurants. 
              Freshly prepared meals delivered fast when you're hungry.
            </p>
            <div className="flex justify-center lg:justify-start space-x-4 sm:space-x-6 pt-2 md:pt-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm md:text-base">
                View Menu
              </button>
            </div>
            <div className="flex justify-center lg:justify-start space-x-4 sm:space-x-6 md:space-x-8 pt-6 md:pt-8">
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-bold text-orange-500">5K+</span>
                <span className="text-sm md:text-base text-gray-600">Restaurants</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-bold text-orange-500">1M+</span>
                <span className="text-sm md:text-base text-gray-600">Happy Customers</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-bold text-orange-500">15+</span>
                <span className="text-sm md:text-base text-gray-600">Cities</span>
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
            {/* <div className="hidden lg:block absolute -top-16 -right-16 w-full h-full bg-orange-100 rounded-2xl -z-10"></div> */}
            <img
              src={headerImg}
              alt="Delicious food delivery"
              className="w-full h-auto max-w-md mx-auto lg:max-w-none object-contain rounded-lg"
            />
            <div className="absolute bottom-0 lg:bottom-4 left-1/2 lg:-left-10 transform -translate-x-1/2 lg:translate-x-0 bg-white p-3 md:p-4 rounded-xl shadow-lg w-3/4 sm:w-auto">
              <div className="flex items-center">
                <div className="bg-orange-100 p-2 md:p-3 rounded-full mr-2 md:mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-sm md:text-base">Fast Delivery</p>
                  <p className="text-xs md:text-sm text-gray-500">Within 30 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;