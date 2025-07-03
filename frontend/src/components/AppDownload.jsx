import React from "react";
import { assets } from "../assets/assets";

const AppDownload = () => {
  return (
    <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl max-w-4xl mx-4 sm:mx-auto my-12 lg:my-16 border border-orange-100 overflow-hidden relative" id="AppDownload">
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-amber-200 opacity-20"></div>
      <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-orange-200 opacity-20"></div>
      
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-10 relative z-10">
        {/* Text content */}
        <div className="text-center lg:text-left space-y-2 md:space-y-3 max-w-lg">
          <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl font-medium">
            For Better Experience Download
          </p>
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Tomato App
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm md:text-base hidden sm:block">
            Enjoy faster ordering, exclusive deals, and personalized recommendations.
          </p>
        </div>
        
        {/* App buttons with better responsive behavior */}
        <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 md:gap-5 w-full sm:w-auto justify-center">
          <a 
            href="#" 
            className="transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-md"
            aria-label="Download on Google Play"
          >
            <img 
              src={assets.play_store} 
              alt="Get it on Google Play" 
              className="h-10 sm:h-12 md:h-14 w-auto min-w-[120px] sm:min-w-[135px] md:min-w-[150px]" 
            />
          </a>
          <a 
            href="#" 
            className="transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-md"
            aria-label="Download on the App Store"
          >
            <img 
              src={assets.app_store} 
              alt="Download on the App Store" 
              className="h-10 sm:h-12 md:h-14 w-auto min-w-[120px] sm:min-w-[135px] md:min-w-[150px]" 
            />
          </a>
        </div>
      </div>
      
      {/* Mobile-only decorative element */}
      <div className="lg:hidden absolute bottom-2 right-2 text-amber-300 opacity-30 text-6xl">
        ↓
      </div>
    </div>
  );
};

export default AppDownload;