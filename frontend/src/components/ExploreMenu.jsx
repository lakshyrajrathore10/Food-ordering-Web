import React from "react";
import { menu_list } from "../assets/assets";
import { FaArrowRightLong } from "react-icons/fa6";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div
      className="  max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12"
      id="explore-menu"
    >
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3">
          <span className="text-red-500">Explore</span> Our Menu
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4 flex items-center">
          <span className="mr-2">
            Choose from a diverse menu featuring a delectable array of dishes
          </span>
          <FaArrowRightLong />
        </p>
      </div>

      {/* Scrollable menu items */}
      <div className="relative">
        <div className="flex overflow-x-auto pb-6 gap-4 sm:gap-6 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {menu_list.map((item, index) => (
            <div
              onClick={() => {
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                );
              }}
              key={index}
              className={`flex flex-col items-center min-w-[100px] xs:min-w-[120px] sm:min-w-[140px] group cursor-pointer transition-all duration-300 ${
                category === item.menu_name ? "active-category" : ""
              }`}
            >
              <div className="relative mb-2 sm:mb-3">
                <img
                  src={item.menu_image}
                  alt={item.menu_name}
                  className={`w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 object-cover rounded-full border-4 border-white shadow-lg transition-all duration-300 ${
                    category === item.menu_name
                      ? "border-red-300 scale-105"
                      : "group-hover:border-red-200"
                  }`}
                  loading="lazy"
                />
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-300 ${
                    category === item.menu_name
                      ? "bg-red-100 bg-opacity-20"
                      : "bg-black bg-opacity-0 group-hover:bg-opacity-10"
                  }`}
                ></div>
              </div>
              <p
                className={`text-sm xs:text-base text-gray-800 font-medium text-center transition-colors duration-300 ${
                  category === item.menu_name
                    ? "text-red-500 font-semibold"
                    : "group-hover:text-red-500"
                }`}
              >
                {item.menu_name}
              </p>
            </div>
          ))}
        </div>

        {/* Gradient fade effects for scroll indication */}
        <div className="hidden sm:block absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
        <div className="hidden sm:block absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default ExploreMenu;
