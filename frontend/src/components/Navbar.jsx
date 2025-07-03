import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Storecontext } from "../context/Storecontext";

const Navbar = ({ setshowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMobileProfileDropdown, setShowMobileProfileDropdown] = useState(false);
  const { getTotalCartItems, token, setToken } = useContext(Storecontext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollTo = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollToId: id } });
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
    setShowMobileMenu(false);
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    setShowProfileDropdown(false);
    setShowMobileProfileDropdown(false);
    navigate("/");
  };

  

  return (
    <div className="p-4 flex justify-between items-center bg-amber-100 shadow-md sticky top-0 z-50 rounded-sm">
      {/* Logo */}
      <img
        src={assets.logo}
        onClick={() => {
          setMenu("Home");
          handleScrollTo("home");
        }}
        alt="FoodFleet Logo"
        className="w-28 md:w-36 hover:scale-105 transition-transform duration-300 cursor-pointer"
        aria-label="Home"
      />
  

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 lg:gap-8 list-none font-medium text-gray-700">
        {["Home", "About", "Contact", "Mobile"].map((item) => (
          <li
            key={item}
            onClick={() => {
              setMenu(item);
              handleScrollTo(
                item === "Home"
                  ? "home"
                  : item === "About"
                  ? "explore-menu"
                  : item === "Contact"
                  ? "contact"
                  : "AppDownload"
              );
            }}
            className={`cursor-pointer hover:text-orange-600 transition-colors duration-300 ${
              menu === item ? "text-orange-600" : ""
            }`}
            aria-current={menu === item ? "page" : undefined}
          >
            {item === "Mobile" ? "Mobile App" : item === "Contact" ? "Contact us" : item}
          </li>
        ))}
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex gap-6 lg:gap-8 items-center">
          <button aria-label="Search">
            <img
              src={assets.search_icon}
              alt="Search"
              className="w-5 h-5 cursor-pointer hover:opacity-80 transition-opacity duration-300"
            />
          </button>

          <Link to="/cart" className="relative" aria-label="Cart">
            <img
              src={assets.basket_icon}
              alt="Basket"
              className="w-6 h-6 cursor-pointer hover:opacity-80 transition-opacity duration-300"
            />
            {getTotalCartItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalCartItems()}
              </span>
            )}
          </Link>

          {!token ? (
            <button
              onClick={() => setshowLogin(true)}
              className="bg-orange-500 text-white px-4 py-2 md:px-6 md:py-2 rounded-full hover:bg-orange-600 transition-colors duration-300 font-medium shadow-md hover:shadow-lg"
              aria-label="Sign in"
            >
              Sign in
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="focus:outline-none"
                aria-label="Profile menu"
                aria-expanded={showProfileDropdown}
              >
                <img
                  src={assets.profile_icon}
                  alt="Profile"
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
              </button>
              {showProfileDropdown && (
                <ul className="absolute right-0 top-10 w-40 bg-white shadow-lg rounded-md p-2 z-50">
                  <li className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                   onClick={()=>navigate('/MyOrders')}
                   >
                    <img src={assets.bag_icon} alt="Orders" className="w-5 h-5" />
                    <p className="text-sm">Orders</p>
                  </li>
                  <hr className="my-1" />
                  <li
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <img src={assets.logout_icon} alt="Logout" className="w-5 h-5" />
                    <p className="text-sm">Logout</p>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Mobile Right Side */}
        <div className="md:hidden flex items-center gap-4">
          <Link to="/cart" className="relative" aria-label="Cart">
            <img
              src={assets.basket_icon}
              alt="Basket"
              className="w-6 h-6 cursor-pointer hover:opacity-80 transition-opacity duration-300"
            />
            {getTotalCartItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalCartItems()}
              </span>
            )}
          </Link>

          {!token ? (
            <button
              onClick={() => setshowLogin(true)}
              className="bg-orange-500 text-white px-3 py-1 text-sm rounded-full hover:bg-orange-600 transition-colors duration-300 font-medium shadow-md hover:shadow-lg"
              aria-label="Sign in"
            >
              Sign in
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowMobileProfileDropdown(!showMobileProfileDropdown)}
                className="focus:outline-none"
                aria-label="Profile menu"
                aria-expanded={showMobileProfileDropdown}
              >
                <img
                  src={assets.profile_icon}
                  alt="Profile"
                  className="w-6 h-6 rounded-full cursor-pointer"
                />
              </button>
              {showMobileProfileDropdown && (
                <ul className="absolute right-0 top-10 w-40 bg-white shadow-lg rounded-md p-2 z-50">
                  <li className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
                    <img src={assets.bag_icon} alt="Orders" className="w-5 h-5" />
                    <p className="text-sm">Orders</p>
                  </li>
                  <hr className="my-1" />
                  <li
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <img src={assets.logout_icon} alt="Logout" className="w-5 h-5" />
                    <p className="text-sm">Logout</p>
                  </li>
                </ul>
              )}
            </div>
          )}

          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={showMobileMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {showMobileMenu ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {showMobileMenu && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-amber-100 shadow-md py-4 px-6 z-40 animate-fadeIn">
          <ul className="flex flex-col gap-4 list-none font-medium text-gray-700">
            {["Home", "About", "Contact", "Mobile"].map((item) => (
              <li
                key={item}
                onClick={() => {
                  setMenu(item);
                  handleScrollTo(
                    item === "Home"
                      ? "home"
                      : item === "About"
                      ? "explore-menu"
                      : item === "Contact"
                      ? "contact"
                      : "AppDownload"
                  );
                }}
                className={`cursor-pointer hover:text-orange-600 transition-colors duration-300 ${
                  menu === item ? "text-orange-600" : ""
                }`}
                aria-current={menu === item ? "page" : undefined}
              >
                {item === "Mobile" ? "Mobile App" : item === "Contact" ? "Contact us" : item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;